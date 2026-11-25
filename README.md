# Craftora — Phase 0 Architecture & Phase 1 HTML

## Project scope
Craftora is an 18-page, frontend-only Pakistani handicrafts marketplace prototype. It uses HTML5, CSS3 and vanilla JavaScript only. Sample products, artisans, customer details, applications and orders are fictional demo data. There is no backend, authentication, payment processing, fulfilment, email delivery or business verification.

## 1. Final sitemap and six-member allocation
| Member | Page | Page name | File |
|---|---:|---|---|
| Member 1 | 1 | Homepage | `index.html` |
| Member 1 | 2 | Marketplace | `pages/marketplace.html` |
| Member 1 | 3 | Product Details | `pages/product-details.html` |
| Member 2 | 4 | Categories | `pages/categories.html` |
| Member 2 | 5 | Search Results | `pages/search-results.html` |
| Member 2 | 6 | Artisan Directory | `pages/artisan-directory.html` |
| Member 3 | 7 | Artisan Profile & Store | `pages/artisan-profile.html` |
| Member 3 | 8 | Shopping Cart | `pages/cart.html` |
| Member 3 | 9 | Wishlist | `pages/wishlist.html` |
| Member 4 | 10 | Checkout | `pages/checkout.html` |
| Member 4 | 11 | Order Confirmation | `pages/order-confirmation.html` |
| Member 4 | 12 | Customer Dashboard | `pages/customer-dashboard.html` |
| Member 5 | 13 | Order History | `pages/order-history.html` |
| Member 5 | 14 | Artisan Registration | `pages/artisan-registration.html` |
| Member 5 | 15 | Artisan Dashboard | `pages/artisan-dashboard.html` |
| Member 6 | 16 | Product Management | `pages/product-management.html` |
| Member 6 | 17 | About Craftora | `pages/about.html` |
| Member 6 | 18 | Help Centre & Contact | `pages/help-centre.html` |

Each member owns exactly three pages.

## 2. Folder structure
```text
craftora/
├── index.html
├── pages/                 # 17 additional standalone HTML pages
├── css/                   # Phase 2 outputs: tokens.css, global.css, components.css, pages.css
├── js/                    # Phase 3 outputs: data.js, storage.js, utils.js, components.js, app.js
├── images/
│   ├── products/
│   ├── artisans/
│   ├── categories/
│   ├── banners/
│   └── icons/
└── README.md
```
The CSS, JS and image directories are planned architecture locations. They are intentionally not populated in Phase 1.

## 3. Shared component architecture
- **Announcement bar:** project context and link to the brand story.
- **Header:** brand mark, responsive navigation toggle, global search entry, wishlist and cart counters.
- **Breadcrumbs:** consistent path context on all interior pages.
- **Product card:** product media, craft category, product link, artisan link, PKR price, demo rating, add-to-cart and wishlist controls.
- **Artisan card:** studio monogram, location, speciality, short profile and profile link.
- **Forms:** visible labels, native validation attributes, inline feedback regions and explicit demo notices.
- **Commerce panels:** consistent cart/checkout summary hooks for merchandise subtotal, discounts, delivery and total.
- **Feedback:** live status regions, empty states, error containers and confirmation panels.
- **Footer:** marketplace, account, artisan and support navigation.

## 4. JavaScript feature coverage plan
| Member | Data & Display | Forms & Input | State & Memory | Interaction | Logic & Calculation | Responsive & Accessible |
|---|---|---|---|---|---|---|
| Member 1 | Dynamic products and product detail | Newsletter and product quantity/variant | Cart and wishlist | Gallery and quick view | Quantity subtotal | Responsive product layouts and labelled controls |
| Member 2 | Categories, search and artisan directory | Search and filters | Search/filter preferences | Filters and sorting | Result counts and price ranges | Responsive browse layouts |
| Member 3 | Artisan, cart and wishlist data | Artisan inquiry | Cart and wishlist storage | Gallery and confirmations | Cart totals | Accessible cart and form controls |
| Member 4 | Orders and customer dashboard | Checkout form | Persistent demo orders/profile | Tabs and status messages | Delivery and discount totals | Responsive checkout and dashboard |
| Member 5 | Order and artisan metrics | Artisan registration | Application and artisan data | Dashboard tabs | Revenue and order calculations | Accessible forms and status feedback |
| Member 6 | Product and help content | Product and contact forms | Saved product listings | Accordions and dialogs | Inventory calculations | Responsive management and keyboard support |

## 5. Customer journey
Homepage → Marketplace or Categories → Search/filter/sort → Product Details → Wishlist and/or Cart → Checkout → Order Confirmation → Customer Dashboard / Order History.

## 6. Artisan journey
Homepage/Footer → Artisan Registration → Local demo application feedback → Artisan Dashboard → Product Management → Add/Edit/Delete sample listing → Product catalogue/profile preview.

## 7. Shared design tokens planned for Phase 2
- Primary forest green: `#24483F`
- Secondary muted teal: `#38665C`
- Accent burnt terracotta: `#BC6848`
- Premium muted gold: `#B99A5B`
- Warm ivory background: `#F7F4ED`
- White surface: `#FFFFFF`
- Alternative surface: `#EEE9DF`
- Primary text: `#252A27`
- Secondary text: `#72766F`
- Border: `#E2DED4`
- Fonts: DM Sans for interface; Playfair Display for editorial headings.

## 8. Phase 1 file manifest
All 18 standalone HTML files are present. Each includes a semantic page skeleton, shared header/footer markup, navigation, page-specific content, accessible labels/alt text, demo empty/error feedback hooks where relevant, and future references to the four planned CSS files and five planned JavaScript files. No CSS or JavaScript implementation is included in this phase.

