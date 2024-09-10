import { ComponentSize, ComponentVariant } from '@/enums'

type Variant = ComponentVariant.PRIMARY | ComponentVariant.SECONDARY
type Size = ComponentSize.SMALL | ComponentSize.DEFAULT

export type TokenButtonProps = {
  variant: Variant
  size: Size
  children?: React.ReactNode
  isActive?: boolean
}

export type StyledButtonProps = {
  $variant: Variant
  $size: Size
  $isActive: boolean
}
