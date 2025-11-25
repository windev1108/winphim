import { type ReactNode } from 'react';
import { Lenis } from '../lenis';
import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='flex min-h-screen flex-col' >
        <Header />
        <main data-testid='main-content' className='flex grow flex-col overflow-clip xl:pb-20 pb-10'>
          {children}
        </main>
        <Footer />
      </div>
      <Lenis root options={{}} />
    </>
  );
};

export default MainLayout;
