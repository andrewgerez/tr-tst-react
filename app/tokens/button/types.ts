import { ComponentSize, ComponentVariant } from '@/enums'

type Variant = ComponentVariant.PRIMARY | ComponentVariant.SECONDARY
type Size = ComponentSize.SMALL | ComponentSize.DEFAULT

export type TokenButtonProps = {
  id?: string
  variant: Variant
  size: Size
  children?: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

export type StyledButtonProps = {
  $variant: Variant
  $size: Size
  $isActive: boolean
}
