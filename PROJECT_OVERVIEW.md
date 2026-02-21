# Frontend Pixal – Project Overview

Yeh **sirf frontend** hai. Backend alag server par chalega; frontend usko `NEXT_PUBLIC_API_URL` se call karta hai.

---

## Tech Stack

| Item | Detail |
|------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Fonts | Geist (next/font) |
| PDF | pdfjs-dist, react-pdf, react-pageflip |
| Rich text | React Quill |
| State / Auth | React Context (Auth, Toast), localStorage for token |

---

## Project Structure

```
frontend_pixal-main/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx           # Root layout (Auth + Toast + Layout)
│   │   ├── page.tsx             # Home
│   │   ├── globals.css
│   │   ├── api/
│   │   │   └── proxy-pdf/       # Server route – PDF proxy (CORS avoid)
│   │   ├── admin/               # Admin panel (protected)
│   │   │   ├── layout.tsx       # Protects all except /admin/login
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── blogs/
│   │   │   ├── projects/
│   │   │   ├── team/
│   │   │   ├── testimonials/
│   │   │   └── contact/
│   │   ├── about/
│   │   ├── blogs/               # Public blog list + [slug]
│   │   ├── projects/            # Public projects list + [id]
│   │   ├── contact/
│   │   ├── team/
│   │   ├── services/
│   │   ├── careers/
│   │   ├── booking/
│   │   ├── terms/
│   │   └── privacy/
│   ├── components/
│   │   ├── Layout.tsx           # Header + Footer (non-admin)
│   │   ├── Header.tsx, Footer.tsx
│   │   ├── Hero, AboutSection, Services, Projects, BlogSection, Testimonials, ContactSection
│   │   ├── admin/               # AdminSidebar
│   │   ├── ui/                  # Button, Card, Toast, RichTextEditor, PdfFlipbook, etc.
│   │   └── ProtectedRoute.tsx
│   ├── api/                     # Backend API client (frontend → backend)
│   │   ├── config.ts            # API_BASE_URL, endpoints, getAssetUrl, getAuthHeaders
│   │   ├── client.ts            # api.get/post/put/delete, ApiError
│   │   ├── auth.ts
│   │   ├── users.ts, blogs.ts, projects.ts, team.ts, testimonials.ts, contact.ts
│   │   └── index.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx      # user, token, login, logout, isAdmin
│   │   └── ToastContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts, useToast.ts, useUsers.ts, useRefetchOnWindowFocus.ts
│   │   └── index.ts
│   └── images/
├── scripts/
│   └── copy-standalone-static.js   # cPanel/standalone deploy ke liye
├── next.config.ts
├── package.json
├── .env.example                 # NEXT_PUBLIC_API_URL
├── DEPLOY_CPANEL.md             # cPanel deploy guide
└── PROJECT_OVERVIEW.md          # Yeh file
```

---

## Public Routes (no login)

| Route | Purpose |
|-------|---------|
| `/` | Home – Hero, Partners, About, Services, Projects, Blog, Testimonials, Contact |
| `/about` | About page |
| `/blogs` | Blog list |
| `/blogs/[slug]` | Single blog (with PDF flipbook support) |
| `/projects` | Projects list |
| `/projects/[id]` | Single project |
| `/contact` | Contact |
| `/team` | Team |
| `/services` | Services |
| `/careers` | Careers |
| `/booking` | Booking |
| `/terms` | Terms |
| `/privacy` | Privacy |

---

## Admin Routes (login required, admin role)

| Route | Purpose |
|-------|---------|
| `/admin/login` | Login (only unprotected admin route) |
| `/admin/dashboard` | Dashboard – counts (users, blogs, projects, team, testimonials) |
| `/admin/users` | User CRUD |
| `/admin/blogs` | Blog CRUD |
| `/admin/projects` | Project CRUD |
| `/admin/team` | Team CRUD |
| `/admin/testimonials` | Testimonials CRUD |
| `/admin/contact` | Contact entries |

---

## Backend API (external server)

Frontend **sirf client** hai. Saari data **backend** se aati hai via `NEXT_PUBLIC_API_URL` (default dev: `http://localhost:3001`).

- **config.ts** – `API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'`
- **Endpoints** – Auth, Users, Blogs, Projects, Team, Testimonials, Contact (sab backend paths jaise `/api/users/login`, `/api/blogs`, etc.)
- **Assets** – Images/PDFs backend se aate hain; `getAssetUrl()` / `getDisplayImageUrl()` / `getPdfUrl()` se full URL banta hai.

---

## Next.js server route (frontend ke andar)

- **`/api/proxy-pdf`** – PDF URL proxy (CORS avoid karne ke liye). Usage: `/api/proxy-pdf?url=<encoded-pdf-url>`.  
  Is wajah se ye app **pure static nahi** hai; deploy par **Node.js** chahiye (e.g. cPanel “Setup Node.js App” ya Vercel/Netlify).

---

## Environment

- **`.env`** – `NEXT_PUBLIC_API_URL=https://pixal-fe5o.onrender.com` (production API on Render). Dev ke liye `http://localhost:3001` use kar sakte ho.
- **Production deploy** – cPanel/env me bhi same: `NEXT_PUBLIC_API_URL=https://pixal-fe5o.onrender.com`.

---

## cPanel par kya upload karna hai?

**Nahi – complete frontend code (src/, package.json, etc.) cPanel par upload mat karo.**

Sirf **build ke baad** jo folder banta hai woh upload karna hai:

1. Apne computer par build karo (`.env` me `NEXT_PUBLIC_API_URL=https://pixal-fe5o.onrender.com` already hai to seedha):
   ```bash
   npm run build
   npm run build:cpanel
   ```
2. **Upload karo:** `.next/standalone` folder ke **andar ki saari cheezen** (contents), na ki pura project.
   - Matlab: `server.js`, `node_modules/`, `.next/` (folder) – ye sab cPanel ki Node.js app wali folder me honi chahiye.
   - `src/`, `public/`, `package.json` (source) – **upload karne ki zaroorat nahi**; build me sab include ho chuka hota hai.

**Short:** Complete code mat le jao. Sirf **standalone build output** le jao (`.next/standalone` ka content). cPanel par startup file `server.js` set karo, env me `NEXT_PUBLIC_API_URL=https://pixal-fe5o.onrender.com` daalo, restart karo.

---

## Build & run

```bash
# Dev (backend localhost:3001 par chal raha hona chahiye)
npm run dev

# Production build (standalone – deploy ke liye; .env me URL hai)
npm run build
npm run build:cpanel   # copies .next/static into standalone
# Upload .next/standalone contents to server; run: node server.js
```

---

## Summary

- **Frontend only** – koi database/backend code yahan nahi.
- **Backend** – alag app (e.g. Node/Express) jo same endpoints expose kare jo `src/api/config.ts` me defined hain.
- **Deploy** – Next.js ko Node.js par run karna zaroori hai (proxy-pdf route ki wajah se). Guide: `DEPLOY_CPANEL.md`.
