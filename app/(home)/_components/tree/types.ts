import {
  ExtendedCompanyAsset,
  FullCompanyTreeReturn,
  LocationWithAssets
} from '@/types/endpoints/get-company-tree'

export type TreeProps = {
  data: FullCompanyTreeReturn
}

export type VirtualizedItemParams = {
  $virtualWidth: number
  $virtualHeight: number
  $virtualLeft: number
  $virtualTranslate: number
}

export type VirtualTreeNode = {
  depth: number
  node: LocationWithAssets | ExtendedCompanyAsset
}

export type VisibleNodes = VirtualTreeNode[]
