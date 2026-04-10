# Atomity — Frontend Engineering Challenge Submission

## Feature: Option A (0:30–0:40) — Interactive Drill-Down Cost Explorer

Chose Option A — the cluster/namespace/pod visualization. Built it as a full multi-page app with 4 nav pages, scroll-triggered animations throughout, and an interactive drill-down cost explorer.

## Live Demo
Deploy: `vercel --prod` (one command)

## Running Locally
```bash
npm install
npm run dev
```

## Pages
- **Home** — Hero with parallax, animated stat cards, mini dashboard preview, resource icons, cloud providers, cost explorer, CTA
- **Platform** — Feature cards, animated workflow steps, integration badges  
- **Pricing** — Monthly/annual toggle, 3-tier pricing cards with animated counters
- **Docs** — Searchable docs, animated terminal installation demo
- **Blog** — Filterable posts with featured card layout

## Architecture
```
src/
  tokens/index.ts             — CSS variable token map
  types/index.ts              — TypeScript types
  lib/dataService.ts          — Seeded cost data from JSONPlaceholder API
  hooks/
    useClusterData.ts         — TanStack Query (staleTime:5min, gcTime:30min)
    useCountUp.ts             — Animated number counter
    useInView.ts              — IntersectionObserver scroll trigger
  components/
    Navbar.tsx                — Sticky glass nav, active indicator, mobile menu
    HeroSection.tsx           — Parallax, orbiting ring, word-by-word reveal
    AnimatedBubble.tsx        — Spring physics blocks with glow + tooltip
    CostExplorer.tsx          — Cluster→Namespace→Pod drill-down
    CostTableRow.tsx          — Animated table rows with countup cells
    Breadcrumb.tsx            — Drill path nav with AnimatePresence
    ResourceIconsSection.tsx  — Icon cards with pulse rings
    CloudProvidersSection.tsx — AWS/Azure/GCP with floating price tag
    LoadingSkeleton.tsx       — Shimmer skeleton
    Badge.tsx / ThemeToggle.tsx / ResourceIcon.tsx
  pages/
    PlatformPage.tsx          — Full features + integrations page
    PricingPage.tsx           — Full pricing page with toggle
    DocsPage.tsx              — Searchable docs + terminal animation
    BlogPage.tsx              — Filterable blog with featured layout
  styles/globals.css          — CSS tokens, Tailwind v4, 15+ keyframe animations
  App.tsx                     — AnimatePresence page routing + dark mode
```

## Checklist
- ✅ Design tokens (CSS vars, never raw hex)
- ✅ Data fetching from JSONPlaceholder API
- ✅ TanStack Query caching (5min stale, 30min gc)
- ✅ Loading + error states
- ✅ Modern CSS: color-mix(), clamp(), container queries, @keyframes
- ✅ Framer Motion: spring physics, stagger, scroll triggers, AnimatePresence
- ✅ Scroll-triggered animations (IntersectionObserver)
- ✅ Number countup animations
- ✅ prefers-reduced-motion respected
- ✅ Semantic HTML (section, nav, header, article, footer)
- ✅ Dark mode with full token swap
- ✅ Responsive: 375px / 768px / 1280px+
- ✅ All components hand-built (no MUI, Chakra, shadcn)
- ✅ 4 full nav pages (Platform, Pricing, Docs, Blog)

## Libraries
| Library | Why |
|---|---|
| React 18 + TypeScript | Component model + type safety |
| Vite | Fast builds |
| Framer Motion | Spring physics, AnimatePresence, useScroll |
| TanStack Query v5 | Caching, loading/error states |
| Tailwind CSS v4 | Utility styling via Vite plugin |

## Tradeoffs
- No real backend — JSONPlaceholder seeds deterministic cost data via RNG
- Page routing is in-memory (no React Router) for simplicity
- Bubble sizing uses proportional height, not treemap area (matches video reference better)

## What I'd Improve
- Real WebSocket cost streaming
- Keyboard arrow navigation in the cost explorer
- Sparkline trends per bubble on hover
- Anomaly badges ("↑34% vs last month")
- Storybook component documentation
