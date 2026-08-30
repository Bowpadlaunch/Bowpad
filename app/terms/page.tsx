import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
export const metadata: Metadata = {
  title: 'Terms of Use — Bowpad',
  description:
    'Review the rules, responsibilities, and digital-asset risks that apply when using Bowpad.',
};
export default function TermsPage() {
  return <InfoPage kind="terms" />;
}