### Phase 1 status
**Completed:** all 18 standalone HTML pages have been generated in the required order.

## 9. Phase 2 — Complete CSS
The Phase 1 HTML has now been styled with the four required CSS files, in the specified order:

1. `css/tokens.css` — official colour palette, typography, spacing, layout, elevation and motion tokens.
2. `css/global.css` — reset, semantic defaults, typography, responsive container, accessible focus behaviour, forms and reduced-motion support.
3. `css/components.css` — shared header/navigation, announcement strip, footer, buttons, breadcrumbs, product and artisan cards, forms, panels, statistics, tables, tabs, accordions, dialogs, toasts and empty states.
4. `css/pages.css` — page-specific composition for the homepage, marketplace, product details, categories, search, artisan pages, cart, wishlist, checkout, order confirmation, customer dashboard, order history, product management, About and Help Centre.

### Responsive and accessibility implementation
- Desktop, tablet and mobile breakpoints are included, with responsive grids and stacked layouts for narrow screens.
- Keyboard-visible focus styles are defined for links, buttons, form controls and other focusable elements.
- Form controls use consistent sizing, borders, focus feedback and accessible native input behaviour.
- Motion is reduced when the visitor has enabled `prefers-reduced-motion`.
- Product grids, navigation, footer columns, filters, dashboards, checkout panels and forms adapt to smaller viewports.

### Phase 2 validation
- All 18 HTML pages remain present.
- All four expected CSS files exist.
- All local stylesheet references resolve to existing files.
- CSS syntax was inspected with a CSS parser; no parser errors were found.
- The validation was a source-level check. A live cross-device browser audit has not yet been performed.

### Phase 2 status
**Completed:** all four shared CSS files have been generated and connected to the 18 HTML pages.


## 10. Phase 3 — Complete JavaScript

The five planned JavaScript modules have been implemented in dependency order:

1. `js/data.js` — six fictional sample artisan profiles, six base products, nine categories and FAQ reference content.
2. `js/storage.js` — defensive localStorage reads/writes and centralized helpers for cart, wishlist, orders, customer profile, artisan applications, artisan demo profile, managed products and discount state.
3. `js/utils.js` — PKR formatting, centralized delivery/discount/total calculations, email and Pakistan mobile validation, URL helpers, HTML escaping and data lookup.
4. `js/components.js` — shared mobile navigation, counters, quick-view dialog, add-to-cart and wishlist actions, image fallbacks, tabs, accordions and toast notifications.
5. `js/app.js` — page-specific controllers for homepage, marketplace, product details, categories, search results, artisan directory/profile, cart, wishlist, checkout, order confirmation, customer dashboard, order history, artisan registration/dashboard and product management. The About page uses the shared components only; the Help Centre controller handles FAQ search and the contact demo form.

### Implemented workflows
- Product cards and artisan/category content render from JavaScript data.
- Marketplace supports search, category, price, rating, artisan, region and sort filters.
- Search results support query matching, category, price and sort controls.
- Product details support URL-based product selection, image gallery, variants, quantity validation, specifications, related products and wishlist/cart actions.
- Cart and wishlist state persist in localStorage and update their header counts.
- Cart supports variant-aware line items, quantity edits, removals, line totals and the `CRAFT10` demo discount. Checkout also updates local demo inventory after a successful order.
- Checkout validates contact/delivery data and stock, applies the selected delivery type, and creates a local demo order.
- Order confirmation, customer dashboard and order history read the saved order records.
- Artisan registration saves a simulated application; the artisan dashboard computes inventory and revenue from local demo data.
- Product management supports add, edit, delete, stock filtering, item counts, inventory units and inventory value.
- FAQ accordion/search, artisan inquiry, newsletter, customer profile and contact form feedback are implemented without claiming real email or backend services.

### Pricing calculation rules
- Standard delivery: Rs. 250; free when merchandise subtotal is Rs. 10,000 or more.
- Express delivery: Rs. 450.
- `CRAFT10`: 10% off eligible merchandise, capped at Rs. 1,500.
- Grand total: merchandise subtotal − discount + delivery charge.
- Cart and checkout call the same centralized calculation helper.

### Phase 3 validation
- `node --check` passed for all five JavaScript files.
- All 18 HTML files were parsed successfully; their local internal links and referenced script/style targets were checked for existence.
- All pages load the five JavaScript files in the required dependency order.
- CSS files passed a source-level CSS parser check.
- Node-based tests passed for catalogue data, safe storage recovery, variant-specific cart updates/removals, email/mobile validation and standard/free/express delivery plus discount-cap calculations.
- A headless live-browser run was attempted over both local HTTP and `file://`, but the browser environment returned `ERR_BLOCKED_BY_ADMINISTRATOR` before page load. Therefore interactive browser workflows and cross-device rendering are **not certified as live-browser tested**. See `AUDIT_REPORT.md` for the final detailed report.

### Prototype limitations
Craftora remains frontend-only. It does not provide real authentication, verified artisan accounts, payment gateway processing, fulfilment, email delivery, refunds or live customer support. Do not enter real payment details. All sample artisans and studio details are fictional.

### Current project status
**Phase 0 — Architecture: complete**  
**Phase 1 — HTML: complete (18 pages)**  
**Phase 2 — CSS: complete (4 files)**  
**Phase 3 — JavaScript: complete (5 files)**  
**Phase 4 — Final quality audit: complete (static source and logic validation; browser verification blocked).

