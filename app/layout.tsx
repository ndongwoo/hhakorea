// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css'; // styles/globals.css를 사용하도록 경로 수정
import SectionContainer from './components/SectionContainer';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hhakorea Blog',
  description: 'A blog by Hhakorea',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <SectionContainer>
          <div className="flex h-screen flex-col justify-between font-sans">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </SectionContainer>
      </body>
    </html>
  );
}