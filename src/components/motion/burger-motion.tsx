import type { FC } from 'react';
import React from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface Props {
  isActive: boolean;
  className?: string
}

const BurgerMotion: FC<Props> = ({ isActive, className, ...props }) => {
  return (
    <motion.div
      className={cn('flex h-5 w-6 cursor-pointer flex-col justify-center gap-1.5', className)}
      {...props}
    >
      {/* Top line */}
      <motion.span
        className="bg-white/90 h-0.5 w-full rounded-full origin-center"
        initial={false}
        animate={{
          rotate: isActive ? 45 : 0,
          translateY: isActive ? 8 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Middle line */}
      <motion.span
        className="bg-white/90 h-0.5 w-full rounded-full origin-center"
        initial={false}
        animate={{
          opacity: isActive ? 0 : 1,
          scaleX: isActive ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Bottom line */}
      <motion.span
        className="bg-white/90 h-0.5 w-[70%] rounded-full origin-center"
        initial={false}
        animate={{
          rotate: isActive ? -45 : 0,
          translateY: isActive ? -8 : 0,
          width: isActive ? '100%' : '70%',
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </motion.div>
  );
};

export default BurgerMotion;