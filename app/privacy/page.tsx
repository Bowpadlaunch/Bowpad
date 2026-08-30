import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
export const metadata: Metadata = {
  title: 'Privacy Policy — Bowpad',
  description:
    'Understand what Bowpad processes, what remains in your wallet, and what is public onchain.',
};
export default function PrivacyPage() {
  return <InfoPage kind="privacy" />;
}
