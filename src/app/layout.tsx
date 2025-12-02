import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/ui/custom-cursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

const faviconUrl = 'https://instagram.fdel3-4.fna.fbcdn.net/v/t51.2885-19/499791407_18356727838194438_4860837939287100456_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel3-4.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QFjv8I--X8XK1X-fafYE7RNaKOXRVnbReeXo1DOqykepCQPVzDsqf40RZPBi8daxr1ZHjPAO-iDj1aI9iGxpKc_&_nc_ohc=zW9U4qSpvWYQ7kNvwEnJ_ds&_nc_gid=8urt1d8Xev56-4iMf1GKVw&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AfmwyZPDZKdfF7_Xp1Bcv__fqWmUrEps-qWowsoNm-B2GA&oe=69355721&_nc_sid=22de04';

export const metadata: Metadata = {
  title: 'Avanish.AI',
  description: 'Agentic &amp; Multimodal AI Engineer · Full Stack Web Developer · Content Creator',
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans',
          inter.variable,
          spaceGrotesk.variable,
          sourceCodePro.variable
        )}
      >
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
