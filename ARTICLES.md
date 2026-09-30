# Publishing an article

Follow this checklist whenever Kodiak says "publish this article". There is no
build step: every article is a plain HTML file, and pushing to `main` deploys it.

## Before you start

- Pick a **slug**: short, lowercase, hyphenated, keyword-led (e.g. `vagus-nerve-toning`).
  The article lives at `https://www.kodiakrichards.com/articles/<slug>/`.
- Use today's date in `YYYY-MM-DD` form for machine-readable fields, and
  `Mon D, YYYY` (e.g. `Oct 3, 2026`) for dates readers see.
- Reading time = word count ÷ 230, rounded up.

## Checklist

1. **Create the page.** Copy `articles/_template/` to `articles/<slug>/` and fill in
   every `{{PLACEHOLDER}}` (search the file for `{{`; none may remain). That includes:
   - `<title>`, meta description, canonical, Open Graph and Twitter tags.
   - The `BlogPosting` and `BreadcrumbList` JSON-LD blocks, with both dates.
   - The FAQ: its `FAQPage` JSON-LD must match the on-page questions and answers
     **word for word**. No FAQ? Delete both the FAQ section and the `FAQPage` script.
   - "The short answer" box: 2–4 sentences that directly answer the main question.
   - H2s phrased as the questions people actually search.
   - **Delete the `<meta name="robots" content="noindex">` line and the template
     comment above it.** If it stays, search engines will ignore the article.
     The IndexNow action warns if it finds one.
2. **Add a card to the top of `articles/index.html`** (newest first), using the card
   format in the comment inside `<ul class="article-list">`. The "coming soon"
   empty state hides itself once a card exists.
3. **Update `sitemap.xml`.** Add
   `<url><loc>https://www.kodiakrichards.com/articles/<slug>/</loc><lastmod>YYYY-MM-DD</lastmod></url>`
   (keep one `<url>` per line) and bump the `/articles/` entry's `lastmod` to today.
4. **Cross-link.** When relevant, add the new article to the "Related articles"
   list of 1–2 existing articles (and theirs to this one). The Related section
   hides itself when its list is empty. Bump `dateModified` on any article you edit.
5. **Length limits.** Meta descriptions 120–160 characters. Titles under ~60 characters.
6. **Credentials.** Kodiak is a therapist-in-training and integrative coach. Never call
   Kodiak a licensed therapist. Keep the byline, author box, and disclaimer as they are
   in the template.
7. **Ship it.** Commit and push to `main`. Vercel deploys automatically, and the
   IndexNow GitHub Action (`.github/workflows/indexnow.yml`) notifies Bing and other
   engines about the new and changed URLs about 90 seconds later.

## Editing a published article

Update the content, set `dateModified` in the JSON-LD, `article:modified_time`, and
the "Updated" date in the byline to today, bump its `lastmod` in `sitemap.xml`, and
push to `main`.

## Reference

- Template: `articles/_template/index.html` (noindex, not in the sitemap).
- Styles: the "ARTICLES" sections at the end of `styles.css`.
- IndexNow key file: the 32-character `<key>.txt` at the repo root. Don't rename or delete it.
