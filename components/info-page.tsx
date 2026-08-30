import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  ExternalLink,
  FileText,
  Fingerprint,
  Globe2,
  Info,
  KeyRound,
  LockKeyhole,
  Network,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { Brand, Footer } from '@/components/bowpad-app';

export type InfoPageKind = 'docs' | 'privacy' | 'terms' | 'trust';

const pageMeta = {
  docs: {
    eyebrow: 'Product documentation',
    title: 'How Bowpad works',
    intro:
      'A plain-language guide to creating tokens, trading on a bonding curve, understanding fees, and knowing what your wallet is signing.',
    icon: BookOpen,
  },
  privacy: {
    eyebrow: 'Legal · Updated August 30, 2026',
    title: 'Privacy policy',
    intro:
      'What Bowpad may collect, what stays in your wallet, what becomes public onchain, and the choices available to you.',
    icon: LockKeyhole,
  },
  terms: {
    eyebrow: 'Legal · Updated August 30, 2026',
    title: 'Terms of use',
    intro:
      'The rules and risk disclosures that apply when you access Bowpad, create a token, or submit a blockchain transaction.',
    icon: Scale,
  },
  trust: {
    eyebrow: 'Verify, do not trust',
    title: 'Trust center',
    intro:
      'A candid view of Bowpad’s current status, wallet permissions, fee model, contracts, security work, and remaining launch requirements.',
    icon: ShieldCheck,
  },
};

function InfoNav({ active }: { active: InfoPageKind }) {
  return (
    <nav className="site-shell info-nav">
      <Brand />
      <div className="info-nav-links">
        {(['docs', 'trust', 'privacy', 'terms'] as InfoPageKind[]).map(
          (item) => (
            <a
              key={item}
              className={active === item ? 'active' : ''}
              href={`/${item}`}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ),
        )}
      </div>
      <a className="info-launch-link" href="/">
        Launchpad <ArrowRight />
      </a>
    </nav>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="info-section">
      <h2>{title}</h2>
      <div className="info-copy">{children}</div>
    </section>
  );
}

function Notice({
  children,
  tone = 'green',
}: {
  children: React.ReactNode;
  tone?: 'green' | 'amber';
}) {
  return (
    <div className={`info-notice ${tone}`}>
      {tone === 'green' ? <Info /> : <ShieldAlert />}
      {children}
    </div>
  );
}

