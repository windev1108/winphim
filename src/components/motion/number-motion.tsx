'use client';

import NumberFlow from '@number-flow/react';
import React, { memo, useEffect, useState } from 'react';

interface NumberMotionProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  precision?: number;
  compact?: boolean;
  locale?: string;

  jitterMode?: 'percent' | 'value';
  range?: number;
  jitterValue?: number;
  interval?: number;
  enableJump?: boolean;

  min?: number;
  max?: number;
  integerOnly?: boolean;
  enableFormat?: boolean;

  showDecimal?: boolean; // NEW OPTION
}

const NumberMotion: React.FC<NumberMotionProps> = ({
  value,
  suffix = '',
  prefix = '',
  className,
  precision = 2,
  compact = true,
  locale = 'en-US',

  jitterMode = 'percent',
  range = 0.02,
  jitterValue = 5,
  interval = 5000,
  enableJump = true,

  min,
  max,
  integerOnly = false,
  enableFormat = true,

  showDecimal = true, // NEW default=true
}) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  useEffect(() => {
    if (!enableJump) return;

    const id = setInterval(() => {
      let newValue = value;

      if (jitterMode === 'percent') {
        const percentOffset = (Math.random() * 2 - 1) * range;
        newValue = value * (1 + percentOffset);
      }

      if (jitterMode === 'value') {
        const offset = (Math.random() * 2 - 1) * jitterValue;
        newValue = value + offset;
      }

      if (integerOnly) newValue = Math.round(newValue);

      if (typeof min === 'number' && newValue < min) newValue = min;
      if (typeof max === 'number' && newValue > max) newValue = max;

      setAnimatedValue(newValue);
    }, interval);

    return () => clearInterval(id);
  }, [value, jitterMode, range, jitterValue, interval, integerOnly, min, max, enableJump]);

  return (
    <NumberFlow
      className={className}
      value={enableJump ? animatedValue : value}
      format={
        enableFormat
          ? {
            style: 'decimal',
            notation: compact ? 'compact' : 'standard',
            minimumFractionDigits: !showDecimal
              ? 0
              : compact
                ? 0
                : precision,
            maximumFractionDigits: !showDecimal ? 0 : precision,
          }
          : undefined
      }
      prefix={prefix}
      suffix={suffix}
      locales={locale}
    />
  );
};

export default memo(NumberMotion);
