# Jurivo SEO and indexing handoff

## Canonical production origin

The canonical origin is `https://www.jurivo.co.za` because the apex domain permanently redirects there. Keep the following on the same host:

- Canonical tags
- XML sitemap URLs
- `robots.txt` host and sitemap directives
- JSON-LD entity URLs
- Open Graph URLs
- Search Console URL-prefix property, if a Domain property is not used

Set this production environment value before deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://www.jurivo.co.za
```

The application also normalises the old apex value to `www` to prevent conflicting canonical signals during migration.

## Google Search Console submission

1. Deploy the production build and confirm `https://www.jurivo.co.za/` returns HTTP 200.
2. Verify the Search Console property using DNS, or set `GOOGLE_SITE_VERIFICATION` to the HTML verification token and redeploy.
3. Submit `https://www.jurivo.co.za/sitemap.xml` in Search Console.
4. Inspect and request indexing for:
   - `https://www.jurivo.co.za/`
   - `https://www.jurivo.co.za/services/law-firm-seo-south-africa`
   - `https://www.jurivo.co.za/strategy-call`
5. Use the live URL test before requesting indexing. The selected canonical should match the inspected `www` URL.
6. Validate the deployed pages in Google’s Rich Results Test and the Schema.org validator.

Do not submit internal concepts, confirmation pages or admin routes. They intentionally emit `noindex` and are excluded from the sitemap.

## Bing and AI-search submission

1. Add the site to Bing Webmaster Tools and submit the same XML sitemap.
2. Optionally set `BING_SITE_VERIFICATION` to the Bing HTML verification token and redeploy.
3. Confirm `https://www.jurivo.co.za/llms.txt` remains publicly accessible.
4. Monitor Bing Webmaster Tools’ AI Performance report after the site has been indexed.

`llms.txt` is an emerging, non-standard discovery aid. It does not replace normal crawlability, structured data, useful content or search-engine indexing.

## Local authority work still requiring business input

The code does not invent details that have not been verified. Add these once the business owner confirms them:

- Public business email and telephone number
- A real operating or mailing address, if it is appropriate to publish
- Verified social and business-profile URLs for `sameAs` schema
- Google Business Profile details that match the website exactly
- Named team or author information and genuine credentials
- Original case studies, client evidence and measurable outcomes

Consistent, verifiable business information and original evidence are more valuable for South African local and AI visibility than adding unsupported keywords or location claims.
