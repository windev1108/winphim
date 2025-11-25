'use client';
import { Icons } from '@/assets/icons';
import { AnimatePresence, type Variants, motion } from 'motion/react';
import { type PropsWithChildren, useEffect, useState } from 'react';

const slideVariants = {
  initial: { opacity: 100, y: 0 },
  exit: { opacity: 0, y: '-100vh' },
};

const logoVariants: Variants = {
  initial: { scale: 0.7, y: -15, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { scale: 0.5, y: 10, opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

export default function Preloader({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <motion.div
          key='preloader'
          variants={slideVariants}
          initial='initial'
          exit='exit'
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className='fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-secondary-800 will-change-transform'
          style={{ translateZ: 0 }}
        >
          <motion.div variants={logoVariants} initial='initial' animate='animate' exit='exit'>
            <Icons.logo className='text-brand-700' />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div key='content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
