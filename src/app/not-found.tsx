import FuzzyText from '@/components/reactbit/FuzzyText';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Page not found - ${siteConfig.name}`,
};

export default function NotFound({ isFullHeight = true }: { isFullHeight?: boolean }) {
  return (
    <div className={`container flex h-full grow flex-col gap-2  items-center justify-center ${isFullHeight && 'min-h-screen'}`}>
      <FuzzyText
        baseIntensity={0.2}
        enableHover={true}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        enableHover={true}
        fontSize={30}
      >
        Not found
      </FuzzyText>
    </div>
  );
}
