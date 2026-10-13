# 🎨 Game Vault — Figma Page Map & Design Todos

> **Document:** `Figma-Todos.md`
> **Purpose:** Define the public pages, the five primary navigation items of the web app, the pages and sections inside each, the global UI requirements (palette, buttons, shared components, modals), and every frame and state that must be designed in Figma. Use it as the checklist for the design phase.
> **Source of decisions:** [Game-Vault-Consolidated-Decisions.md](./Game-Vault-Consolidated-Decisions.md) (2026-10-13), updated with later navigation decisions.

**Related docs:** [PRD](./Game-Vault-PRD.md) · [Features](./project-features.md) · [Architecture](./project-architecture.md)

> 📌 If any document disagrees with this file or the PRD, these two win.

---

## 📑 Table of Contents

1. [Navigation architecture](#-1-navigation-architecture)
2. [Dashboard](#-2-dashboard)
3. [Games](#-3-games)
4. [Collections](#-4-collections)
5. [Community](#-5-community)
6. [Profile, Messages, and Notifications](#-6-profile-messages-and-notifications)
7. [Public pages, authentication, and settings](#-7-public-pages-authentication-and-settings)
8. [Global UI requirements](#-8-global-ui-requirements)
9. [Required Figma frames and states](#-9-required-figma-frames-and-states)
10. [Figma file structure and design order](#-10-figma-file-structure-and-design-order)
11. [Acceptance checklist](#-11-acceptance-checklist)

---

## 🧭 1. Navigation architecture

### Public website

Four public pages: **Home · Features · About · Terms** (`/` · `/features` · `/about` · `/terms`). They share one `PublicLayout`.

### Web app (after login)

Design **exactly five** primary navigation items:

| # | Destination | Route | Access |
|---|---|---|---|
| 1 | **Dashboard** | `/dashboard` | Signed in |
| 2 | **Games** (internal tabs: **Explore** · **Library**) | `/games` | Public (Library: signed in) |
| 3 | **Community** | `/community` | Public view; signed-in actions |
| 4 | **Collections** | `/collections` | Signed in (public collections viewable by others) |
| 5 | **Profile** | `/users/:username` (your own) | Public, subject to visibility |

Use the same five primary destinations in the mobile bottom navigation.

> 📚 **Explore and Library are tabs inside Games**, not separate primary items. The **Wishlist** is not a page or primary item: it is a **button on the Games page that opens a modal** (see [§3.4](#34-wishlist-modal)).

Messages (`/messages`), Notifications (`/notifications`), and Settings (`/settings`) are secondary destinations reached through the header icons and the avatar menu.

### Global navigation rules

- 🏠 **Public Home** (`/`) is a platform landing page. It is not personalized and looks the same for guests and signed-in users.
- 📊 **Dashboard** (`/dashboard`) is the signed-in user's personal overview and is distinct from Home. After a login or registration is processed, the user enters the app at `/dashboard` (or the protected destination they originally requested).
- 🖥️ Desktop uses a side navigation (or another consistent primary pattern).
- 📱 Mobile uses a fixed five-item bottom navigation.
- ↩️ Secondary pages need clear back navigation and must not appear as additional primary items.
- 🚪 Guests who reach protected features see a **sign-in prompt** and are returned to their intended destination afterward.
- 🔓 The Library tab and the Wishlist modal require sign-in; guests see a sign-in prompt.

### Header and utility navigation (signed in)

- **Desktop / tablet header:** notification bell with an unread indicator (opens the Notifications page), message icon (→ `/messages`), theme toggle, and an avatar menu (Settings, Theme, Log out).
- **Mobile top bar:** logo or page title, notification bell with unread dot, message icon, avatar menu access.
- **Mobile bottom bar:** fixed, uses the `surface` token, respects the device safe area; icon + short label per item; the active item uses the `accent` color plus a small indicator.
- **Detail pages** (Game Details, Collection Details, another user's profile, a conversation) show a back arrow in the top bar. The bottom bar stays visible, except inside an open conversation, where it may be hidden to make room for the composer.
- **Active destination** on desktop: `accent` indicator (pill or underline).
- Player discovery is the **username search in Community**; game search is the title search in Explore. There is no global header search unless that decision changes.

### Guest navigation

- **Header:** logo, Home, Features, About, Games, Community, theme toggle, Login / Register (Terms is linked from the footer). On mobile: a slim top bar with a menu button.
- Guests can browse the public pages, Explore, Game Details, Community (view only), and public profiles/collections. Dashboard, Library, Wishlist, Collection management, Messages, and Notifications require sign-in; protected actions open a **login-required prompt**.

---

## 📊 2. Dashboard

**Route:** `/dashboard`

**Purpose:** The signed-in user's personal overview and the landing page after login/register. It never duplicates the full Community feed, Library, or Wishlist.

### Main sections

- 👋 Welcome/dashboard header.
- 🎬 Featured game or cinematic game banner where appropriate.
- 📈 A small set of high-level metrics — avoid overcrowding the metric row.
- ▶️ **Currently Playing** — games being played (tracked through active sessions), with a "Continue Playing" action.
- 🔖 **Saved** — games already in the library that the user has not started yet.
- 💝 **Wishlist preview** — games the user wants to acquire. The **See All** action beside the heading is a link-style/ghost action (not a second prominent button) and opens the Wishlist modal.
- 🏆 **Recent achievements.**
- 👥 Followed users' recent activity, where supported (compact preview only).
- 🎯 Optional larger featured game-progress panel.

### Design rules

- Keep **Saved** (already in the library) distinct from **Wishlist** (not yet owned/added). Do not duplicate the same concept under both.
- Prioritize useful information over decorative statistics; use compact cards and clear hierarchy.
- Link each preview to its full destination: Playing / Saved → Library tab (filtered by status), Wishlist → Wishlist modal, Achievements → Game Details, activity → Community.
- Each game section shows a short slice (e.g. 4–6 cards) with a "See All" link.
- **Progress overlay:** posters may show at most four or five metrics. Candidates: progress percentage, total playtime, achievements unlocked/total, game status, last played. Display only metrics that can be calculated reliably from stored data.
- Each section loads and fails independently — one failed section must not break the page.
- Design a **first-time (empty) Dashboard** with onboarding actions: Explore Games, Add your first game, Follow people.

---

## 🎮 3. Games

**Base route:** `/games`

**Purpose:** One primary destination for the catalogue and the user's library. The page has **two tabs — Explore first, then Library** — and a **Wishlist button** that opens a modal.

> 🎮 The catalogue is curated by the project owner, so there is **no "add a game" action or form for users** anywhere in the design. Game artwork comes from the project's own static assets (WebP/AVIF), so design the image-fallback state for a missing file.

### 3.1 Explore tab — `/games`

The public game catalogue.

**Game card (compact):** title · release year + genre (may share a metadata row) · rating (with a consistent, clearly identified source) · **one fixed estimated-playtime value in hours** (a single integer such as `50 hours`, never a range; descriptive metadata only, not an achievement rule).

**Search and filters — confirmed scope** (do **not** add a generic "More Filters" section):

| # | Control | Pattern |
|---|---|---|
| 1 | **Game title** | Search input, debounced, with a clear-search action |
| 2 | **Genre** | Selectable chips/buttons grouped together; multi-select recommended; clear active state |
| 3 | **Release year** | Year range in a small popover with **Apply** and **Reset** |
| 4 | **Developer** | Dropdown (searchable if the list is long); single vs multi-select to finalize |
| 5 | **Platform** | Dropdown, multi-select recommended; selected values shown clearly |
| 6 | **Rating** | Min/max range in a small popover (numeric inputs + slider), Apply / Reset |
| 7 | **Estimated playtime** | Min/max hour range in a small popover (numeric inputs + slider), Apply / Reset; same field shown on cards |

**Sorting** (visually separate from filters): **Name** (A→Z / Z→A) · **Rating** (lowest→highest / highest→lowest) · **Estimated playtime** (shortest→longest / longest→shortest). Playtime sorting uses estimated game playtime, not the user's tracked hours. Do not expose relevance, popularity, or release-date sorting.

**Behavior and states:**

- Show the total results count and **active filter chips** (individually removable) plus a **clear-all** action.
- Search, filters, and sorting work together; any change resets the loaded-results position.
- Trending, popular, and recommended sections may appear where relevant (especially public Home); they are not filter dimensions.
- Responsive game-cover grid with **infinite scroll**: loading-more and end-of-results states.
- Loading, empty-results (with a clear-filters action), and error states.
- Mobile: filters open in a drawer or modal.
- Only expose filters backed by the project's own API/data.

### 3.2 Library tab — `/games?tab=library`

The signed-in user's personal library, the second tab. Guests see a sign-in prompt.

- Library header and game count; search within the library; sort/filter controls when useful.
- Games are shown by status: **Playing · Saved · Completed**.
  - **Playing** — games currently being played.
  - **Saved** — games already in the library that haven't been started (distinct from Wishlist).
  - **Completed** — finished games.
- Game cards or compact list view; status and tracked playtime/progress where supported. Users do **not** type played hours — tracked sessions are the source.
- Actions: change library status, open Game Details, remove from library.
- Empty state with a CTA to Explore; loading, filtered-empty, and error states.
- This is the "See All" destination behind the Dashboard's Playing and Saved sections.

### 3.3 Game Details — `/games/:gameId`

- 🖼️ Cover artwork and/or hero backdrop.
- 📝 Title and metadata: release date, genres, platforms, developer, publisher where available.
- 📄 Description (expandable when long).
- 📸 Screenshots/media gallery with a lightbox; trailer only when available.
- ⭐ Rating and rating distribution, if supported.
- ➕ Actions: Add to Library, change library status, Add to Wishlist, Favorite *(optional)*, Add to Collection, Rate/Review, and **Start Game / Exit Game** (see below).
- 💬 Reviews list with helpful and report actions.
- 🏆 **Achievements section** (no separate top-level Achievements page).
- 🎯 Related or similar games where supported.

**Achievements section — design three categories:**

1. **Playtime Achievements** — per-game time milestones (1, 5, 10, 25, 50, 100 hours).
2. **Completion Achievements** — game-specific goals (e.g. finish the main story); never unlocked by playtime alone.
3. **Optional Milestones** — e.g. 100% completion; only where trackable or confirmable.

**Session behavior to design:** **Start Game** begins a session → the action becomes **Exit Game** while the timer runs → achievements may unlock mid-session and show an **immediate toast** (Sonner or equivalent) → Exit Game ends the session and saves it.

**Design these views:** guest · signed-in user who has not added the game · signed-in user who has added it · active session · no reviews yet · loading / partial metadata / image fallback.

### 3.4 Wishlist modal

**Purpose:** Games the user wants to acquire or add to their library in the future. Distinct from **Saved**.

- A **Wishlist button** sits in the Games page header and is available on both tabs (optionally with an item-count badge). The Dashboard's Wishlist "See All" opens the same modal.
- The modal lists wishlisted games with the item count.
- Each item: open Game Details, remove from Wishlist (a direct, reversible action — no confirmation unless necessary), and move into the Library (choosing a status).
- Empty state with a CTA that closes the modal and leads to Explore; loading and error states.
- Mobile: full-screen or bottom sheet. Guests who press the button see the login-required prompt.
- Search/sort only if the final list size and behavior need it.

---

## 🗂️ 4. Collections

**Routes:** `/collections` (My Collections) · `/collections/:collectionId` (Collection Details)

**Purpose:** Let users curate groups of games around a theme, mood, franchise, or preference.

### 4.1 My Collections

- Collection cards: cover, name, visibility, game count.
- Create Collection action; edit, delete, change visibility when permitted.
- Empty, loading, and error states.

### 4.2 Collection Details

- Cover, title, description, owner (linked to the owner's profile), Public/Private label.
- Game grid; owner actions to edit, delete, add, and remove games.
- Public collections may be viewed by others; private collections only by their owner.
- States: empty collection · private · public · not found / no access.

**Create / edit fields:** name · description · optional cover image · visibility · games to include. Design create, edit, delete-confirmation, empty, loading, and error states.

### Collections vs. Library

| | 📚 Library | 🗂️ Collections |
|---|---|---|
| **What it is** | Games saved by the user, with their play status (Playing, Saved, Completed) | User-defined groups of games |
| **Main concern** | Status management | Curation and organization |

> ⚠️ Do not duplicate Library status management inside the Collections interface unless a specific action requires it.

---

## 💬 5. Community

**Route:** `/community`

**Purpose:** An **open-world activity and discovery feed** — not a private-only feed. Users browse community activity and discover players by username.

### 5.1 Main elements

1. **Username search bar** — searches usernames/players, not game titles; debounced; results lead to user profiles.
2. **Feed filters:**
   - **All** — default; all supported activity, including reviews and achievement-unlock announcements.
   - **Following** — supported activity from followed users (signed in).
   - **Reviews** — review-posting activity only.
   - **Achievement Unlocks** — achievement-unlock announcements only.
3. **Activity cards:**
   - Review activity links to the review and game.
   - Achievement-unlock activity identifies the user, achievement, and game, linking to Game Details/achievement context.
   - Game start / exit / completion activity only if the final feed design supports it.
   - Clear timestamps and profile links.
   - No embedded chat interface in the feed.

### 5.2 Filter behavior

- Make the active filter visually clear; switching filters resets the feed loading position.
- Username search discovers users; filters change feed activity — keep them visually distinct.
- ❓ **Confirm before implementation:** the recommended model treats audience (All/Following) and activity type (All/Reviews/Achievement Unlocks) as separate dimensions, which would allow "reviews from followed users". If the four filters are instead mutually exclusive tabs, document that before coding.

### 5.3 Access and states

- Community is publicly viewable; Following and follow actions require sign-in. Respect profile privacy; never expose private library activity unless its owner made it public.
- **Infinite scroll** with loading-more, end-of-feed, and retry states.
- Design: default All, Following, Reviews-only, Achievement-only, username search (typing / loading / results / no results), empty feed, error/retry, and guest states for protected actions.

---

## 👤 6. Profile, Messages, and Notifications

### 6.1 Profile — `/users/:username`

The **Profile** nav item opens the current user's own profile; other users' profiles use the same layout.

- **Header:** avatar, optional cover/banner, display name and username, bio, Follow/Unfollow (direct toggle), follower/following counts, high-level gaming stats where supported.
- **Tabs:** Overview (recent activity, selected games) · Library (only games shown publicly) · Reviews · Collections (public) · Activity (public history).
- Owner-only: Edit Profile (modal) and a settings entry point. Owner-only actions appear only on the own profile.
- Followers/Following open as a list (modal or panel).
- States: own profile · other user · empty · private/restricted · not found.

### 6.2 Messages — `/messages`

Direct player-to-player chat — not a Discord-style server or group chat. Reached from the header message icon.

- **Desktop:** conversation list on the left, selected conversation on the right, composer at the bottom.
- **Mobile:** list screen → conversation with a back arrow.
- Avatar/name, message history, timestamps, sending/connection state, text input, Send action, latest-message preview, unread indicator.
- States: no conversation selected · empty conversation · sending / sent / failed · connected / reconnecting / offline.
- Show online/offline presence on avatars where it appears. Do not promise delivery while disconnected.

### 6.3 Notifications — `/notifications`

Reached from the header bell.

- Notification list with an unread indicator (also shown on the header bell).
- Mark one / mark all as read.
- Click-through to the related profile, message, or content.
- Candidate types: new followers, new messages, other implemented social events.
- States: unread · all read · empty · loading · error.

---

## 🔐 7. Public pages, authentication, and settings

### 7.1 Public Home — `/`

- Platform landing page: product introduction, cinematic Hero (featured artwork, headline, short description, primary **Sign Up** CTA, secondary CTA to browse Games).
- Featured games or highlights (Trending, Top Rated, Browse by Genre), main benefits, community preview, final CTA, footer.
- Not personalized; the same for guests and signed-in users.

### 7.2 Public sibling pages

These pages share the Home header, footer, tokens, and `PublicLayout`, and are visible to everyone.

| Page | Route | Contents |
|---|---|---|
| ✨ Features | `/features` | What Game Vault offers; previews; CTA to Register |
| ℹ️ About | `/about` | Project purpose and story; CTA |
| 📄 Terms | `/terms` | Static text |

### 7.3 Authentication pages

Full-screen pages outside the app shell, visually consistent with the app.

| Page | Route | Contents |
|---|---|---|
| 🔑 Login | `/login` | Email or username (per backend contract), password with show/hide, Forgot Password link, validation/error states, link to Register |
| 📝 Register | `/register` | Username, email, password (+ confirmation if required), validation/submission/success states, link to Login |
| 📧 Forgot Password | `/forgot-password` | Email field, submission confirmation |
| 🔄 Reset Password | `/reset-password/:token` | New password + confirmation, invalid/expired link, success |

> 🌐 OAuth buttons can be reserved in the design but are not required for the first release.
> 🔁 After a login or registration is processed, the user enters the app at `/dashboard` unless a protected destination needs to be restored.

### 7.4 Settings — `/settings`

Reached from the avatar menu. Three sections only:

- 👤 **Profile & Account** (including password/security).
- 🛡️ **Privacy** (profile and library visibility).
- 🌗 **Appearance / theme** — dark default, switch to light; preference persisted in local storage.

> Avoid a large preferences center unless a real need emerges. A quick theme toggle also lives in the header and avatar menu.

---

## 🖌️ 8. Global UI requirements

### 8.1 Visual direction

- 🎬 **Cinematic Gaming** aesthetic.
- 🌙 Dark theme as the default: near-black / deep-navy surfaces, white text.
- ☀️ Light theme: white backgrounds, black/dark text, the same red accent.
- 🔴 Red accent `#E53945`, used deliberately for primary actions, active states, and small highlights — not across the whole interface.
- 🖼️ Strong game artwork and cover imagery.
- 📐 Clean spacing, consistent typography, clear information hierarchy.
- 🃏 Modern cards, subtle borders, controlled shadows.
- 🚫 Avoid excessive glow, gradients, and decorative effects that reduce readability.
- Keep the UI focused: do not create a separate page for every small feature.

#### Color palette

Semantic tokens: components reference the **token name**, never the hex value, so switching themes does not require rebuilding any screen.

| Token | 🌙 Dark (default) | ☀️ Light | Used for |
|---|---|---|---|
| `background` | `#080A0F` | `#FFFFFF` | Page canvas |
| `surface` | `#111827` | `#F3F4F6` | Cards, header, sidebar, bottom bar, modals, inputs |
| `text-primary` | `#F5F7FA` | `#17191F` | Headings and body text |
| `accent` | `#E53945` | `#E53945` | Primary buttons, active nav/tab, key links, progress highlights, unread dots |

- [ ] Derive the missing tokens in Figma (two values per theme) and add them to this table: secondary text, border/divider, hover/pressed, success, warning, error.
- ⚠️ **Contrast:** `#E53945` on `#080A0F` ≈ 4.7:1, white on `#E53945` ≈ 4.2:1, and red text on white ≈ 4.2:1. Fine for large/bold text and icons; for small text on red buttons use bold labels and verify with Figma's contrast checker; avoid small red body text on the light theme.

### 8.2 Button hierarchy

| Level | Style | Use |
|---|---|---|
| **Primary** | White text on a filled red background | The most important action in a context: Start Game, Continue Playing, Save, Apply |
| **Secondary** | Red text and red border on a transparent background; hover adds a subtle red-tinted background or restrained glow | Supporting actions |
| **Tertiary / Ghost** | White or muted text, no prominent border or fill | Low-emphasis actions and simple controls (e.g. "See All") |

Do not make every action a filled red button. Keep hover/focus states consistent and ensure **visible keyboard focus**.

### 8.3 Responsive layouts

Design and check all three breakpoints:

| Device | Navigation |
|---|---|
| 🖥️ Desktop | Side navigation |
| 📋 Tablet | Side navigation where appropriate |
| 📱 Mobile | Fixed five-item bottom navigation; secondary pages designed to work comfortably on small screens |

### 8.4 Shared components

Create reusable components (with variants, using the semantic tokens) for:

- [ ] Primary navigation, mobile bottom navigation, mobile top bar (with back-arrow variant), guest header, and avatar menu.
- [ ] Buttons (primary / secondary / tertiary), text / password / search inputs, dropdown (including searchable and multi-select), checkbox, radio, filter chips, active-filter chips.
- [ ] Game cards (all variants, including progress overlay) and game-cover grids.
- [ ] Range-selection popover (Min/Max inputs + slider, Apply, Reset).
- [ ] Search, filter, and sort controls; tabs and segmented controls (Games tabs, Library statuses, Community filters, Profile tabs).
- [ ] Section header with "See All" link; Dashboard widget card (loading / empty / error variants).
- [ ] Wishlist button (with count badge) and Wishlist modal list item.
- [ ] Collection cards.
- [ ] User avatars (with presence indicator) and profile summaries.
- [ ] Activity feed items and review cards.
- [ ] Notification items.
- [ ] Conversation previews and message bubbles with the chat composer.
- [ ] Achievement cards (locked / unlocked / progress) and the achievement-unlock toast.
- [ ] Modal shell / confirmation dialog, toast / inline alert.
- [ ] Empty states, loading skeletons, error states, image fallback, infinite-scroll loading-more / end-of-list / retry indicators.
- [ ] Theme toggle and other shared settings controls.

> Components should remain visually consistent across sections.

### 8.5 Modal, popover, and dialog inventory

Reuse one pattern per kind instead of inventing a style per action.

| Modal / dialog | Opened from | Content / actions |
|---|---|---|
| Login-required prompt | Guest uses a protected action | Brief explanation, Login, Create Account, Cancel |
| **Wishlist modal** | Wishlist button on the Games page; Dashboard Wishlist "See All" | Wishlisted games with count; open Game Details, remove, move to Library (choose status); empty state with a CTA to Explore. Full-screen or bottom sheet on mobile |
| Add / change Library status | Game Details, game card | Status selection (Playing, Saved, Completed), Save, Cancel |
| Add to Collection | Game Details | Pick an existing collection or create one, Save |
| Create / Edit Collection | My Collections, Add-to-Collection flow, owner menu | Name, description, visibility, optional cover, games, Save, Cancel |
| Delete Collection | Collection owner menu | Explain the consequence, Delete, Cancel |
| Remove game | Library, Collection | Confirm only destructive removals; state whether it leaves the Library or only the Collection. Wishlist add/remove stays a direct toggle |
| Review editor / edit review | Game Details, own review menu | Rating, text, Save, Cancel |
| Report review | Review menu | Reason, optional detail, Submit, Cancel |
| Image lightbox | Screenshot or artwork | Large image, next/previous, close |
| Edit Profile | Own profile | Display name, bio, avatar/cover, Save, Cancel |
| Upload / crop image | Avatar, profile cover, collection cover | Choose file, preview/crop, Save, Cancel |
| Followers / Following list | Profile | Scrollable user list with Follow/Unfollow |
| Mobile Explore filter drawer/modal | Explore | Filters, Apply, Clear all, Close |
| Range popovers | Explore | Release Year, Rating, and Estimated Playtime: Min/Max controls, Apply, Reset |
| Achievement unlock toast | Active game session | Achievement name and game, auto-dismiss |
| New message | Messages, Profile | Pick a user, first message, Send |
| Avatar menu | Header | Settings, Theme, Log out |
| Guest mobile menu | Guest top bar | Home, Features, About, Games, Community, Login, Register, theme toggle |
| Unsaved changes prompt | Form modal, Edit Profile, Settings | Leave without saving / Keep editing |
| Error dialog or toast | Failed operation | Clear message, retry / dismiss |

**Modal rules**

- Use modals for short tasks and a full page for substantial workflows.
- On mobile, wide modals become a full-screen or bottom sheet and must not sit under the bottom bar.
- Destructive actions need clear wording and a safe Cancel path; avoid confirmations for small reversible actions (Wishlist add/remove, Follow/Unfollow are direct toggles).
- Define loading, validation-error, success, and disabled-submit states for forms.
- Escape, close button, and click-outside behave consistently where applicable.

---

## 🖼️ 9. Required Figma frames and states

For every primary page, design the main desktop layout and its responsive behavior.

### 9.1 Dedicated frames

- [ ] Public Home
- [ ] Public pages: Features, About, Terms
- [ ] Login and Registration
- [ ] Forgot and Reset Password
- [ ] Dashboard (first-time and populated)
- [ ] Games — Explore tab (including filter popovers, active chips, mobile filter drawer)
- [ ] Games — Library tab (Playing, Saved, Completed)
- [ ] Games — Wishlist modal (populated, empty, mobile)
- [ ] Game Details (including achievements and active-session state)
- [ ] My Collections
- [ ] Collection Details
- [ ] Community (All, Following, Reviews, Achievement Unlocks, username search)
- [ ] Profile (own and other)
- [ ] Followers / Following list
- [ ] Messages (list + conversation)
- [ ] Notifications
- [ ] Account Settings

### 9.2 States for data-driven pages

- [ ] ⏳ Loading state (skeletons per section)
- [ ] 📭 Empty state (including filtered-empty with clear-filters)
- [ ] ❌ Error state with retry
- [ ] ✅ Populated state
- [ ] 🎉 Success or confirmation feedback for important actions

### 9.3 Themes

- [ ] Design both **dark** and **light** themes, keeping hierarchy and contrast consistent.

### 9.4 Advanced-feature states

These features are implemented later, but their user-facing states are designed in the relevant pages now. PWA, offline, and caching are **behaviors of existing pages, not separate pages**.

| Feature | Where it appears | States to include |
|---|---|---|
| Socket.IO chat | Messages | Connected, reconnecting, offline, sending, failed send |
| Online presence | Avatars, Messages, Profile | Online, offline |
| Real-time notifications | Header bell, Notifications | Unread count, new notification, empty |
| Game session / achievements | Game Details, Dashboard | Start Game, active session timer, Exit Game, unlock toast |
| Offline support | Dashboard, Games, Game Details, Library, Messages | Offline banner / indicator, cached content, unavailable action |
| PWA install | App shell | Install prompt — only if intentionally offered |
| IndexedDB drafts / sync | Reviews, cached data | Draft available, draft restored, sync pending |
| API cache | Most data pages | Loading, cached content, refresh / retry, stale data |
| Infinite scroll / lazy loading | Explore, Community feed | Loading more, end of list, retry |
| Debounced search | Explore title search, Community username search | Typing, loading, results, no results |
| Image upload | Profile, Collections | Selecting, preview, invalid file, upload progress, success / failure |
| Theme persistence | All pages | Dark default, light selected, saved preference |
| Auth and protected actions | Dashboard, Library, Wishlist modal, Collections, Reviews, Messages | Guest prompt, authenticated state, expired session (sessions last 3 days) |

---

## 🗓️ 10. Figma file structure and design order

### File pages

`00 Foundations` · `01 Components` · `02 Public & Auth` · `03 Games` · `04 Collections` · `05 Dashboard` · `06 Community` · `07 Profile, Messages & Notifications` · `08 Settings & Modals` · `09 Responsive & Light Audit` · `10 Prototype`

### Design order

Design everything in Figma before its implementation phase. The order avoids reworking components:

1. **Foundations and shared components:** file structure, Cinematic Gaming references, color tokens (dark + light, plus derived tokens), typography, spacing, grid, radius, borders, elevation, button hierarchy, core components.
2. **Public Home** (Hero first) and the public pages (Features, About, Terms).
3. **Games — Explore.**
4. **Game Details and achievements.**
5. **Login / Register / password recovery.**
6. **Games — Library tab and the Wishlist modal.**
7. **Collections.**
8. **Dashboard.**
9. **Community open-world feed.**
10. **Profile.**
11. **Messages and connection states.**
12. **Notifications.**
13. **Account Settings.**
14. **Remaining modals, popovers, and edge states.**
15. **Responsive and Light Mode audit** across all pages.

Then **prototype** the key journeys: Home → Register/Login → Dashboard, Explore → Game Details → Library, Games → Wishlist modal → Game Details, create a Collection, Community → profile → follow, notification → message.

> 🏁 **Design is done when** the page structure, reusable components, both themes, and important states are represented, and the key flows are linked in the prototype.

---

## ✅ 11. Acceptance checklist

### 🧭 Navigation

- [ ] The public website has four pages: Home, Features, About, Terms.
- [ ] The web app has exactly five primary items: Dashboard, Games, Community, Collections, Profile.
- [ ] Desktop (side nav) and mobile (five-item bottom nav) use the same primary destinations.
- [ ] Games is one destination with Explore and Library tabs (Explore first); they are not separate primary items.
- [ ] Wishlist is a button on the Games page that opens a modal — not a page or primary item.
- [ ] Messages, Notifications, and Settings are reachable from header icons and the avatar menu.
- [ ] The Library tab and Wishlist modal show a sign-in prompt to guests.

### 📄 Page responsibilities

- [ ] Public Home is a platform landing page; Dashboard is the signed-in personal overview.
- [ ] Saved and Wishlist remain distinct.
- [ ] Library shows Playing, Saved, and Completed.
- [ ] Achievements live on Game Details; no top-level Achievements page.
- [ ] Collections remain distinct from the Library.
- [ ] Community is an open-world feed, separate from Messages.
- [ ] Settings contain only Profile & Account, Privacy, and Appearance.

### 🎮 Explore and games

- [ ] Game cards show title, release year, genre, rating, and one fixed estimated-playtime number.
- [ ] Search/filter scope is title, genre, release-year range, developer, platform, rating range, and estimated-playtime range — no "More Filters".
- [ ] Result count, active filter chips, and clear-all are designed.
- [ ] Sorting is Name, Rating, and Estimated Playtime, each ascending/descending.
- [ ] Infinite scroll, loading, empty, and error states are designed; mobile filters use a drawer or modal.
- [ ] Achievements show the three categories; Start Game → Exit Game and the unlock toast are designed.

### 💬 Community

- [ ] Username search bar plus All (default), Following, Reviews, and Achievement Unlocks filters.
- [ ] Guest, empty, loading-more, end-of-feed, and error/retry states exist.

### 🔐 Access flow

- [ ] Public Home and its sibling pages look the same for guests and signed-in users.
- [ ] A processed login or registration enters the app at Dashboard unless restoring a protected destination.
- [ ] Protected actions for guests show the login-required prompt.

### 🎨 Design coverage

- [ ] Dark and light palettes use semantic tokens; `#E53945` is the accent; derived tokens are defined.
- [ ] Primary / secondary / tertiary button hierarchy and visible focus states are defined.
- [ ] Desktop, tablet, and mobile layouts are designed.
- [ ] Every modal and popover in the inventory has a purpose and an entry point.
- [ ] Shared components use reusable variants rather than one-off designs.
- [ ] Loading, empty, error, image-fallback, and success states are covered, including the first-time Dashboard.
- [ ] Chat, presence, offline, cache, upload, and theme states appear in the appropriate screens.
- [ ] The prototype links the most important user journeys.
- [ ] The scope is stable enough that coding can begin without guessing the page structure.
