import { SensorStatus, SensorType } from '@/enums/business'

export type StatusIndicatorProps = {
  status: SensorStatus | null
  type?: SensorType | null
}

export type StyledStatusIndicatorProps = {
 $status: SensorStatus
}
