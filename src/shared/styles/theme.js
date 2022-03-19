const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  tabletL: '1024px',
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const lightThemeColors = {
  black: '#282828',
  lightGray: '#E5E5E5',
  backgroundGray: '#F8F8F8',
  gray: '#D5D8DB',
  darkGray: '#718096',
  white: '#FFFFFF',
  primaryYellow: '#FADE86',
  blue: '#6E6BF0',
  lightBlue: '#CCE5FC',
  lightPink: '#F6CAF2',
  orange: '#F29E3B',
  lightGreen: '#BFEA94',
};

const darkThemeColors = {
  black: '#E0E0E0',
  lightGray: '#222222',
  gray: '#1D1D1D',
  darkGray: '#EAECF0',
  white: '#000000',
  primaryYellow: '#FADE86',
  blue: '#6E6BF0',
  lightBlue: '#F2D9AE',
  lightPink: '#DAFCCC',
  orange: '#3BB7EB',
  lightGreen: '#DC3AF2',
};

const defaultTheme = {
  fontSizes,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
};

export const darkTheme = {
  ...defaultTheme,
  colors: darkThemeColors,
};

export const lightTheme = {
  ...defaultTheme,
  colors: lightThemeColors,
};
