# RV Fitness Website: Full Requirements Document

Prepared for Sarth · RV Fitness, Narsobawadi · October 24, 2026

This document records every requirement given so far for the RV Fitness 3D, responsive gym management website with a working backend. It is the source for the Antigravity build.

Items marked **(Assumption)** were suggested by Claude and are not yet confirmed by the owner; use them as defaults. Items marked **(Placeholder)** need real content from the gym; use clearly labeled dummy data until it is supplied.

## 0. Instructions for the AI Builder (Antigravity)

- Build the whole project **from scratch**, in a clean folder, with a working frontend and a working backend.
- Work **in stages** and let the owner review each one: (1) project setup, folder structure and theme; (2) loading screen, navbar and Home; (3) remaining sections one by one; (4) backend, database models and authentication; (5) dashboards and admin panel; (6) payments, uploads and emails; (7) testing and polish.
- Keep all secrets (database URL, Razorpay keys, email credentials, Cloudinary keys) in a `.env` file. Never hardcode them, and add `.env` to `.gitignore`. Provide a `.env.example`.
- Seed the database with sample data (plans, trainers, equipment, events, gallery posts, transformation stories, one admin user) so the site looks complete from the first run.
- Write a README with setup steps, scripts, environment variables and how to run on Windows.
- Never copy text, names or branding from the reference sites (RK Fitness, Vortex). They are references for layout and effects only.

## 1. Project Overview

- **Project:** A 3D, responsive, unique gym management website for RV Fitness, Narsobawadi, built from scratch with a working backend.
- **Type:** A single-page public website with smooth scrolling, plus login, member, trainer and admin areas.
- **Goal:** Attract and convert visitors into members, and let the gym manage members, trainers, equipment, events, gallery posts, memberships and payments.
- **Development environment:** Windows laptop, VS Code, Node.js v24, Git, and a **local MongoDB** database (see Section 6).

## 2. Brand and Visual Design

