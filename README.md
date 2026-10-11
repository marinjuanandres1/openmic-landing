# Open Mic · Tres60Lab × Siente

Landing page for **openmic.siente.live**. Built with React, Vite and Tailwind. Every `git push` to `main` deploys to Vercel.

Everyone pays the cover, whether they sing or just come to listen. The form sends each sign-up to **Siente Ticket** (backoffice.siente.live), which saves it and returns the Mercado Pago link.

## Flow

1. The page loads `GET {VITE_BACKOFFICE_URL}/api/public/status`. That returns `{ closed, price, maxTickets }`. If the list is closed, the form becomes «Aforo completo».
2. The form posts to `POST {VITE_BACKOFFICE_URL}/api/public/checkout` with name, WhatsApp, email, number of tickets, companions, and whether the person sings. Singers also send songs and format.
3. The back office creates the contact (source "Web", event "Open Mic", with the open mic answers) and returns the Mercado Pago `url`. The page redirects there.
4. Once the payment is approved, the person appears in **Invitados** with the **Canta** badge if they sing. Mercado Pago sends them back to `backoffice.siente.live/gracias`.

Price, ticket cap and closing the list are all handled in the back office (**Ajustes**). The page only has fallbacks for when it can't reach the back office: $20.000 and 10 tickets.

## Setup

```bash
npm install
npm run dev -- --port 5174
```

Environment variable (`.env.local` for dev, Vercel for production):

```
VITE_BACKOFFICE_URL=https://backoffice.siente.live
```

For local development, point it at `http://localhost:3000` and add `http://localhost:5174` to `PUBLIC_CHECKOUT_ORIGINS` in the back office.

## Changing the event

Event text (date, time, address) lives in `src/event.ts`. The flyer is `public/flyer.jpg`, and `public/og.jpg` is the link preview (1200×630).

## Brand

- Siente palette (Brand Book 2026): morado `#6A0F84`, lila `#CEA7DC`, naranja `#F25021`, negro `#1D1D1F`, hueso `#F4EFEB`. Type is Archivo at its widest for headlines.
- Logos in `public/`:
  - `tres60lab.svg`, made from `LOGO_360.ai` and colored hueso through `style="color:…"`.
  - `siente-crema.png` and `siente-simbolo.png` (favicon).
- Auxiliary brand shapes in `public/ea/`.
