# web

Static TanStack Start portfolio deployed on Cloudflare Pages.

## Local development

```bash
pnpm install
pnpm dev
```

## Cloudflare Pages

This app uses TanStack Start prerendering, so `pnpm build` writes the deployable static site to `.output/public`.

Do not use the Next.js, OpenNext, or Workers preset for this site. It is deployed as prerendered static assets on Pages.

For Wrangler direct upload:

```bash
pnpm pages:deploy
```
