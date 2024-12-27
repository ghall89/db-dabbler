# WhiskerDB 🐱
![GitHub License](https://img.shields.io/github/license/ghall89/whiskerdb) ![GitHub top language](https://img.shields.io/github/languages/top/ghall89/WhiskerDB)

## About

WhiskerDB is a web-based, local-first, personal database application, built with NextJS and powered by Dexie.

## Getting Started

Follow these steps from the project directory.

1. Install dependencies `pnpm install`

2. Run `npx dexie-cloud create` to setup the sync server. You will be prompted for email verification, afterwards your database's URL will be printed to the terminal, and saved to a new file called `dexie-cloud.json`

3. You will have to whitelist your apps origin with `npx dexie-cloud whitelist http://localhost:3000`

4. Create an `.env.local` file, and add `DEXIE_CLOUD_URL=https://<your-db-id>.dexie.cloud` to it

5. Run `pnpm dev`

## Documentation

_Work in progress 🏗_

## Dexie Cloud

Learn more about Dexie Cloud [here](https://dexie.org/cloud/)
