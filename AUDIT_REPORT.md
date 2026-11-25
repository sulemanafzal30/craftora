# Craftora — Phase 4 Final Quality Audit

**Audit date:** 24 November 2026  
**Project:** 18-page Pakistani handicrafts marketplace prototype  
**Scope:** HTML, CSS, vanilla JavaScript, localStorage logic, navigation paths, forms, calculation rules and source-level accessibility checks.

## Overall result

**Phase 4 source audit completed.** The project contains the expected 18 HTML pages, four CSS files and five JavaScript files. All automated source checks listed below passed after the corrections in this audit.

A live-browser test could not be completed: Chromium returned `ERR_BLOCKED_BY_ADMINISTRATOR` before loading either the local HTTP or `file://` version of the site. Consequently, actual click-through workflows, rendered breakpoints, visual appearance and remote image delivery are not certified as browser-tested.

## 1. Project integrity

| Check | Result |
|---|---:|
| HTML pages | 18 / 18 |
| CSS files | 4 / 4 |
| JavaScript files | 5 / 5 |
| Page-specific controller markers | 18 / 18 matched |
| Shared header and footer | Present on all pages |
| CSS and JS references | All local references resolve |
| Script dependency order | Correct on all pages |
| Broken internal file links | 0 found |
| Broken in-page anchor targets | 0 found |
| Duplicate IDs within a page | 0 found |
| HTML parser errors | 0 found |

## 2. HTML and accessibility source checks

| Check | Result |
|---|---:|
| Descriptive page titles | 18 / 18 |
| Viewport meta tags | 18 / 18 |
| Images with an `alt` attribute | All checked images |
| Form controls with an associated label or accessible name | All checked controls |
| Buttons with an explicit `type` | All buttons |
| Placeholder `#` links | 0 found |
| Semantic header, main and footer landmarks | Present across pages |

These are source-level checks. They do not replace screen-reader, keyboard-only, contrast-ratio or assistive-technology testing.

## 3. CSS checks

- All four CSS files parsed without syntax errors using a CSS parser.
- All referenced CSS custom properties have declarations; no undefined `var(--...)` tokens were found.
- Eight responsive media-query blocks were found.
- A `prefers-reduced-motion` rule is present.
- The files include the shared design tokens, global layout, reusable components and page-specific layouts.

Responsive CSS is present, but actual desktop, tablet and mobile rendering could not be inspected in a browser in this environment.

## 4. JavaScript checks

- `node --check` passed for all five JavaScript files.
- All 18 page markers have a corresponding page controller entry or intentional static-page controller.
- The five modules are loaded in dependency order on every page.
- Local state helpers guard against malformed JSON and wrong-shaped values in array-backed stores.

### Logic tests

**13 of 13 Node-based logic tests passed.** Coverage included:

1. Six sample products, six fictional artisans and all nine craft categories.
2. PKR formatting for normal, negative and invalid values.
3. Rs. 250 standard delivery below the Rs. 10,000 free-delivery threshold.
4. Free standard delivery at and above Rs. 10,000.
5. The `CRAFT10` 10% discount calculation.
6. The Rs. 1,500 maximum discount.
7. Rs. 450 express delivery.
8. Editing and removing an individual variant line from the cart.
9. Recovery from valid JSON with the wrong data shape.
10. Recovery from syntactically corrupted localStorage JSON.
11. Fallback to the sample catalogue when the managed-product store has the wrong shape.
12. Inventory decrement after a successful demo purchase, without negative stock.
13. Email and Pakistan mobile-number validation.

The tests exercise shared data, storage and calculation helpers. They do not simulate browser form submission or DOM event sequences.

## 5. Corrections made during the audit

- Added the missing **Cultural Accessories** category, bringing the category catalogue to the required nine.
- Added leather and home-décor options to the artisan directory speciality filter.
- Added the missing category-ID mappings for jewellery, cultural accessories and handmade gifts.
- Corrected empty-vs-zero price-filter parsing so a maximum price of zero is not treated as “no maximum”.
- Made cart quantity edits and removals variant-aware; separate variants of the same product now have distinct cart-row identifiers and display their selected option.
- Hardened localStorage array getters against valid JSON values with the wrong shape.
- Added shared inventory-decrement logic and apply it after a demo order is saved, so repeated demo purchases respect remaining stock.
- Added an explicit button type to the product-management dialog close control.
- Changed newsletter and inquiry feedback text so it does not claim that data was persisted when it was not.

## 6. Image and external asset limitations

The catalogue uses direct Unsplash image URLs, with image-failure fallbacks in the interface. No local artisan or product photographs are bundled. The 19 distinct remote image URLs were not fetched or visually verified during this audit because browser navigation was blocked. The `images/` subfolders are included for future approved local assets.

## 7. Browser-test limitation

A headless Chromium test was attempted using both:

- `http://127.0.0.1` local HTTP hosting; and
- local `file://` page loading.

Both attempts were blocked by the environment with `ERR_BLOCKED_BY_ADMINISTRATOR` before the first page loaded. Therefore the following remain unverified in a live browser:

- Actual interactive navigation and all click workflows.
- Cart-to-checkout-to-confirmation flow through the DOM.
- Form validation behaviour in the browser.
- Dialog focus and keyboard behaviour.
- Visual consistency and overflow at desktop, tablet and mobile widths.
- Successful delivery of remote photos and fonts.

## 8. Prototype limitations

Craftora is a frontend-only educational prototype. It does not provide real authentication, payment processing, verified artisan accounts, order fulfilment, email delivery, refunds or live customer support. All sample artisans, studio information, orders and prices are demonstration data. No real payment-card information should be entered.

## Final status

- **Phase 0 — Architecture:** complete.
- **Phase 1 — HTML:** complete, 18 pages.
- **Phase 2 — CSS:** complete, 4 files.
- **Phase 3 — JavaScript:** complete, 5 files.
- **Phase 4 — Quality audit:** source and logic audit complete; live-browser verification blocked by the environment.

The project is packaged with this report and the corrected source files.
