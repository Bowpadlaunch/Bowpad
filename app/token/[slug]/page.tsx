import type { Metadata } from 'next';
import { BowpadApp } from '@/components/bowpad-app';
export const metadata: Metadata={title:'Good Bow ($BOW) — Bowpad',description:'View and trade Good Bow on its Bowpad bonding curve.',openGraph:{title:'Good Bow ($BOW) — Bowpad',description:'View and trade Good Bow on its Bowpad bonding curve.',images:[]},twitter:{card:'summary',title:'Good Bow ($BOW) — Bowpad',description:'View and trade Good Bow on its Bowpad bonding curve.',images:[]}};
export default function TokenPage(){return <BowpadApp view="token"/>}