function DocsContent() {
  return (
    <>
      <Notice>
        <p>
          <strong>MVP status:</strong> Bowpad currently demonstrates the
          complete user experience with testnet-ready abstractions. Mainnet
          network values and production contract addresses are intentionally not
          invented.
        </p>
      </Notice>
      <Section id="overview" title="What Bowpad is">
        <p>
          Bowpad is a wallet-native token launchpad designed for Robinhood
          Chain. A creator supplies a token image, name, ticker, description,
          and optional social links. The connected wallet then signs a
          transaction that asks a Token Factory contract to create the token and
          its bonding curve.
        </p>
        <p>
          There is no Bowpad username or password. Your public wallet address
          identifies your activity, and the token page publicly displays the
          creator as <code>Created by 0x…</code>.
        </p>
      </Section>
      <Section id="wallet" title="Wallet connection and signatures">
        <p>
          Connecting a wallet only exposes the public address and supported
          network information. It does not give Bowpad the seed phrase, private
          key, or permission to move funds automatically.
        </p>
        <ul>
          <li>
            <strong>Connect:</strong> shares the public address with the
            interface.
          </li>
          <li>
            <strong>Create:</strong> requests one transaction signature for
            token and curve creation.
          </li>
          <li>
            <strong>Buy or sell:</strong> requests a new signature for each
            trade.
          </li>
          <li>
            <strong>Disconnect:</strong> clears the local Bowpad session; it
            does not alter the wallet.
          </li>
        </ul>
        <Notice tone="amber">
          <p>
            Always inspect the network, contract address, asset, amount, and fee
            shown by your wallet before signing.
          </p>
        </Notice>
      </Section>
      <Section id="launch" title="Creating a token">
        <ol>
          <li>
            Upload a PNG, JPG, GIF, or WebP image under the displayed size
            limit.
          </li>
          <li>Enter the required token name, ticker, and description.</li>
          <li>Add X, Telegram, or website links if the project has them.</li>
          <li>
            Review the creation fee, trading fees, network, and creator wallet.
          </li>
          <li>Sign the factory transaction in the connected wallet.</li>
        </ol>
        <p>
          After confirmation, Bowpad creates a public token page showing market
          data, bonding-curve progress, contract address, creator address,
          holders, and transaction activity.
        </p>
      </Section>
      <Section id="curve" title="Bonding curve and graduation">
        <p>
          During the launch phase, tokens trade against an automated bonding
          curve. The displayed quote can change between review and confirmation
          as other transactions are processed. Price impact and gas are separate
          from the platform fee.
        </p>
        <p>
          Graduation means that the configured curve threshold has been reached
          and liquidity can be prepared for migration to a supported
          decentralized exchange. It does <strong>not</strong> mean the token is
          reviewed, approved, or listed by Robinhood.
        </p>
      </Section>
      <Section id="fees" title="Configurable fees">
        <div className="info-table">
          <div>
            <span>Token creation</span>
            <strong>Default concept: free + gas</strong>
          </div>
          <div>
            <span>Buy platform fee</span>
            <strong>Default: 1%</strong>
          </div>
          <div>
            <span>Sell platform fee</span>
            <strong>Default: 1%</strong>
          </div>
          <div>
            <span>Bowfee recipient</span>
            <strong>0xf3455c1173378819c627b7196fe3fc5d95495f03</strong>
          </div>
          <div>
            <span>Network gas</span>
            <strong>Paid to the network</strong>
          </div>
        </div>
        <p>
          The fee wallet is disclosed publicly and stored in the network
          configuration. The smart contract must use the same address before any
          production launch; users should verify it against the deployed
          contract and wallet transaction preview.
        </p>
      </Section>
      <Section id="architecture" title="Technical architecture">
        <div className="architecture-flow">
          <span>Wallet</span>
          <ArrowRight />
          <span>Bowpad UI</span>
          <ArrowRight />
          <span>Token Factory</span>
          <ArrowRight />
          <span>Token + curve</span>
        </div>
        <p>
          The app is structured around a network configuration object and a
          Token Factory adapter. Chain ID, RPC URL, explorer URL, factory
          address, and contract ABI remain explicit deployment inputs. This
          prevents unverified network values from quietly entering production.
        </p>
      </Section>
      <Section id="safety" title="Safety checklist">
        <ul className="check-list">
          <li>
            <CheckCircle2 />
            Verify the exact Bowpad domain before connecting.
          </li>
          <li>
            <CheckCircle2 />
            Never share a seed phrase or private key.
          </li>
          <li>
            <CheckCircle2 />
            Confirm the network and contract in every wallet prompt.
          </li>
          <li>
            <CheckCircle2 />
            Treat social links and creator claims as unverified.
          </li>
          <li>
            <CheckCircle2 />
            Assume a token can lose all value and liquidity.
          </li>
        </ul>
      </Section>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <Notice tone="amber">
        <p>
          This is a product-ready policy draft, not a claim that every
          jurisdictional requirement has been completed. Bowpad should obtain
          qualified legal review before a public mainnet launch.
        </p>
      </Notice>
      <Section id="scope" title="1. Scope">
        <p>
          This policy explains how Bowpad handles information when you browse
          the launchpad, connect a wallet, create a token, or use trading
          features. Public blockchain activity is controlled by the relevant
          network and cannot generally be edited or deleted by Bowpad.
        </p>
      </Section>
      <Section id="collect" title="2. Information we may process">
        <ul>
          <li>
            <strong>Wallet data:</strong> public address, selected network,
            transaction hashes, token contracts, and publicly available onchain
            activity.
          </li>
          <li>
            <strong>Token content:</strong> names, tickers, descriptions,
            images, websites, and social links submitted for a launch.
          </li>
          <li>
            <strong>Technical data:</strong> browser type, device type,
            approximate region derived from network data, timestamps, error
            diagnostics, and basic security logs.
          </li>
          <li>
            <strong>Support data:</strong> information you voluntarily provide
            when requesting help or reporting abuse.
          </li>
        </ul>
        <p>
          Bowpad does not need your seed phrase, private key, wallet recovery
          phrase, or wallet password. You should never provide them.
        </p>
      </Section>
      <Section id="public" title="3. Public blockchain information">
        <p>
          Wallet addresses and transactions are public by design. When you
          create or trade a token, third parties may permanently associate the
          public wallet with that activity. Blockchain explorers, analytics
          providers, and other users can copy and analyze this information
          independently of Bowpad.
        </p>
      </Section>
      <Section id="use" title="4. Why information is used">
        <ul>
          <li>Operate token discovery, creation, and trading interfaces.</li>
          <li>Display creator attribution and transaction history.</li>
          <li>Prevent abuse, diagnose failures, and protect the service.</li>
          <li>Measure aggregate product usage and improve reliability.</li>
          <li>Respond to support, legal, or security requests.</li>
        </ul>
      </Section>
      <Section id="sharing" title="5. Service providers and sharing">
        <p>
          Bowpad may use hosting, infrastructure, wallet connectivity, RPC,
          storage, analytics, and security providers. Only information
          reasonably needed to provide their function should be shared.
          Information may also be disclosed when required by valid law, to
          investigate abuse, or to protect users and the service.
        </p>
        <p>
          Bowpad does not sell wallet private keys because it never receives
          them. A production launch must list material analytics and
          infrastructure providers here before collecting related data.
        </p>
      </Section>
      <Section id="retention" title="6. Retention and security">
        <p>
          Offchain information should be kept only for the period needed for the
          stated purpose, security, dispute handling, or legal requirements.
          Public blockchain records may remain available indefinitely and are
          outside Bowpad’s ability to erase.
        </p>
        <p>
          No system is perfectly secure. Bowpad should use access controls,
          encryption in transit, least-privilege administration, dependency
          review, and incident-response procedures appropriate to the
          information processed.
        </p>
      </Section>
      <Section id="rights" title="7. Your choices and rights">
        <p>
          Depending on location, users may have rights to request access,
          correction, deletion, restriction, portability, or objection
          concerning offchain personal data. These rights do not necessarily
          apply to immutable public blockchain records.
        </p>
        <p>
          A dedicated privacy contact and verified operating entity must be
          published before accepting public mainnet users. Until then, this MVP
          does not invite submission of sensitive personal information.
        </p>
      </Section>
      <Section id="children" title="8. Children">
        <p>
          Bowpad is not intended for children or anyone below the legal age
          required to use digital-asset services in their location. The product
          should not knowingly collect personal information from children.
        </p>
      </Section>
      <Section id="changes" title="9. Policy changes">
        <p>
          Material changes should be announced with an updated effective date.
          When appropriate, Bowpad should provide advance notice in the product
          before a new policy takes effect.
        </p>
      </Section>
      <div className="source-note">
        <Globe2 />
        <p>
          Privacy design follows transparency, purpose limitation, data
          minimization, storage limitation, and security principles described by
          public regulators. Final compliance depends on Bowpad’s operating
          entity, jurisdictions, and actual production data flows.
        </p>
      </div>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <Notice tone="amber">
        <p>
          These terms are a transparent launch-stage draft and should be
          reviewed by qualified counsel after the operating entity and governing
          jurisdiction are selected.
        </p>
      </Notice>
      <Section id="acceptance" title="1. Acceptance and eligibility">
        <p>
          By accessing Bowpad, you agree to these terms and confirm that you are
          legally able to enter them. You are responsible for determining
          whether use of Bowpad and digital assets is lawful in your location.
          Restricted, sanctioned, or otherwise prohibited users may not use the
          service.
        </p>
      </Section>
      <Section id="service" title="2. The service">
        <p>
          Bowpad provides a non-custodial interface for discovering, creating,
          and trading community tokens through third-party wallets and
          blockchain contracts. Bowpad does not provide a bank account,
          brokerage account, exchange account, custody service, financial
          advice, or a guarantee of token listing.
        </p>
      </Section>
      <Section id="wallet" title="3. Wallet responsibility">
        <p>
          You control the wallet used with Bowpad and are solely responsible for
          its keys, recovery phrase, security, approvals, and transactions.
          Blockchain transactions may be irreversible. Bowpad cannot restore a
          wallet, reverse a transaction, or recover assets sent to the wrong
          address.
        </p>
      </Section>
      <Section id="creator" title="4. Creator responsibilities">
        <p>
          A creator must have the rights needed for every submitted name, image,
          description, and social link. Creators may not misrepresent
          affiliation, promise guaranteed returns, impersonate another project,
          conceal material risks, or upload unlawful content.
        </p>
        <p>
          The public “Created by” wallet label is attribution data, not
          verification, endorsement, or a statement that Bowpad knows the
          creator’s identity.
        </p>
      </Section>
      <Section id="fees" title="5. Fees and gas">
        <p>
          Before signing, the interface should display applicable creation, buy,
          and sell fees. Network gas is determined by the network and is not
          controlled by Bowpad. Fees may change only through disclosed
          configuration or contract updates, and users should verify the wallet
          prompt before confirming.
        </p>
      </Section>
      <Section id="risk" title="6. Digital-asset risks">
        <ul>
          <li>
            Tokens may be volatile, illiquid, manipulated, abandoned, or lose
            all value.
          </li>
          <li>
            Smart contracts may contain bugs, be exploited, or behave
            unexpectedly.
          </li>
          <li>Quoted amounts can change before transaction confirmation.</li>
          <li>
            Networks, wallets, RPC providers, and decentralized exchanges may
            fail.
          </li>
          <li>Legal and tax treatment may change or differ by jurisdiction.</li>
          <li>Social links, descriptions, and creator claims may be false.</li>
        </ul>
        <Notice tone="amber">
          <p>
            Only use assets you can afford to lose. Bowpad does not recommend or
            endorse any displayed token.
          </p>
        </Notice>
      </Section>
      <Section id="prohibited" title="7. Prohibited conduct">
        <p>
          You may not use Bowpad for fraud, theft, market manipulation,
          sanctions evasion, money laundering, malware, intellectual-property
          infringement, harassment, deceptive impersonation, unauthorized
          access, or interference with the service. Bowpad may restrict its own
          interface when reasonably necessary, but cannot guarantee removal of
          independent blockchain contracts.
        </p>
      </Section>
      <Section id="availability" title="8. Availability and changes">
        <p>
          The interface may be modified, suspended, or discontinued. Third-party
          networks and services are outside Bowpad’s control. Features
          identified as testnet, preview, simulated, experimental, or unaudited
          must not be treated as production assurances.
        </p>
      </Section>
      <Section id="disclaimer" title="9. Disclaimers and liability">
        <p>
          To the maximum extent permitted by applicable law, Bowpad is provided
          “as is” and “as available,” without warranties of uninterrupted
          operation, accuracy, merchantability, fitness for a particular
          purpose, or non-infringement. Liability limitations and any
          indemnification language must be finalized for the operating entity
          and applicable jurisdiction before public launch.
        </p>
      </Section>
      <Section id="law" title="10. Governing law and disputes">
        <p>
          No governing jurisdiction, arbitration venue, or operating legal
          entity is declared in this MVP. Those terms must not be invented. They
          will be added after the responsible entity is established and
          qualified counsel approves the final agreement.
        </p>
      </Section>
      <Section id="changes" title="11. Changes and contact">
        <p>
          Updated terms should show a new effective date and provide appropriate
          notice. A verified legal contact and operating-entity address must be
          published before public mainnet availability.
        </p>
      </Section>
    </>
  );
}

