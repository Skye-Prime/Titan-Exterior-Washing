# Next.js Multi-tenant Starter Template

A minimalistic multi-tenant Next.js starter template with minimal setup and a modular design. Bring your own backend and database.

[Demo](https://stack-template.vercel.app/)

## Landing Page

<div align="center">
<img src="./assets/landing-page.png" alt="Teams" width="600"/>
</div>

## Dashboard

<div align="center">
<img src="./assets/dashboard-overview.png" alt="Teams" width="600"/>
</div>

## Multi-tenancy (Teams)

<div align="center">
<img src="./assets/team-switcher.png" alt="Teams" width="400"/>
</div>

## Account Settings

<div align="center">
<img src="./assets/account-settings.png" alt="Teams" width="500"/>
</div>

## Getting Started

1. Clone the repository

    ```bash
    git clone git@github.com:stack-auth/stack-template.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Register an account on [Stack Auth](https://stack-auth.com), copy the keys from the dashboard, and paste them into the `.env.local` file. Then, enable "client team creation" on the team settings tab.

    If you want to learn more about Stack Auth or self-host it, check out the [Docs](https://docs.stack-auth.com) and [GitHub](https://github.com/stack-auth/stack).

4. Start the development server and go to [http://localhost:3000](http://localhost:3000)

    ```bash
    npm run dev 
    ```

## Features & Tech Stack

- Next.js 14 app router
- TypeScript
- Tailwind & Shadcn UI
- Stack Auth
- Multi-tenancy (teams/orgs)
- Dark mode

## Single-tenant deployment for 360 Storage Solutions

For this project the multi-tenant features are not used. Configure a single domain for 360 Storage Solutions, disable any tenant signup flows, and supply the WebSelfStorage environment variables (`WSS_API_KEY`, `WSS_ENTITY_ID`, `WSS_API_BASE_URL`, `WSS_PAYMENT_PORTAL_URL`, `NEXT_PUBLIC_WSS_PAYMENT_PORTAL_URL`, and a move-in checkout URL such as `NEXT_PUBLIC_WSS_MOVE_IN_URL` or `NEXT_PUBLIC_WSS_MOVE_IN_URL_TEMPLATE`) in your `.env.local`.

## Inspired by

- [Shadcn UI](https://github.com/shadcn-ui/ui)
- [Shadcn Taxonomy](https://github.com/shadcn-ui/taxonomy)
