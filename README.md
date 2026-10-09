# Your ACA Plans (Youracaplans.com)

Vite + React landing site.

    npm install
    npm run dev      # local dev
    npm run build    # production build in dist/

- Site details (phone, email, address, legal name, state) live in `src/data/site.js`.
- Set `VITE_FORM_ENDPOINT` (see `.env.example`) to POST quote form submissions as JSON. Without it, the form just shows the thank you message.
- Replace `public/images/hero.svg` and `public/images/agent.svg` with real photos (update the paths in `src/pages/Home.jsx`).
- Quote form fields have matching `id`, `name` and class attributes: `firstName`, `lastName`, `age`, `zip`, `phone`, `email`.
- Host with an SPA fallback so `/quote`, `/terms`, `/privacy-policy` and `/partners` resolve to `index.html`.
