import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Royston Lynxx - Premium Airport Transfers & Private Hire',
  description: 'Book reliable, fixed-price airport transfers and private hire taxis to and from London airports, Southampton, and nationwide. 24/7 service, meet & greet, and free flight tracking.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-dark-bg text-zinc-100" suppressHydrationWarning>
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
