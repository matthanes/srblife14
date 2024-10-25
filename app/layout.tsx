import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Rock_Salt, Poppins, Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import NewNavbar from '@/components/NewNavbar/NewNavbar';
import Footer from '@/components/Footer/Footer';

const poppins = Poppins({
  weight: ['400', '500', '700', '900', '600', '800'],
  subsets: ['latin'],
  display: 'swap',
});
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});
const robotoMono = Roboto_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const rockSalt = Rock_Salt({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Schomburg Road Baptist Church Columbus, Georgia',
  description:
    'Loving Him, loving them, changing lives! That is our purpose at Schomburg Road Baptist Church in Columbus, Georgia. Everything we do is driven from these six short words. By understanding this statement you will better understand who we are.',
  keywords: 'church, family-friendly, baptist, small, kids, nursery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <NewNavbar />
        {children}
        <Footer />
      </body>
      {process.env.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}
