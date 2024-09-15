import { ThunderIcon } from '@/assets'
import { CustomSVGProps } from '@/assets/icons/types'
import { SensorFilter } from '@/enums/business'
import { FC } from 'react'

/**
 * Array of filter objects used in the application.
 * Each filter object contains an id, icon, and label.
 *
 * @type {Array<{ id: SensorFilter, icon: React.ComponentType, label: string }>}
 */
export const filters: Array<{ id: SensorFilter; icon: FC<CustomSVGProps>; label: string; }> = [
  {
    id: SensorFilter.ENERGY_SENSOR,
    icon: ThunderIcon,
    label: 'Sensor de Energia'
  },
  {
    id: SensorFilter.CRITICAL,
    icon: ThunderIcon,
    label: 'Crítico'
  }
]
