# portfolio

Static TanStack Start portfolio deployed on Cloudflare Pages.

## Local development

```bash
pnpm install
pnpm dev
```

## Cloudflare Pages

This app uses TanStack Start prerendering, so `pnpm build` writes the deployable static site to `.output/public`.

For Cloudflare Pages Git integration:

- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `.output/public`
- Production branch: `main`

Do not use the Next.js, OpenNext, or Workers preset for this site. It is deployed as prerendered static assets on Pages.

For Wrangler direct upload:

```bash
pnpm pages:deploy
```

After the Pages project exists, add the production domain from **Workers & Pages > your project > Custom domains**. Because the domain is already managed by Cloudflare, Pages will create the required DNS record when you confirm the custom domain.
