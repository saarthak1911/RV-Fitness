import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'RV Fitness · Narsobawadi | 3D Premium Gym & Fitness Center',
  description:
    'RV Fitness in Narsobawadi. Train with purpose, transform with discipline. Premium equipment, steam bath, CrossFit arena, certified pro coaches, and elite transformation programs.',
  keywords: [
    'RV Fitness',
    'Narsobawadi Gym',
    'Fitness Center Narsobawadi',
    'Bodybuilding',
    'CrossFit Arena',
    'Personal Training',
    'Gym Membership',
  ],
  authors: [{ name: 'RV Fitness' }],
  icons: {
    icon: '/logo/rv-logo.svg',
    apple: '/logo/rv-logo.svg',
  },
  openGraph: {
    title: 'RV Fitness · Narsobawadi | Build Your Strength',
    description: 'Premier fitness hub in Narsobawadi with state-of-the-art gear and expert coaching.',
    url: 'https://rvfitness.local',
    siteName: 'RV Fitness',
    images: [
      {
        url: '/logo/rv-logo.svg',
        width: 800,
        height: 800,
        alt: 'RV Fitness Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#080808] text-white selection:bg-[#FFC62A] selection:text-black antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
