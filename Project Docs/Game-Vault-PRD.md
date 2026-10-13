# 🎮 Game Vault — Product Requirements Document (PRD)

> **Document:** `Game-Vault-PRD.md`
> **Purpose:** Define the product, its scope, the route map, and the phase-by-phase implementation roadmap. This is the "what and when"; page and design details live in Figma-Todos, feature behavior in Features, and technical rules in Architecture.
> **Version:** 3.0 · **Status:** Planned · **Decisions source:** [Consolidated Decisions](./Game-Vault-Consolidated-Decisions.md) (2026-10-13)

**Related docs:** [Figma Todos](./Figma-Todos.md) · [Features](./project-features.md) · [Architecture](./project-architecture.md)

> 📌 **Precedence:** If any document disagrees with this PRD or `Figma-Todos.md`, those two win.

---

## 📑 Table of Contents

1. [Product overview](#-1-product-overview)
2. [Technology stack](#-2-technology-stack)
3. [Navigation and routes](#-3-navigation-and-routes)
4. [Release scope](#-4-release-scope)
5. [Development roadmap](#-5-development-roadmap)
6. [Git workflow](#-6-git-workflow)
7. [Definition of done](#-7-definition-of-done)

---

## 🎯 1. Product overview

### 1.1 Vision

Game Vault is a modern **game-discovery, personal-library, and social platform** where users discover games, manage a personal library, track play sessions and achievements, build collections, and interact with other players — in one responsive, **Cinematic Gaming** interface (dark by default, red accent `#E53945`).

### 1.2 Objectives

- Build a polished, portfolio-quality full-stack application with clean, maintainable code.
- Practice professional React + TypeScript architecture and a REST API with Node.js and Express.
- Implement authentication, authorization, validation, and secure sessions.
- Use relational and non-relational databases only where each fits, with client-side state and server-state caching.
- Build community features and real-time messaging.
- Deploy the frontend and backend independently.

### 1.3 User types

| Role | Can | Cannot |
|---|---|---|
| 👤 **Guest** | View the public website (Home, Features, About, Terms), browse Explore and Game Details, **view the Community feed**, view public profiles and collections, register or log in | Access private data or protected actions — Library, Wishlist, Following feed, follow actions, Messages (these trigger a sign-in prompt) |
| 🎮 **Registered user** | Manage Library, Wishlist, and Collections; use Dashboard and Profile; start/exit game sessions and unlock achievements; follow users; use Community (feed, username search) and Messages; read Notifications; change settings and theme | Modify another user's resources · create or add game records (the catalog is curated by the project owner) |
| ⚙️ **System** | Validate requests and permissions, store data, serve the curated game catalog, manage authentication, return errors in one format, **enforce access rules on the server — not only in the frontend** | — |

---

## 🧰 2. Technology stack

| Layer | Technologies |
|---|---|
| **Frontend** | React · TypeScript · Vite · React Router · Redux Toolkit · RTK Query · Axios · React Hook Form · Yup · CSS Modules · Sonner *(toasts)* · socket.io-client *(advanced)* · IndexedDB + service workers *(later, offline)* |
| **Backend** | Node.js · Express · TypeScript · REST API · cookie-based auth · server-side validation · centralized error handling · authorization middleware · **Socket.IO** *(one authenticated connection for chat, presence, and real-time notifications)* |
| **Data** | **PostgreSQL on Neon** (primary, serverless-hosted) · **MongoDB** and **Redis** (both planned for the advanced/later phase; exact responsibilities not decided yet) |
| **External** | Image storage provider for user uploads *(if uploads exist)* · hosting for frontend, backend, and databases. **No external game-data provider** — the catalog is Game Vault's own |

> 🔑 Private API keys and credentials stay on the server — never in frontend code.
> 📖 Why each technology is used: [Architecture](./project-architecture.md).

---

## 🧭 3. Navigation and routes

The **public website** has four pages: **Home · Features · About · Terms**. After login, the web app has exactly **five** primary navigation items: **Dashboard · Games · Community · Collections · Profile**. **Games** is one destination with two internal tabs, **Explore** and **Library**; **Wishlist** is a button on the Games page that opens a modal. Messages, Notifications, and Settings are secondary destinations reached through header icons and the avatar menu. The public website and authentication pages sit outside the authenticated shell. Exact routes can be finalized during implementation.

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public (platform landing page; not personalized) |
| Features · About · Terms | `/features` · `/about` · `/terms` | Public |
| Login · Register | `/login` · `/register` | Public |
| Forgot / Reset Password | `/forgot-password` · `/reset-password/:token` | Public / valid reset link *(if implemented)* |
| Dashboard | `/dashboard` | Signed in (personal overview) |
| Games / Explore | `/games` | Public |
| Games / Library | `/games?tab=library` | Signed in |
| Game Details | `/games/:gameId` | Public |
| Wishlist | *modal on the Games page — no route* | Signed in |
| My Collections | `/collections` | Signed in |
| Collection Details | `/collections/:collectionId` | Public or owner-only, by visibility |
| Community | `/community` | Public view; signed-in actions |
| Profile | `/users/:username` (the Profile nav item opens your own) | Public, subject to visibility rules |
| Messages | `/messages` | Signed in |
| Notifications | `/notifications` | Signed in |
| Account Settings | `/settings` | Signed in |

> Routes can share layouts and components; a new URL does not require a new implementation. Some entries are tabs, sections, drawers, or modals rather than pages (e.g. the Wishlist modal, Edit Profile, Followers/Following lists, Create/Edit Collection).
> Page contents: [Figma Todos](./Figma-Todos.md).

### Product decisions

| Topic | Decision |
|---|---|
| **Visual direction** | **Cinematic Gaming**. Dark default (near-black/deep-navy, white text); light theme (white backgrounds, black text); same red accent `#E53945` used deliberately, not across the whole UI. Button hierarchy: **Primary** (white text on filled red), **Secondary** (red text + red border, transparent), **Tertiary/Ghost** (muted text, no border/fill). Visible keyboard focus everywhere |
| **Notifications** | A **Notifications page** (`/notifications`) with a list and unread indicator, mark one / mark all as read, and click-through to the related profile, message, or content. The header bell shows the unread indicator and links to the page. Candidate types: new followers, new messages, other implemented social events |
| **Public website** | Four public pages: **Home** (a platform landing page, not personalized), **Features**, **About**, and **Terms**. They share one `PublicLayout` |
| **Entering the app** | Login or Register → processed successfully → the user enters the authenticated app at `/dashboard` (or the protected destination they originally requested). The app has five primary items: Dashboard, Games, Community, Collections, Profile |
| **Dashboard vs Games vs Library** | **Dashboard** = the user's personal overview: featured banner, a few high-level metrics, **Currently Playing**, **Saved**, **Wishlist preview**, **recent achievements**, followed users' activity. **Games** = one destination with two tabs: **Explore** (public catalogue) and **Library** (signed in; **Playing**, **Saved**, **Completed**). **Saved** = games already in the library that haven't been started; **Wishlist** = games the user wants to acquire — never duplicate one under the other |
| **Wishlist** | Lives on the **Games page**, not as a page or primary item. A **Wishlist button** on the Games page opens a **modal** listing the wishlisted games (count, open Game Details, remove, move into the Library). Games are added to the Wishlist from game cards and Game Details |
| **Explore** | Compact cards show title, release year, genre, rating, and **one fixed estimated-playtime value** (integer hours). Filters: title (debounced), genre chips, release-year range, developer, platform, rating range, estimated-playtime range — **no generic "More Filters"**. Sorting: **Name, Rating, Estimated Playtime**, each ascending/descending. Result count, active filter chips, clear-all, infinite scroll; mobile filters in a drawer/modal. Estimated playtime is descriptive and never an achievement rule |
| **Game sessions and achievements** | Playtime comes from tracked sessions, not typed hours. **Start Game** starts a session and becomes **Exit Game**; the frontend runs the timer, the **backend validates and persists** unlocks, and achievements can unlock mid-session with an immediate toast (Sonner). Categories: **Playtime** (per game, 1/5/10/25/50/100 h), **Completion** (never from playtime alone), **Optional Milestones**. One unlock per user/game/achievement. Achievements live on Game Details, not a separate page |
| **Collections** | A primary destination: curated groups of games. Public collections viewable by others; private only by the owner. Collections are separate from Library status |
| **Profile** | A primary destination. The Profile nav item opens your own profile at `/users/:username` (the same layout other users' profiles use); owner-only actions (Edit Profile modal, settings access) appear on the own profile. Tabs: Overview, Library (publicly shown games only), Reviews, Collections, Activity |
| **Settings** | Three sections only: Profile & Account, Privacy, Appearance/theme |
| **Database** | PostgreSQL hosted on **Neon**. MongoDB and Redis are planned for the advanced/later phase; their exact responsibilities are decided then |
| **Game catalog** | Game records are curated and added to Game Vault's own database by the project owner. The app does not fetch its catalog from external game-data providers; the custom Game Vault API serves games from the project's database. Regular users cannot create or add game records |
| **Game images** | Stored in the frontend project's `public` directory (e.g. `/images/games/cyberpunk-2077.webp`). The database stores each image's **relative public path** — not image files and not Google Drive links. The API returns the path with the game data and the frontend uses it as the image source. Prefer optimized formats (WebP or AVIF) and consistent naming |
| **Sessions** | Cookie-based sessions with a **3-day** lifetime. The session ID is stored in a cookie; session details and validation live on the server. Final cookie settings are set during authentication implementation (production: `HttpOnly`, `Secure`, appropriate `SameSite`) |
| **Community** | An **open-world activity and discovery feed**, publicly viewable. A **username search bar** finds players (not games). Feed filters: **All** (default; reviews + achievement-unlock announcements), **Following**, **Reviews**, **Achievement Unlocks**. Game start/exit/completion events only if the final feed design supports them. Infinite scroll with loading-more, end-of-feed, and retry states. Private library activity is never exposed unless its owner made it public. *To confirm before implementation:* whether audience (All/Following) and activity type (All/Reviews/Achievements) are independent dimensions or four mutually exclusive tabs |
| **Messaging, presence, and real-time** | Direct player-to-player chat only (no servers or group chat). **One authenticated Socket.IO connection** serves chat, online/offline presence, and real-time notifications — no separate presence connection. The server derives presence from authenticated sockets; multi-tab/device safe (a user stays online while any socket remains). An in-memory presence registry is enough for a single server; Redis adapter later if multi-instance |
| **Deferred design work** | Detailed REST endpoints and contracts, database schemas and relationships, MongoDB/Redis integration details, and authentication/session details beyond the decisions above are designed in their own phases, not finalized in Phase 0 |

---

## 🚦 4. Release scope

Splitting scope keeps advanced features from blocking the core application.

| Release | Features |
|---|---|
| 🟢 **MVP** | Public website (Home + sibling pages) · register/login/logout · 3-day cookie sessions and protected routes · Dashboard · Explore (search, filters, sorting, infinite scroll) and Game Details · Library and Wishlist modal · Collections · Profile and settings · REST API + relational DB · theme persistence · loading/error/empty states |
| 🟡 **Second** | Community open-world feed (username search, All/Following/Reviews/Achievement Unlocks) · follows, followers/following lists · Notifications page · reviews |
| 🔴 **Advanced** | Game sessions (Start/Exit Game), achievements, and unlock toasts · real-time messaging, online presence, and real-time notifications over one Socket.IO connection · PWA and offline sync · advanced caching and performance · MongoDB and Redis *(planned; exact roles decided in that phase)* |
| ⚪ **Optional / later** | OAuth login · Favorites · Docker and CI/CD *(post-project learning)* |

---

## 🗺️ 5. Development roadmap

**Cycle:** `Plan → Design → Implement → Integrate → Test → Commit`

Build each feature as a **small vertical slice** (design → API contract → backend → UI → test) instead of all screens and all APIs at once. This keeps working functionality throughout development rather than leaving integration to the end. Design remaining pages in Figma before their implementation phase.

| # | Phase | Release |
|---|---|---|
| 0 | Planning and technical foundation | 🟢 |
| 1 | Figma: design system and public pages | 🟢 |
| 2 | Frontend foundation and public pages | 🟢 |
| 3 | Authentication and sessions | 🟢 |
| 4 | Authenticated layout and Dashboard | 🟢 |
| 5 | Games, Game Details, Library, Wishlist | 🟢 |
| 6 | Collections | 🟢 |
| 7 | Profile, settings, preferences | 🟢 |
| 8 | Community feed and social relationships | 🟡 |
| 9 | Notifications | 🟡 |
| 10 | Reviews | 🟡 |
| 11 | Real-time messaging and presence (Socket.IO) | 🔴 |
| 12 | Game sessions, achievements, and progress | 🔴 |
| 13 | PWA, offline, advanced caching | 🔴 |
| 14 | Testing, security, performance | All |
| 15 | Deployment and portfolio delivery | All |

> 🔌 Endpoints for every phase are listed in [Architecture → API](./project-architecture.md#-6-api-architecture). Define request/response contracts **before** connecting the UI.

---

### Phase 0 — 📋 Planning and technical foundation

> **Goal:** Define scope and make the important technical decisions before writing feature code.

- [x] Finalize the MVP ([§4](#-4-release-scope)).
- [x] Document the main user flows. **The flow is settled:**

  ```mermaid
  flowchart LR
      P["Public site<br/>Home · Features · About · Terms"] --> A["Login / Register"]
      A -->|processed| D["Dashboard<br/>(personal overview)"]
      D --> G["Games<br/>Explore · Library · Wishlist modal"]
      G --> GD["Game Details"]
      GD --> L["Add to Library / Wishlist"]
      GD --> C["Add to Collection"]
      GD --> S["Start Game → Exit Game<br/>(session, achievements)"]
      D --> CO["Collections"]
      D --> CM["Community<br/>Open feed · username search"]
      D --> PR["Profile"]
  ```

  1. A visitor lands on the public Home (`/`) and can move between Features, About, and Terms.
  2. Login or Register is submitted and processed → the user **enters the web application** at **`/dashboard`**, their personal overview.
  3. **Games** has **Explore** and **Library** tabs, plus a Wishlist button that opens a modal. Game Details → add to Library/Wishlist → change play status → Start/Exit Game.
  4. **Collections** hold curated groups of games; **Community** is the open activity feed; **Profile** shows the user's identity. Messages, Notifications, and Settings come from the header icons and avatar menu.
  5. Notifications are read on the Notifications page (header bell shows the unread indicator).

  Add social flows when their phase begins.
- [ ] Document architecture decisions: frontend/backend responsibilities, database ownership and relationships, authentication strategy, API naming, error format, validation rules, environment variables, image storage, deployment plan. Database: PostgreSQL on **Neon** (connection strings via environment variables; see [Architecture → Data stores](./project-architecture.md#-2-data-stores)). Decisions confirmed so far: curated own-database game catalog, game images as public-path references, 3-day cookie sessions, open-world Community feed, session-based achievements, one shared Socket.IO connection, MongoDB/Redis deferred to the advanced phase (see [Product decisions](#product-decisions)). API endpoints, database schemas, and MongoDB/Redis details are designed in their own phases.
- [ ] Create a backlog (Markdown or GitHub Projects). Each task: objective, dependencies, checklist, acceptance criteria, testing requirements.

**Done when:** MVP scope, route map, stack, and high-level architecture are documented.

---

### Phase 1 — 🎨 Figma: design system and public pages

> **Goal:** Establish the visual identity and design the first complete user-facing experience.

- [ ] Create the Figma file structure ([Figma Todos §11](./Figma-Todos.md#-11-figma-file-structure-and-design-order)).
- [ ] Define tokens: colors, typography, spacing, radius, shadows, borders, icon sizes, content widths, breakpoints, transitions. Visual direction and button hierarchy: [Figma Todos §9](./Figma-Todos.md#-9-global-ui-requirements).
- [ ] Design core components with Figma components and variants ([Figma Todos §9.4](./Figma-Todos.md#94-shared-components)).
- [ ] Design the **Hero** first: logo, headline, description, primary and secondary CTA, gaming artwork, header navigation, responsive layout. A visitor should understand Game Vault within seconds.
- [ ] Complete the landing page: featured games or product preview, benefits, community preview, final CTA, footer. It stays public and generic — never a personalized dashboard after login.
- [ ] Design the public sibling pages (Features, About, Terms) so the public site is more than one page. They share the Home header, footer, and tokens.
- [ ] Design authentication screens: login, registration, forgot password *(if included)*, validation errors, loading/success states, mobile layouts.
- [ ] Prototype **Home → Register/Login → Dashboard**, including form error and success states.

**Done when:** The visual system, landing page, authentication screens, and initial prototype are ready.

---

### Phase 2 — 🏗️ Frontend foundation and public pages

> **Goal:** Build the frontend structure before complex business logic.

- [ ] Set up Vite, React, TypeScript, ESLint/formatting, environment configuration, Git + `.gitignore`, and the folder structure ([Architecture → Frontend structure](./project-architecture.md#-9-frontend-structure-and-rules)).
- [ ] Implement global styles: CSS-variable tokens, typography, reset, layout rules, breakpoints, dark and light theme variables. Keep styling organized — no long utility-class strings in JSX.
- [ ] Build shared UI components (buttons, inputs, cards, avatars, badges, modal, toast, skeleton, empty state, error state) and verify them independently.
- [ ] Build the public layout (header, navigation, footer, containers, spacing).
- [ ] Build the Hero and remaining landing sections with static or mock content; all links go to their real routes. Check artwork/text positioning, typography, keyboard accessibility, contrast, and responsive behavior.
- [ ] Build the public sibling pages (`/features`, `/about`, `/terms`) inside the same public layout, with the header linking between them.

**Done when:** The public pages are responsive and visually close to the approved Figma design.

---

### Phase 3 — 🔐 Authentication and user sessions

> **Goal:** Establish identity and security before personalized pages — Dashboard, Library, Collections, and Profile all depend on it.

- [ ] **Data model:** user ID, username, email, password hash, display name, avatar URL, bio, timestamps; plus the server-side session model (session ID, user, expiry — 3-day lifetime). Never store plain-text passwords.
- [ ] **Contracts:** register, login, logout, current user *(+ password recovery if included)* — request bodies, responses, status codes, validation errors.
- [ ] **Backend:** Express setup, env loading, Neon PostgreSQL connection (`DATABASE_URL`), user schema/migrations, validation, password hashing, login verification, session creation (session ID in a cookie, 3-day lifetime), logout/invalidation, auth middleware, centralized error handling.
- [ ] **Forms:** login and registration with React Hook Form + Yup, password visibility toggle, loading states, server errors, redirect. The backend validates the same rules independently.
- [ ] **API client:** one centralized Axios instance (base URL, credentials, shared settings, consistent typed error handling).
- [ ] **Auth state:** load the current user on startup; handle loading / authenticated / unauthenticated, login and logout transitions, and expired sessions. **The server validates the session** — never rely only on localStorage or Redux.
- [ ] **Route protection:** public vs protected routes, login redirect, restoring the intended destination; default redirect is `/dashboard`.
- [ ] **Verify:** registration, duplicate email/username, invalid login, wrong password, logout, refresh while logged in, guest on protected pages, expired sessions, validation and server errors.

> **Cookie sessions are the chosen strategy** (3-day lifetime, session ID in the cookie, validated on the server) — do not mix in tokens without defining each one's responsibility. Final cookie setup (HttpOnly, Secure, SameSite, CORS) is settled in this phase: [Architecture → Authentication](./project-architecture.md#-4-authentication).

**Done when:** A user can register, log in, stay authenticated across refreshes, reach protected routes, and log out securely.

---

### Phase 4 — 📊 Authenticated layout and Dashboard

> **Goal:** Build the shared authenticated shell and the first personalized page.

- [ ] Finalize the shell: desktop side navigation, five-item mobile bottom navigation (Dashboard, Games, Community, Collections, Profile), header with avatar menu (Settings, Theme, Log out), notification bell with unread indicator (links to `/notifications`), message icon, theme toggle ([Figma Todos §1](./Figma-Todos.md#-1-navigation-architecture)).
- [ ] Implement shared layout components and nested routing so secondary pages render inside the same shell without duplicating navigation.
- [ ] Define Dashboard data: current user, a small set of high-level metrics, games **currently playing**, **Saved** games, **wishlist** preview, recent achievements and followed users' activity *(shown once those features exist)*, optional featured game-progress panel. **Show only metrics that can be calculated reliably from stored data — no artificial statistics.** Until sessions exist (Phase 12), "Playing" is derived from library status.
- [ ] Implement the Dashboard endpoint. It may aggregate several domain services, but business rules stay in those services, not in the route handler.
- [ ] Build the UI: welcome header, featured banner, metric row (not overcrowded), Currently Playing, Saved, Wishlist preview (ghost-style "See All"), recent achievements, compact activity preview — with loading, empty, and error states.
- [ ] **Verify:** the user's own data is shown, private data never leaks to another user, links work, empty accounts have a useful layout, previews lead to their full destinations ("See All" opens the Library tab filtered by that status, or the Wishlist modal).

**Done when:** The shell and Dashboard work with real backend data.

---

### Phase 5 — 🎮 Games (Explore, Library), Game Details, and Wishlist modal

> **Goal:** Build the core gaming functionality before the social features.

- [ ] **Data source:** the project's own database — records are curated by the project owner, with no external game-data provider; the custom API serves them and regular users cannot add games. Decide how the owner adds and maintains records (e.g. seed data or an admin-only path) and document the supported fields and search/filter behavior.
- [ ] **Game model:** ID, title, description, cover image path, release date/year, genres, platforms, developer, publisher, **rating (with a consistent, identified source)**, and **one integer estimated-playtime value in hours** (main-story estimate; descriptive only). Images live in the frontend `public` directory (e.g. `/images/games/<slug>.webp`); the database stores only the relative path and the API returns it with the game data. The schema is finalized in this phase.
- [ ] **Library entry:** user ID, game ID, play status (**Saved**, **Playing**, **Completed**), date added. **Tracked playtime is derived from sessions (Phase 12)** — users never type played hours. **Wishlist entry:** user + game. Enforce uniqueness; decide how a game moves between statuses and how duplicates are prevented.
- [ ] **Explore:** game title search (debounced, clearable), genre chips, release-year range popover, developer dropdown, platform multi-select, rating range popover, estimated-playtime range popover (Apply/Reset on popovers). **No generic "More Filters".** Sorting: **Name, Rating, Estimated Playtime**, each ascending/descending. Result count, active filter chips, clear-all. **Infinite scroll** on controlled pagination/cursor requests; reset loaded results when query, filters, or sort change; search/filters/sort combine rather than overwrite. Mobile filter drawer, skeletons, empty (clear-filters action)/error states. Expose only filters backed by the API. Use mock data only until the API contract is ready.
- [ ] **Game Details:** hero artwork, cover and metadata, description, genres/platforms, Library/Wishlist/Collection actions, related games, meaningful loading/error states. Achievements, Start/Exit Game, and reviews sections arrive in their own phases.
- [ ] **Library UI (second tab):** the user's tracked games grouped by play status — **Playing**, **Saved**, **Completed**: search within the library, sort/filter, status change, remove, guest sign-in prompt, empty/loading/filtered-empty/error states.
- [ ] **Wishlist modal:** a Wishlist button on the Games page (both tabs) opens a modal listing wishlisted games with the item count; each item opens Game Details, can be removed (direct action), or moved into the Library with a chosen status. Empty state with a CTA to Explore, loading/error states, full-screen or bottom sheet on mobile, guests get a sign-in prompt. Search/sort only if needed.
- [ ] **RTK Query** for games, Library, and Wishlist. Suggested learning sequence: GET → POST → cache invalidation → tags and automatic refetching → loading/success/error states → behavior after create/update/delete. Do not keep duplicate copies of server data in Redux slices.
- [ ] **Verify:** search, filters, and sorting working together, infinite-scroll pagination and reset, add/remove, status changes, duplicate prevention, data ownership, cache updates after mutations, API failures.

**Done when:** Users can explore games, open details, and manage the Library and Wishlist through the API.

---

### Phase 6 — 🗂️ Collections

> **Goal:** Let users organize games into custom groups.

- [ ] **Model:** collection ID, owner ID, title, description, visibility, timestamps; collection items linking collections to games. Define rules for duplicate games, ownership, and visibility.
- [ ] **Backend:** apply ownership and visibility rules on the server.
- [ ] **Overview:** collection cards, create dialog or page, edit/delete, empty/loading/error states.
- [ ] **Details:** title, description, game grid, add-game flow, remove-game, visibility controls, owner-only edit/delete.
- [ ] **Game Details integration:** add a game to an existing Collection without duplicating game data.
- [ ] **Verify:** CRUD, game membership, duplicate handling, permissions, public vs private visibility, cache invalidation.

**Done when:** Users can create, manage, and populate Collections securely.

---

### Phase 7 — 👤 Profile, settings, and preferences

> **Goal:** Complete the core account experience.

- [ ] **Public vs private data:** display name, username, avatar, bio, creation date, public Collections, selected games, statistics are public candidates. **Never expose email or private account data** on public profiles.
- [ ] **Profile header and tabs:** avatar, optional cover/banner, display name and username, bio, follower/following counts, high-level stats; tabs Overview, Library (only games the owner chose to show), Reviews, Collections (public), Activity. Same layout for own and other profiles; owner-only Edit Profile and settings access.
- [ ] **Edit profile (modal):** React Hook Form + Yup; display name, bio, avatar/cover (upload if image storage exists); server validation errors; success feedback.
- [ ] **Settings (`/settings`):** three sections — **Profile & Account**, **Privacy**, **Appearance/theme**. Avoid a large preferences center. Account-level preferences are stored on the server if they must follow the user across devices.
- [ ] **Theme persistence:** dark default, light option, toggle, preference persisted in local storage, correct initial theme with no visible flash where practical, consistent styling across pages.
- [ ] **Profiles at `/users/:username`:** public info, public Collections and games, followers/following lists (modal) and follow action once social features exist. Handle own, other-user, empty, private/restricted, and not-found states. Private settings and edit actions stay exclusive to the current user.

**Done when:** Users manage their profile and preferences, and public profiles respect privacy rules.

---

### Phase 8 — 💬 Community open-world feed and social relationships

> **Goal:** Introduce the open-world community feed, username-based player discovery, and user-to-user relationships.

- [ ] **Model:** follow relationships, activity events, notification records; posts, comments, and reactions only if explicitly in scope (each then needs its own model, contract, validation, permissions, UI states, and pagination/cache behavior). Feed events: **posting a review** and **unlocking an achievement** (default feed); game start/exit/completion only if the final feed design supports them. Review and achievement events appear once those features exist in Phases 10 and 12.
- [ ] **Follows:** follow/unfollow, followers and following lists. Prevent self-following and duplicates.
- [ ] **Username search:** a search bar on Community that finds players by username (not game titles), debounced; results lead to profiles.
- [ ] **Feed filters:** **All** (default), **Following**, **Reviews**, **Achievement Unlocks**. Switching filters resets the loading position. **Confirm before implementation** whether audience (All/Following) and activity type are independent dimensions (recommended — enables "reviews from followed users") or four exclusive tabs, and document the choice.
- [ ] **Feed visibility:** the feed is **publicly viewable (open world)**; Following and follow actions require sign-in. Respect profile privacy; private library activity appears only if its owner made it public.
- [ ] **Feed UI:** activity cards linking to the review/game or achievement/game context, avatars, timestamps, profile links, **infinite scroll** (controlled pagination/cursor fetching) with loading-more, end-of-feed, and retry states, plus empty, error, and guest states. No embedded chat in the feed. The complete feed lives in Community; Dashboard shows only a compact preview.
- [ ] **Social profile actions:** follow/unfollow, relationship lists, updated state, permission-aware actions.
- [ ] **Verify:** relationship changes, duplicate requests, pagination, filter switching, feed visibility and guest access, private-data protection, correct UI updates.

**Done when:** Users can browse the open feed, find players by username, and manage supported social relationships.

---

### Phase 9 — 🔔 Notifications

> **Goal:** Surface important account and social events on the Notifications page (`/notifications`), with an unread indicator on the header bell.

- [ ] **Types:** new follower, new message, other meaningfully implemented social events. Do not generate notifications for features that do not exist.
- [ ] **Generation:** create notifications inside the corresponding backend operation so the database stays consistent.
- [ ] **API:** paginated list with ownership checks, mark one as read, mark all as read, unread count.
- [ ] **UI:** Notifications page with a list, read/unread states, click-through to the related profile, message, or content, mark one / all as read, and unread, all-read, empty, loading, and error states. The header bell shows the unread indicator. Real-time delivery arrives with the shared Socket.IO connection (Phase 11).

**Done when:** Notifications are generated, stored, retrieved, and marked as read correctly.

---

### Phase 10 — ⭐ Reviews

> **Goal:** Add user-generated reviews and complete the Game Details experience.

- [ ] **Decide:** one review per game? rating, text, or both? edit/delete? reporting/moderation? must the game be in the user's Library?
- [ ] **Storage:** PostgreSQL when relational consistency and filtering matter; MongoDB (planned for the advanced phase, role not yet decided) only if a document model gives a real benefit. If MongoDB is used, document how review IDs and user/game references relate to PostgreSQL, and avoid duplicating critical data without a consistency strategy.
- [ ] **API:** ownership validation, request validation, pagination, rate limiting where appropriate.
- [ ] **UI:** review list, rating display, form, author edit/delete, empty/error states, rating summary on Game Details.

**Done when:** Reviews can be submitted, retrieved, updated, and deleted per the defined permissions.

---

### Phase 11 — ✉️ Real-time messaging and presence (Socket.IO)

> **Goal:** Add private player-to-player conversations, online/offline presence, and real-time notification delivery over **one shared authenticated Socket.IO connection**.
> Starts only after authentication, profiles, and basic social relationships work reliably.

- [ ] **Model:** conversations, participants, messages (sender, content, timestamp, read status). Define who can access a conversation and how membership is verified.
- [ ] **REST first:** list conversations, create/retrieve a conversation, load history, send a message (before real-time is enabled), update read status.
- [ ] **UI (`/messages`):** desktop split layout (conversation list left, selected conversation right, composer at the bottom); mobile list → conversation with back arrow; avatar/name, history, timestamps, sending/connection state, no-conversation, empty-conversation, sending/failure, offline, and reconnecting states.
- [ ] **Shared Socket.IO connection:** one authenticated connection for chat, presence, and real-time notifications — no separate connection for presence. A shared client/service exposed through a React layer (Context or a custom hook).
- [ ] **Server:** authenticate the socket; verify conversation membership server-side; send/receive in real time; connection loss and reconnection; unread indicators; persistence; duplicate-delivery handling. Do not promise delivery while disconnected.
- [ ] **Presence:** derived server-side from authenticated socket connections and lifecycle events, never from a client claim. Multi-tab/device safe — disconnecting one socket must not mark the user offline while another remains. Account for delay after abrupt network/browser failure. An in-memory registry is enough for a single server; a Redis/shared adapter is a later option, not a requirement.
- [ ] **Verify:** unauthorized access rejected, messages persist after refresh, multiple users receive correct messages, disconnected clients recover, unread state stays consistent, presence correct with multiple tabs.

> 🛑 Never trust a client-supplied conversation ID as proof of permission.

**Done when:** Users exchange private messages with persistent history, reliable authorization, and correct online presence.

---

### Phase 12 — 🏆 Game sessions, achievements, and progress

> **Goal:** Track play sessions, unlock achievements during play, and connect both to gaming activity.

- [ ] **Sessions:** **Start Game** begins a session (the action becomes **Exit Game** while the timer runs); Exit Game ends it and saves the final data. Playtime is derived from sessions — users never type hours. The frontend runs the active timer and triggers threshold checks; the **backend validates and persists**.
- [ ] **Achievement data:** achievements belong to games and are maintained internally. Fields: achievement ID, game ID, category, name, description, icon, unlock condition/source, user unlock state. Categories: **Playtime** (reusable per-game milestones — 1, 5, 10, 25, 50, 100 h — calculated from that game's sessions only), **Completion** (game-specific goals; need a separate completion signal or confirmation, never playtime alone), **Optional Milestones** (e.g. 100% completion; only where trackable or confirmable).
- [ ] **Unlock logic:** check conditions **during** the session at meaningful events and thresholds (not continuously for every achievement), unlock immediately, and **prevent duplicate unlocks** (one per user/game/achievement). The fixed estimated-playtime value on Explore is separate and never used to infer completion.
- [ ] **Toast:** show an immediate Sonner (or equivalent) toast when an achievement unlocks mid-session.
- [ ] **API:** per-game achievements, per-user achievements, and session start/exit endpoints with server-side validation.
- [ ] **Components:** locked, unlocked, progress indicator, summary, empty/loading states.
- [ ] **Integrate:** full list in Game Details (no separate Achievements page), recent achievements in Dashboard, achievement-unlock announcements in the Community feed, selected achievements in Profile. **No new primary navigation item.**
- [ ] **Deferred:** the exact completion-confirmation UX for game-specific completion achievements.

**Done when:** Sessions are tracked, achievements unlock once and consistently during play, and achievement data matches everywhere it appears.

---

### Phase 13 — 📲 PWA, offline support, and advanced caching

> **Goal:** Improve the application beyond its core online experience. Optional for the first release.

- [ ] **Caching review:** RTK Query cache duration, refetch rules, tag invalidation, pagination, duplicate requests, error recovery. Redis is planned for this advanced stage; decide its exact role here, based on a measured backend need.
- [ ] **PWA:** web app manifest, icons, service worker, installability, update behavior, offline fallback.
- [ ] **Offline scope:** choose features that truly need it — e.g. previously viewed game metadata, selected Library data, the app shell. Do **not** promise offline login, messaging, or synchronized mutations until conflict and security behavior is designed.
- [ ] **IndexedDB:** define stored data, freshness/expiration, invalidation, versioning, cleanup.
- [ ] **Sync (if offline changes are allowed):** record pending operations, retry safely, prevent duplicate mutations, handle conflicts, show sync status.

**Done when:** The supported offline capabilities work without silently losing or duplicating data.

---

### Phase 14 — 🧪 Testing, security, and performance

> **Goal:** Make the application stable and suitable for public deployment.

| Area | Check |
|---|---|
| **Frontend tests** | Shared components, form validation, route protection, auth states, API loading/error states, Library/Wishlist mutations, theme persistence, responsive behavior. Unit + integration for important logic, end-to-end for main journeys |
| **Backend tests** | Status codes, request validation, authentication, authorization, CRUD, database constraints, pagination/filtering, error handling |
| **Security** | Walk through the full [Architecture → Security](./project-architecture.md#-8-security) checklist |
| **Performance** | Image and lazy loading, code splitting, route-level lazy loading, unnecessary renders, response sizes, query efficiency, caching, infinite scroll (Explore and Community). Optimize only where it gives a measurable benefit |
| **Accessibility** | Keyboard navigation, focus states, labels and accessible names, contrast, dialog behavior, responsive text/controls, reduced motion |

**Done when:** Critical journeys pass tests and there are no known release-blocking security or functionality issues.

---

### Phase 15 — 🚀 Deployment and portfolio delivery

> **Goal:** Publish a stable application and make it easy to evaluate.

- [ ] **Production config:** separate dev/prod environments; frontend and backend env variables, DB connection strings, CORS origins, cookie settings, credentials for any external services, error logging. Game images ship with the frontend build (`public` directory). **Never commit secrets.**
- [ ] **Backend + database:** provision the Neon project (separate dev and production branches/databases), apply migrations against the direct connection, point the API at the pooled connection, deploy the Express API, configure CORS and cookies, test health checks and DB connectivity, verify key endpoints.
- [ ] **Frontend:** set the production API URL, build, deploy, verify client-side routing and refresh behavior, test login/logout against production, test all major workflows.
- [ ] **README:** overview, features, stack, architecture, installation, env example, API documentation link or summary, screenshots, live demo link, known limitations.
- [ ] **Final review:** visual consistency, responsive behavior, auth flow, core CRUD, data permissions, error handling, loading/empty states, code organization, Git history, README quality.

**Done when:** The application is deployed, documented, and ready for a portfolio.

---

## 🌿 6. Git workflow

Commit in small, meaningful units — don't wait until the project is finished.

```
chore: initialize React and TypeScript project
style: add design tokens and global styles
feat: build public landing page
feat: add login and registration forms
feat: implement authentication API
feat: protect authenticated routes
feat: build dashboard layout
feat: add game discovery
feat: implement library and wishlist
feat: add collections management
```

Continue with the same convention (`feat`, `fix`, `chore`, `style`, `docs`, …) for later features.

---

## ✅ 7. Definition of done

A feature is not complete merely because its UI looks correct. Check what applies:

- [ ] Figma design is approved, or visual requirements are defined.
- [ ] Frontend implementation is complete.
- [ ] Backend and API behavior are implemented where required.
- [ ] Server-side data validation is in place.
- [ ] Authorization is enforced for protected operations.
- [ ] Loading, empty, success, and error states are handled.
- [ ] API integration works with real data.
- [ ] Responsive behavior is verified.
- [ ] Important functionality is tested.
- [ ] Code follows the project's architecture conventions.
- [ ] Documentation is updated where necessary.
- [ ] Changes are committed to Git.
