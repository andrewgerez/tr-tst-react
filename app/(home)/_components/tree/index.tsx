import StatusIndicator from '@/tokens/status-indicator'
import useDashboardStore from '@/store/dashboard'
import { TreeLocationIcon, TreeAssetIcon, TreeComponentIcon, ArrowIcon } from '@/assets'
import { TreeElementType } from '@/enums/business'
import { LocationWithAssets, ExtendedCompanyAsset, Asset } from '@/types/endpoints/get-company-tree'
import { isIsolatedComponent, isExtendedCompanyAsset } from '@/utils/business/tree-helper'
import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { TreeProps, VisibleNodes } from './types'
import {
  TreeNode,
  NodeContent,
  ExpandIcon,
  NodeLabel,
  TreeContainer,
  ComponentItem,
  VirtualizedWrapper,
  VirtualizedItem
} from './styles'

const TreeNodeComponent = ({
  node,
  currentAssetActive,
  handleAssetClick,
  isOpen,
  onToggle,
}: {
  node: LocationWithAssets | ExtendedCompanyAsset,
  currentAssetActive: Asset | null,
  handleAssetClick: (asset: ExtendedCompanyAsset) => void,
  isOpen: boolean,
  onToggle: () => void,
}) => {
  const hasChildren = 'children' in node && node.children?.length > 0
  const hasAssets = 'assets' in node && node.assets?.length > 0
  const hasSubAssets = 'subAssets' in node && node.subAssets && node.subAssets.length > 0
  const isolatedComponent = isIsolatedComponent(node)
  const nodeElement = isolatedComponent ? node.components?.[0] : node

  if (!nodeElement) return null

  const renderIcon = (node: LocationWithAssets | ExtendedCompanyAsset) => {
    switch (node.type) {
      case TreeElementType.LOCATION:
        return <TreeLocationIcon />
      case TreeElementType.ASSET:
        return <TreeAssetIcon />
      default:
        return <TreeComponentIcon />
    }
  }

  return (
    <TreeNode>
      <NodeContent onClick={onToggle}>
        {(hasChildren || hasAssets || hasSubAssets) && (
          <ExpandIcon $isOpen={isOpen}>
            <ArrowIcon />
          </ExpandIcon>
        )}
        {nodeElement.type === TreeElementType.COMPONENT ? (
          <ComponentItem
            $isActive={currentAssetActive?.id === nodeElement.id}
            onClick={() => handleAssetClick(nodeElement as ExtendedCompanyAsset)}
          >
            {renderIcon(nodeElement)}
            <h3>{nodeElement.name}</h3>
            {isExtendedCompanyAsset(nodeElement) && (
              <StatusIndicator status={nodeElement.status} type={nodeElement.sensorType} />
            )}
          </ComponentItem>
        ) : (
          <NodeLabel>
            {renderIcon(nodeElement)}
            <h3>{nodeElement.name}</h3>
          </NodeLabel>
        )}
      </NodeContent>
    </TreeNode>
  )
}

function Tree({ data }: TreeProps) {
  const { currentAssetActive, setCurrentAssetActive } = useDashboardStore()
  const parentRef = useRef<HTMLDivElement | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  useEffect(() => {
    const initializeExpandedNodes = (nodes: (LocationWithAssets | ExtendedCompanyAsset)[]) => {
      const allNodes = new Set<string>()

      const addNodeAndChildren = (nodes: (LocationWithAssets | ExtendedCompanyAsset)[]) => {
        for (const node of nodes) {
          allNodes.add(node.id)
          if ('assets' in node && node.assets?.length > 0) {
            addNodeAndChildren(node.assets)
          }
          if ('subAssets' in node && (node.subAssets ?? [])?.length > 0) {
            addNodeAndChildren(node.subAssets ?? [])
          }
          if ('children' in node && node.children?.length > 0) {
            addNodeAndChildren(node.children)
          }
        }
      }

      addNodeAndChildren(nodes)
      setExpandedNodes(allNodes)
    }

    initializeExpandedNodes(data.tree)
  }, [data.tree])

  const handleToggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId)
      } else {
        newExpanded.add(nodeId)
      }
      return newExpanded
    })
  }

  const handleAssetClick = (asset: ExtendedCompanyAsset) => {
    const data = isIsolatedComponent(asset) ? asset.components?.[0] : asset
    if (!data) return
    setCurrentAssetActive(data)
  }

  const getVisibleNodes = (
    nodes: (LocationWithAssets | ExtendedCompanyAsset)[],
    depth = 0
  ): VisibleNodes => {
    let visibleNodes: VisibleNodes = []

    for (const node of nodes) {
      visibleNodes.push({ node, depth })

      if (expandedNodes.has(node.id)) {
        if ('assets' in node && node.assets?.length > 0) {
          visibleNodes = visibleNodes.concat(getVisibleNodes(node.assets, depth + 1))
        }
        if ('subAssets' in node && (node.subAssets ?? [])?.length > 0) {
          visibleNodes = visibleNodes.concat(getVisibleNodes(node.subAssets ?? [], depth + 1))
        }
        if ('children' in node && node.children?.length > 0) {
          visibleNodes = visibleNodes.concat(getVisibleNodes(node.children, depth + 1))
        }
      }
    }

    return visibleNodes
  }

  const visibleNodes = getVisibleNodes(data.tree)

  const rowVirtualizer = useVirtualizer({
    count: visibleNodes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
  })

  return (
    <TreeContainer ref={parentRef}>
      <VirtualizedWrapper $virtualHeight={rowVirtualizer.getTotalSize()}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const { node, depth } = visibleNodes[virtualRow.index]
          if (!node) return null

          return (
            <VirtualizedItem
              key={virtualRow.key}
              data-index={virtualRow.index}
              $virtualWidth={depth * 10}
              $virtualLeft={depth * 10}
              $virtualTranslate={virtualRow.start}
            >
              <TreeNodeComponent
                key={node.id}
                node={node}
                currentAssetActive={currentAssetActive}
                handleAssetClick={handleAssetClick}
                isOpen={expandedNodes.has(node.id)}
                onToggle={() => handleToggleNode(node.id)}
              />
            </VirtualizedItem>
          )
        })}
      </VirtualizedWrapper>
    </TreeContainer>
  )
}

export default Tree
