# RV Fitness — 3D Gym Management & Public Platform (Narsobawadi)

> Built from scratch with Next.js (App Router), Tailwind CSS v4, TypeScript, and local MongoDB (`mongodb://127.0.0.1:27017/rvfitness`).

---

## 🏋️ Project Overview

**RV Fitness** is a modern, high-performance gym management platform and public website for **RV Fitness, Narsobawadi**.

- **Brand Theme:** Dark and premium. Deep obsidian `#080808`, RV Gold `#FFC62A` accents, white typography, and subtle yellow spotlight cursor illumination.
- **Section 0 Phased Delivery:**
  - ✅ **Stage 1:** Project setup, folder structure, theme tokens, MongoDB connection, Mongoose schemas, and UI design system.
  - ✅ **Stage 2:** Loading screen (0-100 reveal), Navbar transition, and Split Home Hero with Bodybuilder Ink Reveal.
  - ✅ **Stage 3:** Remaining Public Sections completed (About, Trainers, Equipment 3D viewer & modal, Events countdown, Gallery social feed, Transformations overlay, Membership tiers with Razorpay flow, Contact form saving to MongoDB).
  - ✅ **Stage 4:** Working Backend, Database Models & JWT Authentication (bcrypt hashing, JWT HTTP-only cookies, local MongoDB seeder).
  - ✅ **Stage 5:** Dashboards & Admin Panel (Member workout & diet tracker, Trainer session queue, Admin enquiry inbox & database monitoring).
  - ⏳ **Stage 6:** Razorpay payments, media uploads, and email notifications.
  - ⏳ **Stage 7:** End-to-end testing, Lenis smooth scroll tuning, and final polish.

---

## 💻 Tech Stack & Environment

- **Framework:** Next.js (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Smooth Inertia Scrolling:** `@studio-freight/lenis` / `lenis`
- **Database:** Local MongoDB with Mongoose ODM
- **Icons:** `lucide-react`
- **Environment:** Windows 11 / Node.js v24

---

## 📁 Folder Structure

```
RV Fitness/
├── public/
│   ├── logo/
│   │   └── rv-logo.svg           # Circular gold-outlined RV Fitness vector logo
│   ├── images/                   # Gym assets, bodybuilder cutouts, gallery photos
│   └── models/                   # 3D GLB assets for equipment viewer
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── health/           # Health check verifying local MongoDB connectivity
│   │   ├── (auth)/               # /login, /register, /forgot-password
│   │   ├── (dashboard)/          # Member, Trainer, and Admin dashboards
│   │   ├── transformations/      # Deep-linkable transformation modal pages
│   │   ├── globals.css           # Brand theme tokens, cursor glow, pill buttons, gym scrollbar
│   │   ├── layout.tsx            # Root layout with SEO and Lenis SmoothScrollProvider
│   │   ├── not-found.tsx         # Gym-themed 404 page ("Rep Not Found" with 25KG weight plate)
│   │   └── page.tsx              # Interactive Stage 1 preview & database verification
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx        # Primary/Secondary pill buttons + weight spinner loader
│   │   │   ├── SpotlightCard.tsx # Cursor-following yellow spotlight glow card
│   │   │   ├── Badge.tsx         # Gold / dark / status tags
│   │   │   └── SectionHeader.tsx # Eyebrow label, bold title, gold divider pattern
│   │   ├── layout/               # Navbar, Footer, Floating WhatsApp, Back-To-Top
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   └── mongodb.ts        # Singleton Mongoose connection handler with caching
│   │   ├── constants.ts          # Brand colors, contact details, navigation links
│   │   └── utils.ts              # cn helper, Indian Rupee formatters
│   ├── models/                   # Mongoose schemas (User, Plan, Trainer, Equipment, Event, etc.)
│   └── types/                    # Shared TypeScript interfaces
├── .env.example                  # Environment secrets template
├── .env                          # Local secrets (MongoDB URI, JWT, Razorpay test keys)
├── package.json
└── README.md
```

---

## 🚀 Windows Getting Started Guide

### 1. Prerequisites
- **Node.js**: v24 (or v22 LTS)
- **MongoDB**: Ensure MongoDB community server is running locally on Windows service or via command line at `mongodb://127.0.0.1:27017`.

To verify MongoDB on Windows:
```powershell
mongod --version
# Or test connection via mongosh:
mongosh mongodb://127.0.0.1:27017/rvfitness
```

### 2. Environment Setup
The `.env` file has been pre-configured for your local MongoDB database:
```ini
MONGODB_URI="mongodb://127.0.0.1:27017/rvfitness"
JWT_SECRET="rvfitness_dev_secret_key_narsobawadi_2026_fitness_jwt"
```

### 3. Run Development Server
```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Verify Local Database Status
Visit [http://localhost:3000/api/health](http://localhost:3000/api/health) to inspect the live Mongoose connection state.

---

## 🎨 Theme Verification (Stage 1)
- **Spotlight Cards:** Move the mouse cursor over cards to witness the radial yellow spotlight (`rgba(255, 198, 42, 0.14)`) following the cursor and the 4px elevation lift.
- **Button Loaders:** Click the "Click To Test Loader" button to preview the spinning weight plate gym loader.
- **Custom 404:** Visit `/not-found-demo` to inspect the "Rep Not Found" page featuring the 25KG weight plate zero.
