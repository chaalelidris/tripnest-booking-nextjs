import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './functions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import GoogleAnalytics from './components/GoogleAnalytics';

export const metadata = {
  title: 'Tripnest',
  description: 'Tripnest booking your trip home',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID!} />
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        <ToastProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}