- **Gym name:** RV Fitness, with the sub-label NARSOBAWADI.
- **Logo:** Circular gold-outlined logo with the RV mark and a dumbbell, used in the navbar, loading screen and favicon.
- **Theme:** Dark and premium. Black background, yellow/gold accent (around #FFC62A), white text, muted grey secondary text.
- **Typography:** Bold uppercase sans-serif headings (Inter-style) for the hero and buttons, and large bold uppercase headings for section titles. **(Assumption)** The About and Membership references use a serif heading style; the build may use it for section titles only.
- **Accent usage:** The reference sites use red accents. RV Fitness uses yellow in every place the references use red.
- **Section header pattern:** Small letter-spaced eyebrow label, large heading, short yellow underline or divider, and a one-line description.
- **Hover light effect (global rule):** Every tile and card has a soft yellow spotlight glow that follows the cursor inside the tile, a faint glowing border that brightens on hover, and a slight lift of a few pixels. On touch devices the glow appears on tap.
- **Buttons:** Primary buttons are yellow filled pills with dark text. Secondary buttons are outlined pills with white text. Primary buttons may carry an arrow icon.
- **Reference sites:** An RV Fitness home page screenshot (layout), a Vortex-style fluid cursor site (reveal effect), and RK Fitness screenshots (About, Why Choose, Transformation Success, Membership Tiers).

## 3. Global Behavior

### 3.1 Single-page structure

- The public site is **one page** with smooth, inertia-style scrolling (Lenis-style) and scroll-triggered animations (GSAP ScrollTrigger).
- Section scroll order **(Assumption)**: Home, About, Trainers, Equipment, Events, Gallery, Transformation Success, Membership, Contact. This follows the owner's navigation order, with the extra sections slotted in between.
- Clicking a navbar link smooth-scrolls to its section. The active link highlights as the user scrolls.
- The member success stories open as a full-screen overlay with its own URL, so they can be shared and the browser back button works **(Assumption)**.
- Login, register, forgot password and the dashboards (member, trainer, admin) are separate screens.

### 3.2 Navigation bar

- **Links shown (only these six):** Home, About, Trainers, Equipment, Membership, Contact.
- **Not shown in the top bar:** Events, Gallery, Transformation Success. They stay as sections on the page and are reached by scrolling or by in-page buttons (for example "View Gallery" on past events).
- **Left:** Logo with "RV FITNESS / NARSOBAWADI".
- **Right:** A "Login" text link and a yellow "Join Now" pill button.
- **Style:** Transparent over the hero with a thin bottom border. The active link is yellow with an underline.
- **Logo behavior:** The navbar logo stays hidden or merges until the big hero gym name finishes moving into the top-left corner (see Home).
- **Menu animation:** Animated navigation menu. On mobile, the six links open in an animated full-screen menu with smooth staggered link animation and open/close effects **(Assumption: full-screen overlay with staggered links)**.

### 3.3 Loading screen

- Shown the moment someone taps the website link to open it, and again every time the page is reloaded, before anything else is visible.
- Not a traditional spinner. It starts as a full-screen black cover with the RV Fitness logo centered, and the Home page is then revealed slowly from underneath it.
- **Animation:** The Home page is revealed gradually as loading progresses. The black cover lifts or wipes away slowly (for example from bottom to top, or from the center outward), so the Home hero appears piece by piece. A large, transparent (semi-transparent) counter runs from 0 to 100 over the screen in step with the reveal. The yellow logo outline can draw itself at the start. At 100 the cover is fully gone.
- **Exit:** At 100 the counter fades out, the cover is completely removed, and the Home hero animations (headline, gym name, buttons, bodybuilder image) start playing.
- The count follows real loading progress (hero image, fonts and 3D assets), with a minimum display time of about 1.5 seconds so it never flashes. The count and the reveal only move forward, never backwards. It plays on every open and every reload.
- With reduced-motion settings on, skip the slow wipe and use a simple fade, keeping the 0 to 100 counter.

### 3.4 Page transitions

- Smooth transitions between the public page, the success-story overlay and the login and dashboard screens.
- A thin yellow progress bar at the top shows route changes.
- The exact style is still to be chosen **(Assumption: curtain or slide transition)**.

### 3.5 Custom 404 page

- Same dark and yellow theme with a large "404" where the zeros are weight plates.
- Gym-style copy such as "Rep not found" or "You lifted too far, this page doesn't exist".
- A subtle animation such as a barbell dropping or a plate rolling across the screen.
- A "Back to Home" yellow button plus quick links to Membership and Contact.

### 3.6 Other custom loaders (gym themed)

- Buttons and form submits: a small spinning weight plate.
- Data loading (trainers, events, gallery, dashboards): skeleton cards with a yellow shimmer.
- Payment processing: a short "Processing your pass..." screen with an animated dumbbell.

### 3.7 Floating elements

- A floating green WhatsApp button at the bottom right on all pages, opening a chat with a pre-filled message.
- A "back to top" arrow after scrolling down **(Assumption)**.

### 3.8 Responsive design and performance

- Mobile-first and fully responsive for phones, tablets, laptops and large screens.
- Lighter or disabled 3D and fluid effects on low-end devices and on touch screens. Respect `prefers-reduced-motion`.
- Lazy-load 3D assets and images, compress models (GLB with Draco), optimize images.
- Semantic HTML, alt text, keyboard navigation, visible focus states and good color contrast.
- SEO basics: meta tags, Open Graph tags, sitemap.

## 4. Public Site Sections

### 4.1 Home

- Every visitor lands on the Home section first.
- **Layout:** Split hero. All text and buttons on the **left**, the bodybuilder image on the **right**. Text and image must **not overlap** (unlike the reference, where the headline runs over the photo).
- **Content (from the reference):**
  - Outlined pill badge: "RV FITNESS · NARSOBAWADI" with a small dot.
  - Headline: "BUILD YOUR" (white), "STRENGTH." (yellow), "DEFINE YOURSELF." (white).
  - Subtext: "Train with purpose. Transform with discipline."
  - Buttons: yellow "JOIN NOW →" and outlined "EXPLORE RV FITNESS".
  - Scroll indicator: "SCROLL" label with a small mouse icon at bottom center.
- **Gym name animation:** A large "RV FITNESS" wordmark with the logo appears **above** the headline. As the user scrolls down it slowly shrinks and moves to the **top-left corner**, settling into the navbar logo position like a shared-element transition. The name must never appear twice at the same time.
- **Cursor reveal effect:** The bodybuilder is shown **wearing clothes** at first. When the mouse hovers over him, a fluid, ink-like blob (as in the Vortex reference) follows the cursor and reveals the **shirtless** version underneath. The blob has organic wobbly edges and smooth trailing motion, and it shrinks and fades when the cursor leaves. Implementation idea: two stacked images with a WebGL fluid or noise-displacement mask (Three.js or OGL).
- **Touch fallback:** Touch-drag to reveal, or tap to toggle.
- **Image requirement:** The clothed image is created by the owner from the shirtless photo. Both images need the same size, pose and framing. A transparent-background cutout looks best on the right side, or the logo wall can be kept as the background. Still to be decided; use the supplied images as they are until then.
- **Optional 3D hero element:** A floating dumbbell or similar object **(Assumption)**.
- Animated counters for key stats (members, trainers, years) **(Assumption)**.

### 4.2 About

Based on two RK Fitness reference screenshots.

**Part 1: Intro block**

- Two columns. Text and tiles on the left, image collage on the right.
- Eyebrow with a short underline (for example "THE RV LIFESTYLE").
- Large bold uppercase heading (reference: "Redefining fitness standards in Delhi"), adapted to RV Fitness and Narsobawadi.
- Paragraph 1: larger text about the founder and mission, with the founder's name highlighted in yellow **(Placeholder: founder or owner name)**.
- Paragraph 2: smaller muted text about the facility.
- **Six feature tiles (3 by 2 grid)**, each with a colored icon: Premium Gear, CrossFit Arena, Steam Bath, Zumba & Dance, Community, Pro Coaches. Only keep facilities RV Fitness really offers **(Placeholder: confirm list)**.
- **Image collage:** Four rounded photos in two staggered columns, the right column offset lower, with varied sizes **(Placeholder: four real photos)**.
- **Animations:** Eyebrow, then heading line by line (masked slide-up), then paragraphs fade up, then tiles stagger in. Collage images reveal with a clip-path or scale-in, and the two columns move at different parallax speeds.

**Part 2: Why Choose RV Fitness**

- Centered header: eyebrow "DESIGNED FOR ELITE PERFORMANCE", heading "WHY CHOOSE RV FITNESS", accent divider and a subtitle.
- **Row 1, five tall cards** with a circular icon badge, title, description and a small colored tag at the bottom: Premium Equipment (Superior Engineering), Steam Bath (Ultimate Recovery), CrossFit Arena (Functional Power), Pro Trainers (Scientific Support), Group Classes (Pure Vitality).
- **Row 2, four smaller horizontal tiles** with an icon, a small caps label and a bold title: Custom Nutrition (Personal Nutrition Guidance), Trackable Progress (Body Recomposition Matrix), Secure Environment (Dedicated Women's Fitness), Body Transformation (Elite Transform Programs).
- Cards rise and fade in with a stagger on scroll. The hovered card gets the brighter border, spotlight and lift. Icons scale or rotate slightly on hover.

### 4.3 Trainers

- Trainers are listed **one under another** as full-width rows. Each row has the **photo on the left** and the **info on the right**, consistently on every row.
- Info: name, specialization, years of experience, certifications, star rating, availability (days and time slots), short bio, and a yellow **"Book Session"** button.
- Book Session opens a form or popup (date, time slot, goal, message). The member must be logged in. The request goes to the trainer's dashboard.
- Each row slides in on scroll (photo from the left, text from the right), with a subtle parallax or zoom on the photo.
- Mobile: photo on top, info below.
- Trainer data (number of trainers, photos, details) is **(Placeholder)**.

### 4.4 Equipment

- Page header with a title and short intro.
- **Category filter tabs:** All, Cardio, Strength, Free Weights, Functional. Switching tabs animates the grid with a smooth layout transition.
- **Equipment cards grid:** Machine image, name, category tag and a one-line description, with the cursor-following hover glow.
- **Click popup:** Clicking a card opens a modal covering about **75% of the screen** over a blurred, dimmed backdrop.
  - Left: large image, or a 3D model viewer (rotate and zoom) for selected machines.
  - Right: machine name, category, muscles worked, how to use it step by step, benefits, safety tips, and recommended sets and reps.
  - Close with an X button, the Esc key, or a backdrop click. Open and close use a scale-and-fade animation, and page scroll locks while open.
  - On mobile the popup becomes near full screen (a bottom sheet).
- 3D viewer: optional, using GLB models. Which machines get it, and whether real GLB files exist, is still to be decided **(Placeholder)**. Use a generic placeholder model until then.
- Equipment is managed from the admin panel (add, edit, delete, images, optional GLB model, status).

### 4.5 Events

- Toggle at the top: **Upcoming**, **Past**, **Calendar view**.
- **Featured event:** One large hero card for the next event with a live **countdown timer** (days, hours, minutes, seconds).
- **Event list:** A unique, non-standard layout with large visual cards, each having a cover photo, date badge, title, location, short description and a Register button. Layouts vary, for example alternating image sizes, overlapping date stamps and masonry-style cards. Each event includes **pictures**.
- **Registration:** A form or popup (name, phone, email) with seat limit and "spots left". Logged-in members can register in one click.
- **Past events:** Photo cards with a "View Gallery" link into the Gallery section.
- **Calendar view:** Month grid with event dots. Clicking a date shows that day's events.
- Admin can create, edit and delete events, upload photos and view the registrations list.

### 4.6 Gallery (social feed)

- Works like Facebook or Instagram.
- **Who can post:** Admin and trainers create posts with photos or videos, a caption and optional tags (category, event, trainer). Members cannot post.
- **Members** can like and comment, and optionally save and share **(Assumption)**.
- **Feed and grid:** Instagram-style grid of photos and videos with filter chips (All, Workouts, Events, Transformations, Facility, Videos).
- **Lightbox:** Clicking a post opens a lightbox with the media on one side and the post details on the other: author name and role badge, caption, time, like button with count, and the comment thread. Arrow keys and swipe move between posts.
- Double-click or double-tap to like, with a heart animation. Videos show a play icon, autoplay muted on hover, and play in the lightbox.
- **Rules:** Members must be logged in to like or comment. Logged-out visitors can only browse. Members can edit or delete their own comments. Admin and trainers can delete any comment and remove posts. A report button on posts and comments feeds an admin review queue.
- **Backend:** Posts, media, likes and comments with role checks on posting, media storage with size limits and compression, live or near-live like and comment counts, and infinite scroll or pagination.
- Whether members get notifications for likes and comments is still open.

### 4.7 Transformation Success

- **Header:** Eyebrow "OUR PROOF IS IN THE RESULTS", heading "TRANSFORMATION SUCCESS", a short accent underline and a description on the right.
- **Story cards (3-column grid, more below):**
  - One image split down the middle with a "BEFORE" label bottom-left (desaturated black and white) and a yellow "AFTER" badge bottom-right (full color). Optional draggable slider on hover **(Assumption)**.
  - Below the image: program title (Body Recomposition, Muscle Mass Builder, Weight Loss and so on), a result pill such as "-14 kg Fat Loss", a short quote, and the member's avatar initials, name and "Member since" date.
  - Hover glow and lift as everywhere else.
- **Click opens a new page** with the member's journey, as a full-screen overlay with its own URL such as `/transformations/member-name`:
  - Hero with the large before and after, member name and goal.
  - Timeline of the journey (starting point, challenges, milestones by month).
  - Stats (weight, body fat, duration).
  - The workout and diet approach used and the trainer who guided them.
  - A full testimonial and a progress photo gallery.
  - "Next story" and "Start your transformation" buttons.
- The card image expands into the story hero during the transition.
- Admin adds, edits and publishes stories, with a consent checkbox for using members' photos.

### 4.8 Membership

Based on the RK Fitness "Membership Tiers" reference.

- **Header:** Eyebrow "SELECT YOUR TIER OF EXCELLENCE", heading "MEMBERSHIP TIERS", an accent divider and a subtitle.
- **Four tier cards:** Each has a tier label (reference: Bronze, Silver, Gold VIP, Titanium Elite), plan name, short description, large price with "/month", and a checklist with ticks for included features and faded crosses for excluded ones.
- The third card is raised with a glowing yellow border and a **"HIGHLY RECOMMENDED"** badge. The top-tier card has a premium gold glow. Each card has a "Choose Plan" button and the hover glow.
- **Duration toggle:** Monthly, Quarterly, Yearly, with prices animating on change and a "Save X%" tag on longer plans.
- **Comparison table:** All features against all plans, with sticky headers and horizontal scroll on mobile.
- **Promo code field:** Apply a code, see the discount line update live, and show an error for invalid or expired codes.
- **Purchase flow:**
  1. Choose plan and duration.
  2. Log in or register (skipped when already logged in).
  3. Review the order summary and apply a promo code.
  4. Pay online with Razorpay (UPI, cards, net banking), in test mode first.
  5. Success screen, a PDF invoice by email, and the membership activated in the member dashboard with start and expiry dates.
- **Plan names, features and prices are placeholders** (the reference shows 2,499, 3,499, 4,999 and 14,999 rupees per month). Real RV Fitness plans and prices are needed **(Placeholder)**.

### 4.9 Contact

- **Contact form:** Name, phone, email, interest (membership, trainer, free trial, other) and message. It saves to the admin enquiry inbox and emails a notification, with validation and spam protection.
- **Map embed:** Google Map pinned to RV Fitness, Narsobawadi, with a "Get Directions" button.
- **Working hours:** A tile with the weekly timings, today's row highlighted, and an "Open now / Closed" status.
- **WhatsApp:** The floating button plus a button in this section.
- **Social links:** Instagram, Facebook, YouTube and others as animated icons.
- **Info tiles:** Phone, email and address with the glow hover, with tap to call or email on mobile.
- Address, phone, email, hours and social handles are needed **(Placeholder)**.

## 5. Backend and Management System

The owner asked for a working backend. The items below were suggested earlier and are **(Assumption)** until confirmed, except where tied to a stated feature above.

### 5.1 Authentication and roles

- Roles: **Admin**, **Trainer**, **Member** (optionally Receptionist).
- JWT or session authentication, password hashing, email verification, forgot and reset password, login and register screens.

### 5.2 Member dashboard

- Profile and photo, active plan and expiry date, renewal and upgrade.
- Attendance history, workout and diet plans assigned by a trainer.
- Payment history and invoices.
- Progress tracking (weight, measurements, charts).
- Trainer session bookings, event registrations and notifications.

### 5.3 Trainer dashboard

- Assigned members, schedule and session requests (from "Book Session").
- Create workout and diet plans and record member progress.
- Create gallery posts and manage comments on them.

### 5.4 Admin panel

- Member management with filters for active, expired and expiring soon.
- Membership plan and promo code management.
- Trainer, equipment, event, gallery and transformation story management.
- Event registrations, enquiry inbox from the contact form, and gallery report review queue.
- Payments and revenue reports, attendance tracking (manual or QR check-in), analytics dashboard (revenue, new members, churn, peak hours), announcements and role permissions.

### 5.5 Core system functions

- Razorpay online payments with UPI support, and automatic PDF invoices and receipts.
- Email and SMS or WhatsApp reminders for expiring memberships.
- Membership freeze, pause or transfer, referral and coupon system.
- Equipment maintenance log, locker and branch management if needed.
- Search, filters and pagination across lists.

### 5.6 Main data collections

Users, roles, plans, memberships, payments, promo codes, attendance, trainers, bookings, equipment, events, event registrations, gallery posts, media, likes, comments, reports, transformation stories, enquiries and notifications.

### 5.7 Security

Input validation, rate limiting, CORS, HTTPS in production, protection against injection and XSS, role-based access checks on every protected action, secure file upload limits.

## 6. Technical Stack and Environment

- **Frontend (Assumption):** Next.js (React), Tailwind CSS, Three.js with React Three Fiber, GSAP with ScrollTrigger, Framer Motion, Lenis for smooth scrolling.
- **Backend (Assumption):** Node.js with Express, or Next.js API routes.
- **Database (confirmed by owner):** **MongoDB running locally** on the owner's Windows laptop, with Mongoose as the ODM. Connection string for development: `mongodb://127.0.0.1:27017/rvfitness`, read from the `MONGODB_URI` variable in `.env`. The code must also work unchanged with a hosted MongoDB Atlas URI later.
- **Extras (Assumption):** Razorpay (test mode first), Nodemailer for email, Cloudinary for images and video. Local disk storage for uploads is acceptable during development.
- **Machine:** Windows laptop, VS Code, Node.js v24, Git. If a package fails on Node 24, tell the owner to switch to Node 22 LTS.
- **Deployment (later):** Environment variables, hosted database (MongoDB Atlas), deployed frontend and backend.

## 7. Content and Assets Needed From the Owner

- Founder or owner name for the About text, if it should appear.
- The real list of facilities (steam bath, CrossFit, Zumba, women's fitness and others).
- Four About collage photos, hero bodybuilder photos (shirtless and the clothed version) and the decision on cutout versus logo wall.
- Trainer details and photos, equipment list with photos and optional GLB 3D models.
- Event details and photos, gallery media and member transformation stories with consent for photos.
- Real membership plans, prices and promo codes.
- Address, phone, email, working hours and social media links.
- Logo files, including a vector version for the loading screen.

## 8. Open Questions

1. Should the page scroll in the order given in Section 3.1?
2. Is the success-story overlay with its own URL acceptable for the "new page" requirement?
3. Navigation menu style and page transition style.
4. Any extra 3D elements beyond the home hero and the equipment viewer.
5. Dashboard changes, and whether the suggested stack is accepted.
6. Whether members get notifications for gallery likes and comments.
7. One branch or multiple branches.

## 9. Build Notes

- Build in the stages listed in Section 0, and pause for the owner's review after each stage.
- Where an item is marked Assumption, use the suggested default. Where it is marked Placeholder, use clearly labeled sample data and make it easy to replace from the admin panel.