function TrustContent() {
  const status = [
    { label: 'Wallet custody', value: 'Non-custodial', good: true },
    { label: 'Creation fee', value: 'Default: free + gas', good: true },
    { label: 'Buy / sell fee', value: '1% / 1% configurable', good: true },
    { label: 'Mainnet contracts', value: 'Not published', good: false },
    { label: 'Independent audit', value: 'Not completed', good: false },
    { label: 'Public GitHub', value: 'Source available', good: true },
  ];
  return (
    <>
      <div className="trust-grid">
        {status.map((item) => (
          <div className="trust-status" key={item.label}>
            <span className={item.good ? 'good' : 'pending'}>
              {item.good ? <CheckCircle2 /> : <Info />}
              {item.good ? 'Confirmed' : 'Pending'}
            </span>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <Section id="verify" title="What users can verify">
        <div className="trust-feature-grid">
          <article>
            <Wallet />
            <h3>Wallet permissions</h3>
            <p>
              Bowpad asks for a public address and a separate signature for each
              onchain action. It never asks for a seed phrase.
            </p>
          </article>
          <article>
            <CircleDollarSign />
            <h3>Fee disclosure</h3>
            <p>
              Creation and trading fees are shown before signing and stored in
              configuration for clear review.
            </p>
          </article>
          <article>
            <Network />
            <h3>Network configuration</h3>
            <p>
              Chain ID, RPC, explorer, and factory address remain explicit
              placeholders until independently verified.
            </p>
          </article>
          <article>
            <Fingerprint />
            <h3>Creator attribution</h3>
            <p>
              Every token page publicly shows the creator wallet, token
              contract, and transaction activity.
            </p>
          </article>
        </div>
      </Section>
      <Section id="github" title="Open source and GitHub">
        <div className="github-card">
          <Code2 />
          <div>
            <h3>Bowpad is public on GitHub</h3>
            <p>
              Follow development, inspect the current MVP source, and verify
              future contract releases directly in the official repository.
            </p>
          </div>
          <a
            href="https://github.com/Bowpadlaunch/Bowpad"
            target="_blank"
            rel="noreferrer"
          >
            View repository <ExternalLink />
          </a>
        </div>
        <p>
          The repository contains the Bowpad interface and testnet-ready
          architecture. Mainnet contract addresses, verified source, audits, and
          tagged releases will be added as they become available.
        </p>
      </Section>
      <Section id="contracts" title="Contract verification plan">
        <ol>
          <li>Publish the Token Factory and bonding-curve source code.</li>
          <li>Pin compiler settings and deployment configuration.</li>
          <li>Verify source on the official chain explorer.</li>
          <li>Publish factory, fee-recipient, and implementation addresses.</li>
          <li>Tag the deployed commit and make the ABI downloadable.</li>
          <li>Document upgradeability, admin keys, and emergency controls.</li>
        </ol>
      </Section>
      <Section id="security" title="Security roadmap">
        <div className="roadmap">
          <div>
            <span>01</span>
            <strong>Threat model</strong>
            <p>
              Document assets, permissions, trust boundaries, and failure modes.
            </p>
          </div>
          <div>
            <span>02</span>
            <strong>Automated testing</strong>
            <p>
              Unit, invariant, fuzz, and fork tests for contracts and fee
              behavior.
            </p>
          </div>
          <div>
            <span>03</span>
            <strong>Independent audit</strong>
            <p>
              Engage a qualified smart-contract auditor and publish the final
              report.
            </p>
          </div>
          <div>
            <span>04</span>
            <strong>Bug reporting</strong>
            <p>
              Publish a security contact, safe-harbor policy, and response
              targets.
            </p>
          </div>
        </div>
      </Section>
      <Section id="independence" title="Independent from Robinhood">
        <p>
          Bowpad is an independent project. Robinhood does not automatically
          review, approve, endorse, sponsor, or list tokens created through
          Bowpad. Robinhood Chain compatibility describes the intended network
          environment, not an official commercial relationship.
        </p>
      </Section>
    </>
  );
}

export function InfoPage({ kind }: { kind: InfoPageKind }) {
  const meta = pageMeta[kind];
  const Icon = meta.icon;
  return (
    <main className="info-page">
      <InfoNav active={kind} />
      <header className="site-shell info-hero">
        <span className="info-hero-icon">
          <Icon />
        </span>
        <p>{meta.eyebrow}</p>
        <h1>{meta.title}</h1>
        <div>{meta.intro}</div>
      </header>
      <div className="site-shell info-layout">
        <aside className="info-sidebar">
          <p>On this page</p>
          {kind === 'docs' && (
            <>
              <a href="#overview">Overview</a>
              <a href="#wallet">Wallets</a>
              <a href="#launch">Create a token</a>
              <a href="#curve">Bonding curve</a>
              <a href="#fees">Fees</a>
              <a href="#architecture">Architecture</a>
              <a href="#safety">Safety</a>
            </>
          )}
          {kind === 'privacy' && (
            <>
              <a href="#scope">Scope</a>
              <a href="#collect">Information</a>
              <a href="#public">Onchain data</a>
              <a href="#sharing">Sharing</a>
              <a href="#retention">Retention</a>
              <a href="#rights">Your rights</a>
            </>
          )}
          {kind === 'terms' && (
            <>
              <a href="#acceptance">Acceptance</a>
              <a href="#service">Service</a>
              <a href="#creator">Creators</a>
              <a href="#risk">Risks</a>
              <a href="#prohibited">Prohibited use</a>
              <a href="#disclaimer">Disclaimers</a>
            </>
          )}
          {kind === 'trust' && (
            <>
              <a href="#verify">Verify</a>
              <a href="#github">GitHub</a>
              <a href="#contracts">Contracts</a>
              <a href="#security">Security</a>
              <a href="#independence">Independence</a>
            </>
          )}
        </aside>
        <article className="info-article">
          {kind === 'docs' ? (
            <DocsContent />
          ) : kind === 'privacy' ? (
            <PrivacyContent />
          ) : kind === 'terms' ? (
            <TermsContent />
          ) : (
            <TrustContent />
          )}
        </article>
      </div>
      <Footer />
    </main>
  );
}

