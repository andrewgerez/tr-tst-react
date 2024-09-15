import { ComponentVariant } from "@/enums"

export type CustomSVGProps = React.SVGProps<SVGSVGElement> & {
  $variant: ComponentVariant
  $isActive: boolean
}
