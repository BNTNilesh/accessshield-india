-- ============================================================================
-- Migration: 004_document_scanner
-- Date: 2026-07-06
-- Description: Document Scanner feature — jobs, results, violations tables,
--              RLS policies, indexes, and reporting views.
--
-- Note: Uses organisation_id / organisations (AccessShield monorepo convention).
--       Prompt references organization_id / organizations — same semantics.
-- ============================================================================

-- ─── Table 1: document_scan_jobs ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS document_scan_jobs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id     UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES auth.users(id),
  document_name       TEXT NOT NULL,
  document_type       TEXT NOT NULL CHECK (document_type IN ('pdf', 'docx', 'pptx', 'xlsx')),
  document_size_bytes BIGINT,
  page_count          INTEGER,
  s3_key              TEXT NOT NULL,
  s3_bucket           TEXT NOT NULL DEFAULT 'accessshield-uploads-prod',
  status              TEXT NOT NULL DEFAULT 'queued'
                        CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  progress_percent    INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  standards           TEXT[] NOT NULL DEFAULT ARRAY['WCAG_2_1_AA', 'GIGW_3_0', 'PDF_UA', 'IS_17802'],
  error_message       TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ
);

-- ─── Table 2: document_scan_results ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS document_scan_results (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id                  UUID NOT NULL UNIQUE REFERENCES document_scan_jobs(id) ON DELETE CASCADE,
  organisation_id         UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  document_name           TEXT NOT NULL,
  document_type           TEXT NOT NULL,
  total_violations        INTEGER NOT NULL DEFAULT 0,
  critical_count          INTEGER NOT NULL DEFAULT 0,
  serious_count           INTEGER NOT NULL DEFAULT 0,
  moderate_count          INTEGER NOT NULL DEFAULT 0,
  minor_count             INTEGER NOT NULL DEFAULT 0,
  compliance_score        INTEGER NOT NULL DEFAULT 0 CHECK (compliance_score >= 0 AND compliance_score <= 100),
  violations              JSONB NOT NULL DEFAULT '[]',
  summary                 JSONB NOT NULL DEFAULT '{}',
  gigw_checkpoint_results JSONB NOT NULL DEFAULT '{}',
  ai_summary              TEXT,
  scan_duration_seconds   DOUBLE PRECISION,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Table 3: document_violations ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS document_violations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          UUID NOT NULL REFERENCES document_scan_jobs(id) ON DELETE CASCADE,
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  violation_id    TEXT NOT NULL,
  checkpoint_id   TEXT NOT NULL,
  standard        TEXT NOT NULL,
  severity        TEXT NOT NULL CHECK (severity IN ('critical', 'serious', 'moderate', 'minor')),
  category        TEXT NOT NULL,
  description     TEXT NOT NULL,
  location        TEXT,
  wcag_criterion  TEXT,
  impact          TEXT,
  remediation     TEXT,
  auto_fixable    BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (job_id, violation_id)
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_doc_jobs_org_id ON document_scan_jobs(organisation_id);
CREATE INDEX IF NOT EXISTS idx_doc_jobs_status ON document_scan_jobs(status);
CREATE INDEX IF NOT EXISTS idx_doc_jobs_created ON document_scan_jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_doc_results_job_id ON document_scan_results(job_id);
CREATE INDEX IF NOT EXISTS idx_doc_results_org_id ON document_scan_results(organisation_id);
CREATE INDEX IF NOT EXISTS idx_doc_violations_job_id ON document_violations(job_id);
CREATE INDEX IF NOT EXISTS idx_doc_violations_severity ON document_violations(job_id, severity);
CREATE INDEX IF NOT EXISTS idx_doc_violations_category ON document_violations(job_id, category);
CREATE INDEX IF NOT EXISTS idx_doc_violations_checkpoint ON document_violations(checkpoint_id);

-- ─── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE document_scan_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_scan_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_violations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS org_isolation_document_scan_jobs ON document_scan_jobs;
CREATE POLICY org_isolation_document_scan_jobs ON document_scan_jobs
  FOR ALL
  USING (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE supabase_uid = auth.uid()
    )
  )
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE supabase_uid = auth.uid()
    )
  );

DROP POLICY IF EXISTS org_isolation_document_scan_results ON document_scan_results;
CREATE POLICY org_isolation_document_scan_results ON document_scan_results
  FOR ALL
  USING (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE supabase_uid = auth.uid()
    )
  )
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE supabase_uid = auth.uid()
    )
  );

DROP POLICY IF EXISTS org_isolation_document_violations ON document_violations;
CREATE POLICY org_isolation_document_violations ON document_violations
  FOR ALL
  USING (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE supabase_uid = auth.uid()
    )
  )
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM users WHERE supabase_uid = auth.uid()
    )
  );

-- ─── Views ───────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW document_scan_summary_view
WITH (security_invoker = true) AS
SELECT
  j.id              AS job_id,
  j.organisation_id,
  j.document_name,
  j.document_type,
  j.status,
  r.compliance_score,
  r.total_violations,
  r.critical_count,
  r.serious_count,
  j.created_at,
  j.completed_at
FROM document_scan_jobs j
LEFT JOIN document_scan_results r ON r.job_id = j.id;

CREATE OR REPLACE VIEW document_compliance_trend_view
WITH (security_invoker = true) AS
SELECT
  j.organisation_id,
  date_trunc('month', j.completed_at)::date AS month,
  ROUND(AVG(r.compliance_score)::numeric, 1) AS avg_score,
  COUNT(*)::integer AS total_scans,
  COALESCE(SUM(r.total_violations), 0)::integer AS total_violations
FROM document_scan_jobs j
INNER JOIN document_scan_results r ON r.job_id = j.id
WHERE j.status = 'completed'
  AND j.completed_at IS NOT NULL
GROUP BY j.organisation_id, date_trunc('month', j.completed_at);

-- ============================================================================
-- REVERSIBLE ROLLBACK (commented out — run manually to undo this migration)
-- ============================================================================
--
-- DROP VIEW IF EXISTS document_compliance_trend_view;
-- DROP VIEW IF EXISTS document_scan_summary_view;
--
-- DROP POLICY IF EXISTS org_isolation_document_violations ON document_violations;
-- DROP POLICY IF EXISTS org_isolation_document_scan_results ON document_scan_results;
-- DROP POLICY IF EXISTS org_isolation_document_scan_jobs ON document_scan_jobs;
--
-- DROP TABLE IF EXISTS document_violations;
-- DROP TABLE IF EXISTS document_scan_results;
-- DROP TABLE IF EXISTS document_scan_jobs;
