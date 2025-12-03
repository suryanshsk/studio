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

export const metadata: Metadata = {
  title: 'Avanish.AI',
  description: 'Agentic & Multimodal AI Engineer · Full Stack Web Developer · Content Creator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Next.js will automatically use the favicon.ico file in the public directory. */}
      </head>
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
