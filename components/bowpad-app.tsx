'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronDown,
  Clipboard,
  Clock3,
  FileImage,
  Flame,
  Globe2,
  ImagePlus,
  Info,
  Link2,
  LoaderCircle,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { bowpadNetwork, formatFee } from '@/lib/network-config';

type View = 'home' | 'create' | 'token';
type WalletState = 'disconnected' | 'connecting' | 'connected' | 'wrong';
type Category = 'Trending' | 'New' | 'Graduating' | 'Top Market Cap';
const tokens = [
  {
    slug: 'good-bow',
    name: 'Good Bow',
    ticker: 'BOW',
    desc: 'The community coin for people who always choose the good bow.',
    cap: '$38.4K',
    progress: 72,
    color: '#b7ff49',
    mark: 'GB',
    change: '+36.0%',
    cats: ['Trending', 'Graduating', 'Top Market Cap'],
  },
  {
    slug: 'robin-pup',
    name: 'Robin Pup',
    ticker: 'PUP',
    desc: 'Small paws. Big green candles. Community-owned from day one.',
    cap: '$21.8K',
    progress: 48,
    color: '#ffd75e',
    mark: 'RP',
    change: '+24.0%',
    cats: ['Trending', 'New'],
  },
  {
    slug: 'green-candle',
    name: 'Green Candle',
    ticker: 'WICK',
    desc: 'Light the wick and let the community chart the path.',
    cap: '$9.7K',
    progress: 31,
    color: '#62e3ff',
    mark: 'GC',
    change: '+15.5%',
    cats: ['Trending', 'New'],
  },
  {
    slug: 'bow-house',
    name: 'Bow House',
    ticker: 'HOUSE',
    desc: 'A home base for builders and believers on Robinhood Chain.',
    cap: '$51.2K',
    progress: 88,
    color: '#efb2ff',
    mark: 'BH',
    change: '+12.8%',
    cats: ['Graduating', 'Top Market Cap'],
  },
  {
    slug: 'tiny-arrow',
    name: 'Tiny Arrow',
    ticker: 'TINY',
    desc: 'Tiny ticker, upward ambitions.',
    cap: '$2.3K',
    progress: 9,
    color: '#ff9d79',
    mark: 'TA',
    change: '+7.2%',
    cats: ['New'],
  },
  {
    slug: 'early-bird',
    name: 'Early Bird',
    ticker: 'EARLY',
    desc: 'For the ones who arrived before the crowd.',
    cap: '$72.1K',
    progress: 96,
    color: '#9ebdff',
    mark: 'EB',
    change: '+9.4%',
    cats: ['Graduating', 'Top Market Cap'],
  },
];
const categories: { label: Category; icon: typeof Flame }[] = [
  { label: 'Trending', icon: Flame },
  { label: 'New', icon: Sparkles },
  { label: 'Graduating', icon: Rocket },
  { label: 'Top Market Cap', icon: BarChart3 },
];

