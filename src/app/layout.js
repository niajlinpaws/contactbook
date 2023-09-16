import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Contact Book',
  description: 'Jain Community (Jaipur) Contact Book',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    shrinkToFit: 0,
    userScalable: 0,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
