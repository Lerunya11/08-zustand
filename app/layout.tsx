import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes app with Next.js routing',
};

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode; 
};

const RootLayout = ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
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
