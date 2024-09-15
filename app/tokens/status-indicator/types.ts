import { SensorStatus, SensorType } from '@/enums/business'

export type StatusIndicatorProps = {
  status: SensorStatus
  type?: SensorType
}

export type StyledStatusIndicatorProps = {
 $status: SensorStatus
}
