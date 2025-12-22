import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
const OG_IMAGE = 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes app with Next.js routing',
  openGraph: {
    title: 'NoteHub',
    description: 'Notes app with Next.js routing',
    url: APP_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const RootLayout = ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
