# Your ACA Plans (youracaplans.com)

Vite + React landing site with a Node.js (Express) server that saves form leads to MySQL and serves a password protected leads portal.

## Run locally

    npm install
    npm run build
    npm run dev:api      # no MySQL needed: uses an in memory store, admin / admin123, http://localhost:3000
    # or, while editing the site: run "npm run dev:api" in one terminal and "npm run dev" in another

## Deploy on Hostinger (Websites > Create website > Web App)

1. Connect this GitHub repository (or upload the files).
2. Build command: `npm run build`  Start command: `npm start`  Entry file: `server.js`  Node 18 or newer.
3. In hPanel > Databases create a MySQL database and user. Put the details in the app's environment variables (see `.env.example`).
   The `leads` table is created automatically the first time the app starts.
4. Set `ADMIN_USER`, `ADMIN_PASSWORD` and `SESSION_SECRET`, then redeploy.
5. Open `https://<your domain>/admin` to sign in.

Because Node serves every page, reloading /contact-form (or any other route) works without extra rewrite rules.

## Leads portal (/admin)

Login, search (name, phone, email, zip, IP, token), date filters, page size and pagination, click a row for all captured fields (LeadiD token, TrustedForm certificate, IPs, consent text), CSV export of the current search, and delete.

## Static hosting alternative

If you ever host only the built `dist/` folder as a PHP/HTML website, `public/.htaccess` is copied into `dist/` and rewrites every route to `index.html`. Form posting needs the Node server though, so set `VITE_FORM_ENDPOINT` to the URL of a running instance before building.

## Notes

- Form fields have matching ids and names. Hidden fields: `user_ip`, `leadid_token`, `xxTrustedFormCertUrl`; a hidden `website` honeypot field is used to drop bot submissions.
- The API is rate limited (20 posts per minute per IP, 10 login attempts per 15 minutes).
