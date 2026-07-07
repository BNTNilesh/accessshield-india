-- ============================================================================
-- Migration: 004_document_scanner_seed
-- Date: 2026-07-06
-- Description: Seed data for Document Scanner — 3 completed test scans for
--              organisation 00000000-0000-0000-0000-000000000001.
--              Re-runnable via ON CONFLICT DO NOTHING on fixed UUIDs.
--              Skips gracefully if no auth.users row exists yet.
-- ============================================================================

-- Test org must exist (created by packages/db/seed/dev.sql)
INSERT INTO organisations (id, name, slug, plan, billing_email, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Public Scans',
  'public-scans-system',
  'starter',
  'public-scans@accessshield.in',
  false
)
ON CONFLICT (id) DO NOTHING;

DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Prefer a user linked to the test org; fall back to any auth user
  SELECT u.supabase_uid INTO v_user_id
  FROM users u
  WHERE u.organisation_id = '00000000-0000-0000-0000-000000000001'
    AND u.supabase_uid IS NOT NULL
  LIMIT 1;

  IF v_user_id IS NULL THEN
    SELECT id INTO v_user_id FROM auth.users ORDER BY created_at LIMIT 1;
  END IF;

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'document_scanner_seed: skipped — no auth.users row available';
    RETURN;
  END IF;

  -- ─── Job 1: Annual_Report_2024.pdf ───────────────────────────────────────

  INSERT INTO document_scan_jobs (
    id,
    organisation_id,
    user_id,
    document_name,
    document_type,
    document_size_bytes,
    page_count,
    s3_key,
    status,
    progress_percent,
    started_at,
    completed_at
  )
  VALUES (
    'a1000000-0000-4000-8000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    v_user_id,
    'Annual_Report_2024.pdf',
    'pdf',
    2458624,
    48,
    'documents/00000000-0000-0000-0000-000000000001/annual-report-2024.pdf',
    'completed',
    100,
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days' + INTERVAL '3 minutes'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO document_scan_results (
    id,
    job_id,
    organisation_id,
    document_name,
    document_type,
    total_violations,
    critical_count,
    serious_count,
    moderate_count,
    minor_count,
    compliance_score,
    violations,
    summary,
    gigw_checkpoint_results,
    ai_summary,
    scan_duration_seconds
  )
  VALUES (
    'b1000000-0000-4000-8000-000000000001',
    'a1000000-0000-4000-8000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Annual_Report_2024.pdf',
    'pdf',
    23,
    2,
    8,
    9,
    4,
    72,
    '[
      {"violation_id":"pdf_alt_3_img1","checkpoint_id":"PDF_UA_1.2","standard":"PDF_UA","severity":"critical","category":"alt_text","description":"Image on page 3 lacks alternative text","location":"Page 3, Image 1"}
    ]'::jsonb,
    '{"alt_text":5,"heading_structure":3,"colour_contrast":4,"reading_order":6,"metadata":5}'::jsonb,
    '{"GIGW_5.2.1":{"pass":false,"notes":"Missing document title in metadata"},"GIGW_5.3.1":{"pass":true}}'::jsonb,
    'The annual report has moderate accessibility gaps, primarily missing alt text on charts and inconsistent heading hierarchy in the executive summary.',
    178.4
  )
  ON CONFLICT (job_id) DO NOTHING;

  -- ─── Job 2: Budget_Circular.docx ─────────────────────────────────────────

  INSERT INTO document_scan_jobs (
    id,
    organisation_id,
    user_id,
    document_name,
    document_type,
    document_size_bytes,
    page_count,
    s3_key,
    status,
    progress_percent,
    started_at,
    completed_at
  )
  VALUES (
    'a1000000-0000-4000-8000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    v_user_id,
    'Budget_Circular.docx',
    'docx',
    524288,
    12,
    'documents/00000000-0000-0000-0000-000000000001/budget-circular.docx',
    'completed',
    100,
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days' + INTERVAL '90 seconds'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO document_scan_results (
    id,
    job_id,
    organisation_id,
    document_name,
    document_type,
    total_violations,
    critical_count,
    serious_count,
    moderate_count,
    minor_count,
    compliance_score,
    violations,
    summary,
    gigw_checkpoint_results,
    ai_summary,
    scan_duration_seconds
  )
  VALUES (
    'b1000000-0000-4000-8000-000000000002',
    'a1000000-0000-4000-8000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Budget_Circular.docx',
    'docx',
    11,
    0,
    3,
    5,
    3,
    84,
    '[
      {"violation_id":"docx_heading_2","checkpoint_id":"WCAG_2_4_2","standard":"WCAG_2_1_AA","severity":"serious","category":"heading_structure","description":"Section 2 uses bold text instead of Heading 2 style","location":"Page 2, Paragraph 14"}
    ]'::jsonb,
    '{"heading_structure":4,"table_accessibility":3,"language":2,"colour_contrast":2}'::jsonb,
    '{"GIGW_5.2.1":{"pass":true},"GIGW_5.4.2":{"pass":false,"notes":"Tables lack header row markup"}}'::jsonb,
    'Budget circular is largely compliant. Fix heading styles and add table headers to reach 90+ score.',
    87.2
  )
  ON CONFLICT (job_id) DO NOTHING;

  -- ─── Job 3: Scheme_Guidelines.pptx ───────────────────────────────────────

  INSERT INTO document_scan_jobs (
    id,
    organisation_id,
    user_id,
    document_name,
    document_type,
    document_size_bytes,
    page_count,
    s3_key,
    status,
    progress_percent,
    started_at,
    completed_at
  )
  VALUES (
    'a1000000-0000-4000-8000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    v_user_id,
    'Scheme_Guidelines.pptx',
    'pptx',
    3145728,
    24,
    'documents/00000000-0000-0000-0000-000000000001/scheme-guidelines.pptx',
    'completed',
    100,
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day' + INTERVAL '2 minutes'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO document_scan_results (
    id,
    job_id,
    organisation_id,
    document_name,
    document_type,
    total_violations,
    critical_count,
    serious_count,
    moderate_count,
    minor_count,
    compliance_score,
    violations,
    summary,
    gigw_checkpoint_results,
    ai_summary,
    scan_duration_seconds
  )
  VALUES (
    'b1000000-0000-4000-8000-000000000003',
    'a1000000-0000-4000-8000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'Scheme_Guidelines.pptx',
    'pptx',
    31,
    4,
    10,
    12,
    5,
    61,
    '[
      {"violation_id":"pptx_contrast_5","checkpoint_id":"WCAG_1.4.3","standard":"WCAG_2_1_AA","severity":"critical","category":"colour_contrast","description":"Yellow text on white background fails contrast ratio","location":"Slide 5, Title placeholder"}
    ]'::jsonb,
    '{"colour_contrast":8,"alt_text":7,"reading_order":9,"slide_title":7}'::jsonb,
    '{"GIGW_5.2.1":{"pass":false,"notes":"Missing slide titles on 7 slides"},"GIGW_5.5.1":{"pass":false,"notes":"Low contrast text on multiple slides"}}'::jsonb,
    'Scheme guidelines deck needs urgent contrast fixes on slides 5–8 and unique titles on all slides for screen reader navigation.',
    124.6
  )
  ON CONFLICT (job_id) DO NOTHING;

END $$;
