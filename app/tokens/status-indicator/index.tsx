import ThunderStatusSVGIcon from '@/assets/icons/thunder-status'
import { SensorStatus, SensorType } from '@/enums/business'
import { StatusIndicatorProps } from './types'
import { StatusStyled } from './styles'

function StatusIndicator({ status, type }: StatusIndicatorProps) {
  if (type === SensorType.ENERGY) {
    return (<ThunderStatusSVGIcon />)
  }

  return (
    <StatusStyled $status={status ?? SensorStatus.OPERATING} />
  )
}

export default StatusIndicator
