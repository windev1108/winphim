import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

import logo from './svg/logo.svg';
import logoMb from './svg/logo-mb.svg';
import rank1 from './svg/rank-1.svg';
import rank2 from './svg/rank-2.svg';
import rank3 from './svg/rank-3.svg';
import eighteenPlus from './svg/eighteen-plus.svg';
import interactLogo from './svg/Interact-logo.svg';
import jetonbankLogo from './svg/jetonbank-logo.svg';
import mastercard from './svg/mastercard.svg';
import astropay from './svg/astropay.svg';
import visa from './svg/visa.svg';
import ssl from './svg/ssl.svg';
import burger from './svg/burger.svg';
import arrowDropDown from './svg/arrow_drop_down.svg';

const IconList = {
  logo,
  logoMb,
  rank1,
  rank2,
  rank3,
  eighteenPlus,
  interactLogo,
  jetonbankLogo,
  mastercard,
  visa,
  ssl,
  astropay,
  burger,
  arrowDropDown
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type Icon = ForwardRefExoticComponent<IconProps>;

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
