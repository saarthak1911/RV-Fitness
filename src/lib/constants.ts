export const BRAND = {
  name: 'RV FITNESS',
  subtitle: 'NARSOBAWADI',
  tagline: 'Train with purpose. Transform with discipline.',
  headline: {
    line1: 'BUILD YOUR',
    line2: 'STRENGTH.',
    line3: 'DEFINE YOURSELF.',
  },
  colors: {
    primary: '#FFC62A', // RV Gold / Yellow accent
    primaryHover: '#E5AD19',
    primaryGlow: 'rgba(255, 198, 42, 0.25)',
    bgDark: '#080808',
    cardDark: '#121212',
    borderDark: '#222222',
    borderGlow: 'rgba(255, 198, 42, 0.4)',
  },
  contact: {
    location: 'Near Datta Mandir, Narsobawadi, Maharashtra 416104',
    phone: '+91 98765 43210',
    email: 'contact@rvfitness.local',
    whatsapp: '919876543210',
    hours: 'Mon - Sat: 5:30 AM - 10:00 PM | Sun: 6:00 AM - 1:00 PM',
  },
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Equipment', href: '#equipment' },
  { name: 'Membership', href: '#membership' },
  { name: 'Contact', href: '#contact' },
] as const;

export const STAGES = [
  {
    id: 1,
    title: 'Stage 1: Project Setup, Structure & Theme',
    status: 'Ready for Review',
    description: 'Foundational Next.js 15, Tailwind v4 theme, gold accent system, folder architecture, MongoDB connection and interactive UI showcase.',
  },
  {
    id: 2,
    title: 'Stage 2: Loading Screen, Navbar & Home Hero',
    status: 'Awaiting Stage 1 Approval',
    description: 'Gym logo loading counter (0-100), dynamic shrinking wordmark navbar, split hero with ink-reveal bodybuilder effect.',
  },
  {
    id: 3,
    title: 'Stage 3: Public Sections',
    status: 'Upcoming',
    description: 'About RV, Trainers full-width cards, Equipment 3D viewer & modal, Events countdown, Gallery social feed, Transformations overlay, Membership tiers & Contact.',
  },
  {
    id: 4,
    title: 'Stage 4: Backend, Database Models & Auth',
    status: 'Upcoming',
    description: 'Mongoose schemas, JWT authentication, role guards (Member, Trainer, Admin), database seeding.',
  },
  {
    id: 5,
    title: 'Stage 5: Dashboards & Admin Panel',
    status: 'Upcoming',
    description: 'Member workout/diet tracker, Trainer booking schedule, Admin management with revenue and member reports.',
  },
  {
    id: 6,
    title: 'Stage 6: Payments, Uploads & Notifications',
    status: 'Upcoming',
    description: 'Razorpay UPI/Card checkout, automated PDF invoices, Nodemailer alerts and Cloudinary/local media.',
  },
  {
    id: 7,
    title: 'Stage 7: Polish & End-to-End Testing',
    status: 'Upcoming',
    description: 'Performance optimization, accessibility, Lenis inertia scrolling tuning, responsive QA.',
  },
] as const;
