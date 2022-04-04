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

const style = {
  header: {
    height: '60px',
  },
  borderRadius: {
    halfRounded: '20px 20px 0px 0px',
    rounded: '20px',
    circular: '10em',
  },
};

const lightThemeColors = {
  white: '#FFFFFF',
  black: '#282828',
  gray: '#D5D8DB',
  gray2: '#718096',
  lightGray: '#f1f1f1',
  darkGray: '#718096',
  backgroundGray: '#F8F8F8',
  primaryYellow: '#FADE86',
  blue: '#6E6BF0',
  red: '#F06B6B',
  lightBlue: '#CCE5FC',
  lightPink: '#F6CAF2',
  orange: '#F29E3B',
  lightGreen: '#D9F3C0',
  alertGreen: '#01B671',
  placeholder: '#D5D8DB',
  disabled: '#F8F8F8',
  overlap: 'rgba(0, 0, 0, 0.4)',
};

const darkThemeColors = {
  white: '#282828',
  black: '#E0E0E0',
  gray: '#1D1D1D',
  gray2: '#718096',
  lightGray: '#222222',
  darkGray: '#EAECF0',
  backgroundGray: '#1c1c1c',
  primaryYellow: '#FADE86',
  blue: '#6E6BF0',
  red: '#F06B6B',
  lightBlue: '#F2D9AE',
  lightPink: '#DAFCCC',
  orange: '#3BB7EB',
  lightGreen: '#DC3AF2',
  placeholder: '#616264',
  disabled: '#464545',
  overlap: 'rgba(255, 255, 255, 0.4)',
};

const defaultTheme = {
  fontSizes,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  style,
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
