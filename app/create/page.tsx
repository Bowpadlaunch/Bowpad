import type { Metadata } from 'next';
import { BowpadApp } from '@/components/bowpad-app';
export const metadata: Metadata={title:'Launch a Token — Bowpad',description:'Create a token and bonding curve on Bowpad in one wallet transaction.'};
export default function CreatePage(){return <BowpadApp view="create"/>}
