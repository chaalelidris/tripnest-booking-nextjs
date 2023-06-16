import { Nunito } from 'next/font/google';
import './globals.css';
import "../styles/index.scss"

import ToastProvider from '@/app/providers/ToasterProvider';
import getCurrentUser from '@/app/functions/getCurrentUser';


/* Components */
import Navbar from '@/app/components/navbar/Navbar';
import Provider from '@/app/components/Provider';
import RentModal from '@/app/components/modals/RentModal';
import LoginModal from '@/app/components/modals/LoginModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import Banner from './components/Banner';
import PreferencesModal from './components/modals/PreferencesModal';
import EditRentModal from './components/modals/EditRentModal';


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
        <Provider>
          <Banner />
          <Navbar currentUser={currentUser} />
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <EditRentModal />
          {currentUser && <PreferencesModal currentUser={currentUser} />}
          <SearchModal />
          <div className='relative isolate pb-20'>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
