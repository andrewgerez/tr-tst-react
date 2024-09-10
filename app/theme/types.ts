type NeutralColors = {
  white: string
  gray150: string
  gray200: string
  gray500: string
  gray600: string
  gray950: string
}

type PrimaryColors = {
  blue500: string
  blue900: string
  blue950: string
}

type UtilityColors = {
  placeholder: string
  caption: string
  green: string
  red: string
}

type Palette = {
  neutral: NeutralColors
  primary: PrimaryColors
  utility: UtilityColors
}

type Font = {
  primary: string
  secondary: string
}

type FontSizes = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

type FontWeight = {
  regular: string
  medium: string
}

type LineHeight = {
  sm: string
  md: string
  lg: string
  xl: string
  x2l: string
}

type BorderRadius = {
  xs: string
  sm: string
  md: string
}

type BorderWidth = {
  default: number
}

type Spacing = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  x2l: string
  x3l: string
  x4l: string
}

export type BaseTheme = {
  fonts: Font
  fontSizes: FontSizes
  fontWeights: FontWeight
  lineHeights: LineHeight
  borderRadius: BorderRadius
  borderWidths: BorderWidth
  spacing: Spacing
}

export interface AppTheme extends BaseTheme {
  palette: Palette
}
