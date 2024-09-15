import StatusIndicator from '@/tokens/status-indicator'
import useDashboardStore from '@/store/dashboard'
import { TreeLocationIcon, TreeAssetIcon, TreeComponentIcon, ArrowIcon } from '@/assets'
import { TreeElementType } from '@/enums/business'
import { LocationWithAssets, ExtendedCompanyAsset, Asset } from '@/types/endpoints/get-company-tree'
import { isIsolatedComponent, isExtendedCompanyAsset, isAsset } from '@/utils/business/tree-helper'
import { useState } from 'react'
import { TreeProps } from './types'
import { TreeNode, NodeContent, ExpandIcon, NodeLabel, AssetContainer, TreeContainer, ComponentItem } from './styles'

const TreeNodeComponent = ({
  node,
  currentAssetActive,
  handleAssetClick
}: {
  node: LocationWithAssets | ExtendedCompanyAsset,
  currentAssetActive: Asset | null,
  handleAssetClick: (asset: ExtendedCompanyAsset) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const hasChildren = 'children' in node && node.children && node.children.length > 0
  const hasAssets = 'assets' in node && node.assets && node.assets.length > 0
  const hasSubAssets = 'subAssets' in node && node.subAssets && node.subAssets.length > 0
  const isolatedComponent = isIsolatedComponent(node)
  const nodeElement = isolatedComponent ? node.components?.[0] : node

  if (!nodeElement) return null

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const renderIcon = (node: LocationWithAssets | ExtendedCompanyAsset) => {
    if (node.type === TreeElementType.LOCATION) {
      return <TreeLocationIcon />
    } else if (node.type === TreeElementType.ASSET) {
      return <TreeAssetIcon />
    } else {
      return <TreeComponentIcon />
    }
  }

  return (
    <TreeNode>
      <NodeContent>
        {(hasChildren || hasAssets || hasSubAssets) && (
          <ExpandIcon onClick={handleToggle} $isOpen={isOpen}>
            <ArrowIcon />
          </ExpandIcon>
        )}
        {nodeElement.type === TreeElementType.COMPONENT ? (
          <ComponentItem
            isActive={currentAssetActive?.id === nodeElement.id}
            onClick={() => handleAssetClick(nodeElement as ExtendedCompanyAsset)}
          >
            {renderIcon(nodeElement)}
            <h3>{nodeElement.name}</h3>
            {isExtendedCompanyAsset(nodeElement) &&
              <StatusIndicator status={nodeElement.status} type={nodeElement.sensorType} />
            }
          </ComponentItem>
        ) : (
          <NodeLabel>
            {renderIcon(nodeElement)}
            <h3>{nodeElement.name}</h3>
          </NodeLabel>
        )}
      </NodeContent>

      {isOpen && (
        <>
          {hasAssets && (
            <AssetContainer>
              {node.assets.map((asset) => (
                <TreeNodeComponent
                  key={asset.id}
                  node={asset}
                  currentAssetActive={currentAssetActive}
                  handleAssetClick={handleAssetClick}
                />
              ))}
            </AssetContainer>
          )}

          {hasSubAssets && (
            <AssetContainer>
              {node.subAssets?.map((subAsset) => (
                <TreeNodeComponent
                  key={subAsset.id}
                  node={subAsset}
                  currentAssetActive={currentAssetActive}
                  handleAssetClick={handleAssetClick}
                />
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

function Tree({ data }: TreeProps) {
  const { currentAssetActive, setCurrentAssetActive } = useDashboardStore()

  const handleAssetClick = (asset: ExtendedCompanyAsset) => {
    const data = (isIsolatedComponent(asset) ? asset.components?.[0] : asset)

    if (!data) return

    setCurrentAssetActive(data)
  }

  return (
    <TreeContainer>
      {data?.map((node, index) => {
        if (isAsset(node) && !node.parentId && !node.locationId) {
          return (
            <TreeNodeComponent
              key={index}
              node={node}
              currentAssetActive={currentAssetActive}
              handleAssetClick={handleAssetClick}
            />
          )
        }

        return (
          <TreeNodeComponent
            key={index}
            node={node}
            currentAssetActive={currentAssetActive}
            handleAssetClick={handleAssetClick}
          />
        )
      })}
    </TreeContainer>
  )
}

export default Tree
