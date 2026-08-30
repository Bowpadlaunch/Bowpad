import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
export const metadata: Metadata = {
  title: 'Trust Center — Bowpad',
  description:
    'Verify Bowpad wallet permissions, fees, contract status, audit status, and open-source roadmap.',
};
export default function TrustPage() {
  return <InfoPage kind="trust" />;
}
