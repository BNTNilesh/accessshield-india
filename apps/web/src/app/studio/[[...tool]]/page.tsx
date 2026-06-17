import { NextStudioComponent } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudioComponent config={config} />;
}
