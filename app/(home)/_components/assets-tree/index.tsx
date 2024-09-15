import React, { useState } from 'react'
import Divider from '@/tokens/divider'
import Input from '@/tokens/input'
import useGetCompanyTree from '@/hooks/http/use-get-company-tree'
import { ArrowIcon, SearchIcon, TreeAssetIcon, TreeComponentIcon, TreeLocationIcon } from '@/assets'
import { Asset, LocationWithAssets } from '@/types/endpoints/get-company-tree'
import { ListContainer, InputWrapper, TreeContainer, ExpandIcon, NodeLabel, NodeContent, TreeNode, AssetContainer, AssetItem } from './styles'
import { SensorStatus, SensorType, TreeElementType } from '@/enums/business'
import StatusIndicator from '@/tokens/status-indicator'

const Tree = ({ data }: { data: LocationWithAssets[] | undefined }) => {
  return (
    <TreeContainer>
      {data?.map((node, index) => (
        <TreeNodeComponent key={index} node={node} />
      ))}
    </TreeContainer>
  )
}

const TreeNodeComponent = ({ node }: { node: LocationWithAssets }) => {
  const [isOpen, setIsOpen] = useState(false)

  const hasChildren = node.children && node.children.length > 0
  const hasAssets = node.assets && node.assets.length > 0

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const renderIcon = (node: LocationWithAssets | Asset) => {
    if (node.type === TreeElementType.LOCATION) {
      return <TreeLocationIcon />
    } else if (node.type === TreeElementType.ASSET) {
      console.log('node-asset', node.name)
      return <TreeAssetIcon />
    } else {
      console.log('node-component', node.type)
      return <TreeComponentIcon />
    }
  }

  return (
    <TreeNode>
      <NodeContent>
        {(hasChildren || hasAssets) && (
          <ExpandIcon onClick={handleToggle} $isOpen={isOpen}>
            <ArrowIcon />
          </ExpandIcon>
        )}
        <NodeLabel>
          {renderIcon(node)}
          <h3>{node.name}</h3>
        </NodeLabel>
      </NodeContent>

      {isOpen && (
        <>
          {hasAssets && (
            <AssetContainer>
              {node.assets.map((asset) => (
                <AssetItem key={asset.id}>
                  {renderIcon(asset)}
                  <h3>{asset.name}</h3>
                  {asset.type === TreeElementType.COMPONENT &&
                    <StatusIndicator status={asset.status as SensorStatus} type={asset.sensorType as SensorType} />
                  }
                </AssetItem>
              ))}
            </AssetContainer>
          )}

          {hasChildren && (
            <Tree data={node.children} />
          )}
        </>
      )}
    </TreeNode>
  )
}

function AssetsTree() {
  const { data: tree } = useGetCompanyTree("662fd0fab3fd5656edb39af5")

  return (
    <ListContainer>
      <InputWrapper>
        <Input type='text' placeholder='Buscar Ativo ou Local' />
        <SearchIcon />
      </InputWrapper>

      <Divider />

      <Tree data={tree} />
    </ListContainer>
  )
}

export default AssetsTree