export function Brand() {
  return (
    <a href="/" className="official-brand" aria-label="Bowpad home">
      <span className="official-logo-mark" aria-hidden="true">
        <img src="/bowpad-logo-original.png" alt="" />
      </span>
      <span className="official-wordmark" aria-hidden="true">
        <span>bow</span>
        <strong>pad</strong>
      </span>
    </a>
  );
}
function Nav({
  wallet,
  setWallet,
  connect,
}: {
  wallet: WalletState;
  setWallet: (v: WalletState) => void;
  connect: () => void;
}) {
  return (
    <nav className="site-shell launchpad-nav flex h-20 items-center justify-between gap-4">
      <Brand />
      <div className="nav-pill hidden items-center text-sm md:flex">
        <a className="active" href="/#discover">
          Explore
        </a>
        <a href="/docs">Docs</a>
        <a href="/trust">Trust</a>
      </div>
      {wallet === 'connected' ? (
        <Button
          variant="outline"
          className="wallet-button"
          onClick={() => {
            sessionStorage.removeItem('bowpad-wallet');
            setWallet('disconnected');
          }}
        >
          <span className="status-dot" />
          0x71…c92F
          <ChevronDown />
        </Button>
      ) : (
        <Button
          variant="outline"
          className={`wallet-button ${wallet === 'wrong' ? 'border-amber-300 text-amber-800' : ''}`}
          onClick={connect}
        >
          {wallet === 'connecting' ? (
            <LoaderCircle className="animate-spin" />
          ) : wallet === 'wrong' ? (
            <AlertCircle />
          ) : (
            <Wallet />
          )}
          {wallet === 'wrong' ? 'Switch network' : 'Connect wallet'}
        </Button>
      )}
    </nav>
  );
}
function WalletDialog({
  open,
  setOpen,
  wallet,
  setWallet,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  wallet: WalletState;
  setWallet: (v: WalletState) => void;
}) {
  const go = (wrong = false) => {
    setWallet('connecting');
    setTimeout(() => {
      setWallet(wrong ? 'wrong' : 'connected');
      if (!wrong) sessionStorage.setItem('bowpad-wallet', 'connected');
      setOpen(false);
    }, 700);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl border-0 p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Connect your wallet
          </DialogTitle>
          <DialogDescription>
            No username or password. Your wallet is your Bowpad account.
          </DialogDescription>
        </DialogHeader>
        <button
          className="wallet-option"
          onClick={() => go()}
          disabled={wallet === 'connecting'}
        >
          <span className="grid size-11 place-items-center rounded-2xl bg-[#b7ff49]">
            <Wallet />
          </span>
          <span className="flex-1 text-left">
            <b className="block">Browser wallet</b>
            <small>MetaMask, Rabby, Robinhood Wallet</small>
          </span>
          {wallet === 'connecting' ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <ArrowRight />
          )}
        </button>
        <button className="wallet-option" onClick={() => go(true)}>
          <span className="grid size-11 place-items-center rounded-2xl bg-amber-100">
            <AlertCircle className="text-amber-700" />
          </span>
          <span className="flex-1 text-left">
            <b className="block">Preview wrong network</b>
            <small>See the recovery state</small>
          </span>
          <ArrowRight />
        </button>
        <p className="text-center text-[11px] text-muted-foreground">
          Connecting does not give Bowpad custody of your assets.
        </p>
      </DialogContent>
    </Dialog>
  );
}
export function Footer() {
  return (
    <footer className="mt-20 border-t bg-white/30 py-10">
      <div className="site-shell grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Brand />
          <p className="mt-4 max-w-2xl text-xs leading-5 text-muted-foreground">
            Bowpad is independent and is not affiliated with, endorsed by, or
            sponsored by Robinhood. Tokens created on Bowpad are not
            automatically listed on Robinhood or any exchange. Digital assets
            are risky and may lose all value.
          </p>
        </div>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="/docs">Docs</a>
          <a href="/trust">Trust</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
function TokenCard({ token }: { token: (typeof tokens)[number] }) {
  return (
    <a href={`/token/${token.slug}`}>
      <Card className="token-card">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="token-art" style={{ background: token.color }}>
              {token.mark}
            </div>
            <div className="min-w-0 flex-1">
              <b className="block truncate">{token.name}</b>
              <p className="truncate text-xs text-muted-foreground">
                ${token.ticker} · Created by 0x71…c92F
              </p>
            </div>
            <ArrowUpRight className="size-4" />
          </div>
          <p className="mt-4 line-clamp-2 min-h-10 text-sm text-muted-foreground">
            {token.desc}
          </p>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <small className="text-muted-foreground">Market cap</small>
              <strong className="mt-1 block text-xl">{token.cap}</strong>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
              {token.change}
            </span>
          </div>
          <div className="mt-5 flex justify-between text-xs">
            <span className="text-muted-foreground">Bonding curve</span>
            <b>{token.progress}%</b>
          </div>
          <Progress className="mt-2" value={token.progress} />
        </CardContent>
      </Card>
    </a>
  );
}

function LegacyHome({
  wallet,
  connect,
}: {
  wallet: WalletState;
  connect: () => void;
}) {
  const [category, setCategory] = useState<Category>('Trending');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const shown = useMemo(
    () =>
      tokens.filter(
        (t) =>
          t.cats.includes(category) &&
          `${t.name} ${t.ticker}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );
  const launch = () =>
    wallet === 'connected' ? window.location.assign('/create') : connect();
  const pick = (x: Category) => {
    setLoading(true);
    setCategory(x);
    setTimeout(() => setLoading(false), 400);
  };
  return (
    <>
      <section className="site-shell hero-grid relative grid min-h-[650px] items-center gap-10 py-12 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <div className="relative z-10 max-w-3xl">
          <div className="eyebrow">
            <Sparkles />
            Built for Robinhood Chain
          </div>
          <h1 className="mt-6 text-[clamp(3.3rem,7.5vw,7.3rem)] font-black leading-[.84] tracking-[-.075em]">
            Make a token.
            <br />
            <span className="acid-text">Let it run.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-7 text-muted-foreground sm:text-xl">
            Launch community tokens in seconds. No code, no accounts—just your
            wallet and an idea worth sharing.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button className="launch-button" onClick={launch}>
              Launch a Token
              <Rocket />
            </Button>
            <span className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Free + network gas
            </span>
          </div>
        </div>
        <div
          className="relative mx-auto hidden w-full max-w-lg lg:block"
          aria-hidden="true"
        >
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-card rotate-[-5deg]">
            <div className="flex items-center gap-4">
              <div className="token-art token-art-large">GB</div>
              <div>
                <p className="text-xl font-bold">Good Bow</p>
                <p className="text-sm text-muted-foreground">
                  $BOW · just launched
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="stat-tile">
                <span>Market cap</span>
                <strong>$38,420</strong>
              </div>
              <div className="stat-tile">
                <span>24h volume</span>
                <strong>$12,890</strong>
              </div>
            </div>
            <div className="mt-6 flex justify-between text-sm">
              <span>Bonding curve</span>
              <b>72%</b>
            </div>
            <Progress
              className="mt-2 [&_[data-slot=progress-track]]:h-2"
              value={72}
            />
          </div>
          <div className="float-pill">
            <Flame />
            Trending #1
          </div>
        </div>
      </section>
      <section id="discover" className="site-shell pb-14 pt-8">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Live on the curve</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">
              Find your next favorite
            </h2>
          </div>
          <div className="search-box">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or ticker"
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X />
              </button>
            )}
          </div>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`category-pill ${category === label ? 'active' : ''}`}
              onClick={() => pick(label)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[270px] animate-pulse rounded-[22px] bg-muted"
              />
            ))}
          </div>
        ) : shown.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((t) => (
              <TokenCard key={t.slug} token={t} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search />
            <h3>No tokens found</h3>
            <p>Try another name or ticker, or be the first to launch it.</p>
            <Button onClick={launch}>Launch a Token</Button>
          </div>
        )}
      </section>
      <section id="how" className="site-shell py-16">
        <div className="rounded-[32px] bg-[#172011] p-7 text-[#f5ffe9] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="section-kicker text-[#b7ff49]">Simple by design</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-.05em]">
                From idea to market in three steps.
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/60">
                The Token Factory creates the token and opens its bonding curve
                automatically.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [ImagePlus, 'Add the idea', 'Image, name, ticker.'],
                [Wallet, 'Sign once', 'Approve creation.'],
                [TrendingUp, 'Start trading', 'Your page goes live.'],
              ].map(([Icon, title, text], i) => {
                const I = Icon as typeof Wallet;
                return (
                  <div className="step-card" key={String(title)}>
                    <span>0{i + 1}</span>
                    <I />
                    <b>{String(title)}</b>
                    <p>{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Home({
  wallet,
  connect,
}: {
  wallet: WalletState;
  connect: () => void;
}) {
  const [category, setCategory] = useState<Category>('Trending');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const shown = useMemo(
    () =>
      tokens.filter(
        (token) =>
          token.cats.includes(category) &&
          `${token.name} ${token.ticker}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );
  const pick = (next: Category) => {
    setLoading(true);
    setCategory(next);
    setTimeout(() => setLoading(false), 360);
  };
  const launch = () =>
    wallet === 'connected' ? window.location.assign('/create') : connect();

  return (
    <div className="launchpad-shell site-shell">
      <div className="launchpad-tools">
        <div className="launchpad-search">
          <Search />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tokens"
            aria-label="Search tokens"
          />
          {query ? (
            <button onClick={() => setQuery('')} aria-label="Clear search">
              <X />
            </button>
          ) : (
            <kbd>⌘ K</kbd>
          )}
        </div>
        <Button variant="outline" className="tool-button">
          <TrendingUp /> Analytics
        </Button>
        <Button className="create-top-button" onClick={launch}>
          <Rocket /> Create
        </Button>
      </div>

      <section id="discover" className="explore-panel" aria-label="Explore">
        <div className="explore-head">
          <div>
            <p className="eyebrow">Live on Robinhood Chain</p>
            <h1>Explore</h1>
            <p>Tokens still climbing toward graduation on Robinhood Chain.</p>
          </div>
          <div className="explore-filters" aria-label="Sort launches">
            {categories.map(({ label }) => (
              <button
                key={label}
                className={category === label ? 'active' : ''}
                onClick={() => pick(label)}
              >
                {label === 'Trending' ? 'Recent buys' : label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="launch-grid" aria-label="Loading launches">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="launch-skeleton" />
            ))}
          </div>
        ) : shown.length ? (
          <div className="launch-grid">
            {shown.map((token) => (
              <TokenCard key={token.slug} token={token} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search />
            <h3>No tokens found</h3>
            <p>Try another search, or launch the first one.</p>
            <Button onClick={launch}>Create token</Button>
          </div>
        )}
      </section>

      <div className="launchpad-note">
        <ShieldCheck />
        <p>
          <strong>Wallet-native, non-custodial.</strong> Bowpad never holds your
          assets. Every creation and trade is signed in your wallet.
        </p>
        <a href="/create">
          How launching works <ArrowRight />
        </a>
      </div>
    </div>
  );
}

type Fields = {
  name: string;
  ticker: string;
  description: string;
  twitter: string;
  telegram: string;
  website: string;
};
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">
        {label}
        {required && <i>*</i>}
      </span>
      {children}
      {error && (
        <span className="field-error">
          <AlertCircle />
          {error}
        </span>
      )}
    </label>
  );
}
function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
function Create({
  wallet,
  connect,
}: {
  wallet: WalletState;
  connect: () => void;
}) {
  const [f, setF] = useState<Fields>({
    name: '',
    ticker: '',
    description: '',
    twitter: '',
    telegram: '',
    website: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sign, setSign] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof Fields, v: string) =>
    setF((x) => ({
      ...x,
      [k]:
        k === 'ticker'
          ? v
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, '')
              .slice(0, 10)
          : v,
    }));
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      setErrors((x) => ({
        ...x,
        image: 'Use a PNG, JPG, GIF, or WebP under 5 MB.',
      }));
      return;
    }
    setImage(URL.createObjectURL(file));
    setErrors((x) => ({ ...x, image: '' }));
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!image) x.image = 'Token image is required.';
    if (!f.name.trim()) x.name = 'Token name is required.';
    if (!f.ticker.trim()) x.ticker = 'Ticker is required.';
    if (!f.description.trim()) x.description = 'Description is required.';
    if (f.website && !/^https?:\/\//.test(f.website))
      x.website = 'Include https:// at the start.';
    setErrors(x);
    if (Object.values(x).length) return;
    if (wallet !== 'connected') return connect();
    setSign(true);
  };
  const confirm = () => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSign(false);
      setDone(true);
    }, 1200);
  };
  if (done)
    return (
      <section className="site-shell grid min-h-[72vh] place-items-center py-16 text-center">
        <div>
          <div className="success-ring">
            <Check />
          </div>
          <p className="section-kicker mt-7">Transaction confirmed</p>
          <h1 className="mt-3 text-5xl font-black">{f.name} is live.</h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Your token, bonding curve, and trading page were created together.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="outline">
              <Link2 />
              Copy link
            </Button>
            <Button onClick={() => window.location.assign('/token/good-bow')}>
              View token
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
    );
  return (
    <section className="site-shell py-10 sm:py-16">
      <a
        href="/"
        className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft />
        Back to discover
      </a>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit}>
          <p className="section-kicker">Create on Bowpad</p>
          <h1 className="mt-2 text-5xl font-black tracking-[-.05em]">
            Launch your token
          </h1>
          <p className="mt-3 text-muted-foreground">
            You’ll review everything before signing.
          </p>
          <div className="form-card mt-9">
            <div>
              <span className="field-label">
                Token image<i>*</i>
              </span>
              <label className={`upload-zone ${errors.image ? 'error' : ''}`}>
                {image ? (
                  <>
                    <img src={image} alt="Token upload preview" />
                    <span className="upload-overlay">
                      <UploadCloud />
                      Change image
                    </span>
                  </>
                ) : (
                  <>
                    <span className="upload-icon">
                      <FileImage />
                    </span>
                    <b>Upload token image</b>
                    <small>PNG, JPG, GIF, or WebP · max 5 MB</small>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={upload}
                  className="sr-only"
                />
              </label>
              {errors.image && (
                <span className="field-error">
                  <AlertCircle />
                  {errors.image}
                </span>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Token name" required error={errors.name}>
                <Input
                  value={f.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Good Bow"
                  aria-invalid={!!errors.name}
                />
              </Field>
              <Field label="Ticker" required error={errors.ticker}>
                <div className="ticker-input">
                  <span>$</span>
                  <Input
                    value={f.ticker}
                    onChange={(e) => set('ticker', e.target.value)}
                    placeholder="BOW"
                    aria-invalid={!!errors.ticker}
                  />
                </div>
              </Field>
            </div>
            <Field label="Description" required error={errors.description}>
              <Textarea
                className="min-h-28"
                maxLength={280}
                value={f.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Tell people what this token is about…"
              />
            </Field>
            <div className="border-t pt-6">
              <h2 className="font-bold">
                Social links{' '}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="X / Twitter">
                  <Input
                    value={f.twitter}
                    onChange={(e) => set('twitter', e.target.value)}
                    placeholder="x.com/yourtoken"
                  />
                </Field>
                <Field label="Telegram">
                  <Input
                    value={f.telegram}
                    onChange={(e) => set('telegram', e.target.value)}
                    placeholder="t.me/yourtoken"
                  />
                </Field>
                <Field label="Website" error={errors.website}>
                  <Input
                    value={f.website}
                    onChange={(e) => set('website', e.target.value)}
                    placeholder="https://yourtoken.xyz"
                  />
                </Field>
              </div>
            </div>
          </div>
          <Button type="submit" className="launch-button mt-6">
            {wallet === 'connected'
              ? 'Create Token'
              : 'Connect wallet to create'}
            <Rocket />
          </Button>
        </form>
        <aside>
          <div className="summary-card sticky top-5">
            <h2>Launch summary</h2>
            <Summary label="Creation fee" value="Free" />
            <Summary
              label="Buy fee"
              value={formatFee(bowpadNetwork.buyFeeBps)}
            />
            <Summary
              label="Sell fee"
              value={formatFee(bowpadNetwork.sellFeeBps)}
            />
            <Summary label="Network cost" value="Gas only" />
            <div className="mt-5 rounded-2xl bg-primary/10 p-4 text-xs">
              <b className="flex gap-2">
                <ShieldCheck />
                Factory-powered launch
              </b>
              <p className="mt-2 text-muted-foreground">
                Token and curve are created in one signed transaction.
              </p>
            </div>
            <div className="config-note mt-4">
              <Info />
              <p>
                <b>Testnet-ready</b>
                <br />
                Network values remain placeholders until verified.
              </p>
            </div>
          </div>
        </aside>
      </div>
      <Dialog open={sign} onOpenChange={setSign}>
        <DialogContent className="rounded-3xl p-6 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">
              Sign to create
            </DialogTitle>
            <DialogDescription>
              Review this request in your connected wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl bg-muted p-4">
            <Summary label="Action" value="Create token + curve" />
            <Summary label="Platform fee" value="Free" />
            <Summary label="Trading fee" value="1% buy / sell" />
            <Summary label="Wallet" value="0x71…c92F" />
          </div>
          <Button className="h-12" onClick={confirm} disabled={pending}>
            {pending ? (
              <>
                <LoaderCircle className="animate-spin" />
                Confirming…
              </>
            ) : (
              <>
                <Wallet />
                Sign transaction
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="copy-row">
      <div>
        <small>{label}</small>
        <b>{value}</b>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 900);
        }}
      >
        {copied ? <Check /> : <Clipboard />}
      </button>
    </div>
  );
}
function Token({
  wallet,
  connect,
}: {
  wallet: WalletState;
  connect: () => void;
}) {
  const t = tokens[0];
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('0.05');
  const [trade, setTrade] = useState(false);
  const [phase, setPhase] = useState<'review' | 'pending' | 'done'>('review');
  const estimate = amount
    ? (Number(amount) * 123456).toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })
    : '0';
  const start = () => (wallet === 'connected' ? setTrade(true) : connect());
  const confirm = () => {
    setPhase('pending');
    setTimeout(() => setPhase('done'), 1200);
  };
  return (
    <section className="site-shell py-8">
      <a
        href="/#discover"
        className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft />
        All tokens
      </a>
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="detail-card">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div
                className="token-art !size-24 !rounded-[28px] !text-2xl"
                style={{ background: t.color }}
              >
                {t.mark}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-black">{t.name}</h1>
                  <span className="ticker-badge">${t.ticker}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{t.desc}</p>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <BadgeCheck className="text-primary" />
                  Created by <b className="text-foreground">0x71…c92F</b> ·{' '}
                  <Clock3 />
                  12 min ago
                </p>
                <div className="mt-5 flex gap-2">
                  <a className="social-chip">
                    <Globe2 />
                    Website
                  </a>
                  <a className="social-chip">
                    <b>𝕏</b>X
                  </a>
                  <a className="social-chip">
                    <MessageCircle />
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Market cap', '$38,420'],
              ['24h volume', '$12,890'],
              ['Holders', '284'],
            ].map(([a, b], i) => (
              <div className="metric-card" key={a}>
                {i === 2 ? <Users /> : <BarChart3 />}
                <div>
                  <p>{a}</p>
                  <b>{b}</b>
                </div>
              </div>
            ))}
          </div>
          <div className="detail-card">
            <div className="flex items-end justify-between">
              <div>
                <p className="section-kicker">Bonding curve</p>
                <h2 className="mt-2 text-2xl font-black">72% to graduation</h2>
              </div>
              <b>28.4 / 39.4 ETH</b>
            </div>
            <Progress
              className="mt-6 [&_[data-slot=progress-track]]:h-3"
              value={72}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Graduation prepares liquidity migration to a supported DEX. It
              does not mean listing on Robinhood.
            </p>
          </div>
          <div className="detail-card">
            <h2 className="text-xl font-black">Live activity</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Wallet</th>
                    <th>ETH</th>
                    <th>$BOW</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Buy', '0x4d…a821', '0.18', '22,114', '8s'],
                    ['Buy', '0xb2…19f0', '0.05', '6,172', '24s'],
                    ['Sell', '0xe8…47c1', '0.03', '3,690', '41s'],
                    ['Buy', '0x91…8d33', '0.31', '38,025', '1m'],
                  ].map((r) => (
                    <tr key={r[1]}>
                      {r.map((v, i) => (
                        <td key={v}>
                          {i === 0 ? (
                            <span
                              className={
                                v === 'Buy' ? 'trade-buy' : 'trade-sell'
                              }
                            >
                              {v}
                            </span>
                          ) : (
                            v
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="detail-card">
            <h2 className="text-xl font-black">Token details</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <CopyRow label="Contract address" value="0x2f71…b4A9" />
              <CopyRow label="Creator wallet" value="0x71a8…c92F" />
              <CopyRow label="Token standard" value="ERC-20" />
              <CopyRow label="Factory" value="Bowpad Factory (testnet)" />
            </div>
          </div>
        </div>
        <aside>
          <div className="trade-panel sticky top-5">
            <div className="trade-tabs">
              <button
                className={side === 'buy' ? 'active' : ''}
                onClick={() => setSide('buy')}
              >
                Buy
              </button>
              <button
                className={side === 'sell' ? 'active' : ''}
                onClick={() => setSide('sell')}
              >
                Sell
              </button>
            </div>
            <p className="field-label mt-6">You pay</p>
            <div className="amount-box">
              <Input
                value={amount}
                inputMode="decimal"
                onChange={(e) =>
                  setAmount(e.target.value.replace(/[^0-9.]/g, ''))
                }
              />
              <b>ETH</b>
            </div>
            <div className="mt-3 flex gap-2">
              {['0.01', '0.05', '0.1', '0.5'].map((x) => (
                <button
                  className={`amount-pill ${amount === x ? 'active' : ''}`}
                  onClick={() => setAmount(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className="my-5 text-center">↓</div>
            <p className="field-label">You receive</p>
            <div className="amount-box muted">
              <strong>{estimate}</strong>
              <b>$BOW</b>
            </div>
            <div className="mt-5 flex justify-between text-xs text-muted-foreground">
              <span>Platform fee</span>
              <span>1%</span>
            </div>
            <Button
              className={`mt-6 h-13 w-full rounded-2xl text-base ${side === 'sell' ? 'bg-[#ffddd3] text-[#6d2414]' : 'bg-[#172011] text-white'}`}
              onClick={start}
            >
              {wallet === 'connected'
                ? `${side === 'buy' ? 'Buy' : 'Sell'} $BOW`
                : 'Connect wallet to trade'}
            </Button>
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              Trades execute against the bonding curve. Prices can move quickly.
            </p>
          </div>
        </aside>
      </div>
      <Dialog open={trade} onOpenChange={setTrade}>
        <DialogContent className="rounded-3xl p-6 sm:max-w-md">
          {phase === 'done' ? (
            <div className="py-5 text-center">
              <div className="success-ring !size-16">
                <Check />
              </div>
              <DialogTitle className="mt-5 text-2xl font-black">
                Trade confirmed
              </DialogTitle>
              <DialogDescription className="mt-2">
                You bought approximately {estimate} $BOW.
              </DialogDescription>
              <Button className="mt-6 w-full" onClick={() => setTrade(false)}>
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">
                  {phase === 'pending'
                    ? 'Confirming trade…'
                    : 'Review your trade'}
                </DialogTitle>
                <DialogDescription>
                  {phase === 'pending'
                    ? 'Waiting for network confirmation.'
                    : 'The final amount may change slightly.'}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-2xl bg-muted p-4">
                <Summary label="You pay" value={`${amount} ETH`} />
                <Summary label="You receive" value={`≈ ${estimate} $BOW`} />
                <Summary label="Platform fee" value="1%" />
              </div>
              {phase === 'pending' ? (
                <p className="flex justify-center gap-2 py-4">
                  <LoaderCircle className="animate-spin" />
                  Transaction pending
                </p>
              ) : (
                <Button className="h-12" onClick={confirm}>
                  <Wallet />
                  Sign & confirm
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function BowpadApp({ view }: { view: View }) {
  const [wallet, setWallet] = useState<WalletState>('disconnected');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('bowpad-wallet')) setWallet('connected');
  }, []);
  return (
    <main className="min-h-screen overflow-hidden">
      <Nav
        wallet={wallet}
        setWallet={setWallet}
        connect={() => setOpen(true)}
      />
      {wallet === 'wrong' && (
        <div className="network-banner">
          <AlertCircle />
          Wrong network.
          <button
            onClick={() => {
              setWallet('connected');
              sessionStorage.setItem('bowpad-wallet', 'connected');
            }}
          >
            Switch to testnet
          </button>
        </div>
      )}
      {view === 'home' ? (
        <Home wallet={wallet} connect={() => setOpen(true)} />
      ) : view === 'create' ? (
        <Create wallet={wallet} connect={() => setOpen(true)} />
      ) : (
        <Token wallet={wallet} connect={() => setOpen(true)} />
      )}
      <Footer />
      <WalletDialog
        open={open}
        setOpen={setOpen}
        wallet={wallet}
        setWallet={setWallet}
      />
    </main>
  );
}
