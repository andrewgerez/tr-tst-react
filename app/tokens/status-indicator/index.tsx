import ThunderStatusSVGIcon from '@/assets/icons/thunder-status'
import { SensorType } from '@/enums/business'
import { StatusStyled } from './styles'
import { StatusIndicatorProps } from './types'

function StatusIndicator({ status, type }: StatusIndicatorProps) {
  if (type === SensorType.ENERGY) {
    return (<ThunderStatusSVGIcon />)
  }

  return (
    <StatusStyled $status={status} />
  )
}

export default StatusIndicator
