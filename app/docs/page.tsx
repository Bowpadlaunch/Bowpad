import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
export const metadata: Metadata = {
  title: 'Docs — Bowpad',
  description:
    'Learn how Bowpad token creation, wallet signatures, bonding curves, fees, and graduation work.',
};
export default function DocsPage() {
  return <InfoPage kind="docs" />;
}
