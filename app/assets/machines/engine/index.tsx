import Image from 'next/image'
import EngineAssetWEBP from './engine.webp'
import { EngineAssetComponentProps } from './types'

const EngineAssetComponent: React.FC<EngineAssetComponentProps> = ({ width, height }) => {
  return (
    <Image
      src={EngineAssetWEBP}
      alt="Engine image illustration"
      width={width}
      height={height}
    />
  )
}

export default EngineAssetComponent
