# portfolio

Static Next.js portfolio deployed on Cloudflare Pages.

## Local development

```bash
pnpm install
pnpm dev
```

## Cloudflare Pages

This app uses Next.js static export, so `pnpm build` writes the deployable site to `out/`.

For Cloudflare Pages Git integration:

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `pnpm build`
- Build output directory: `out`
- Production branch: `main`

For Wrangler direct upload:

```bash
pnpm pages:deploy
```

After the Pages project exists, add the production domain from **Workers & Pages > your project > Custom domains**. Because the domain is already managed by Cloudflare, Pages will create the required DNS record when you confirm the custom domain.
