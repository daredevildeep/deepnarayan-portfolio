# Deployment Guide

The site is a static build (`dist/`). Below: GitHub first, then Netlify.

---

## 1 — Push to GitHub

Git is already initialized and committed locally. Create an empty repo on
GitHub named `deepnarayan-portfolio` (do **not** add a README/license there),
then run these from the project folder. Replace `YOUR_USERNAME`:

```bash
git remote add origin https://github.com/YOUR_USERNAME/deepnarayan-portfolio.git
git branch -M main
git push -u origin main
```

> Tip: in this Claude Code session you can run an interactive login by typing
> `! gh auth login` (the `!` prefix runs it in your terminal), then
> `! gh repo create deepnarayan-portfolio --public --source=. --push`.

After pushing, update the GitHub URL in `src/lib/content.js` (`PERSONAL.github`)
if your username differs, then commit and push again.

---

## 2 — Deploy on Netlify (free, no credit card)

1. Go to <https://netlify.com> → **Sign up with GitHub**.
2. **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build settings (auto-detected from `netlify.toml`, but confirm):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Deploy site.** You'll get a URL like `random-name.netlify.app`.
5. **Site settings → Change site name** → `deepnarayan-gaming` →
   final URL: `https://deepnarayan-gaming.netlify.app`.

Every future `git push` to `main` auto-redeploys.

### Alternative: drag-and-drop (no Git)

Run `npm run build`, then drag the `dist/` folder onto
<https://app.netlify.com/drop>.

---

## 3 — Verify the live site

- Open in **incognito**.
- All sections load; smooth scroll works; the 3D hero renders.
- Test at 375px, 768px, 1280px widths — no horizontal overflow.
- Resume button downloads the PDF.

---

## 4 — Before you share it (recommended polish)

- [ ] Replace `public/og-image.svg` with a 1200×630 **PNG** (some social
      platforms don't render SVG previews). Update the two `og:image` /
      `twitter:image` paths in `index.html` to `.png`.
- [ ] Replace `public/resume-deep-narayan-yadav.pdf` with your real exported
      résumé (keep the filename).
- [ ] Confirm `PERSONAL.linkedin` / `PERSONAL.github` in `src/lib/content.js`
      point to your real profiles.
- [ ] Drop real capture clips into `public/` and set `src` on the entries in
      `SAMPLES` (`src/lib/content.js`) to enable the lightbox player.

### For your resume / applications

```
Portfolio: https://deepnarayan-gaming.netlify.app
Source:    https://github.com/YOUR_USERNAME/deepnarayan-portfolio
```
