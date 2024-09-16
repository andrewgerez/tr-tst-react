import Divider from '@/tokens/divider'
import Input from '@/tokens/input'
import AnimatedLoader from '@/tokens/animated-loader'
import Centralizer from '@/tokens/centralizer'
import useGetCompanyTree from '@/hooks/http/use-get-company-tree'
import useDashboardStore from '@/store/dashboard'
import Tree from '@/(home)/_components/tree'
import { SearchIcon } from '@/assets'
import { useCallback } from 'react'
import { ListContainer, InputWrapper, TreeScrollWrapper } from './styles'

function AssetsTree() {
  const currentCompanyActive = useDashboardStore((state) => state.currentCompanyActive)
  const filterQuery = useDashboardStore((state) => state.filterQuery)
  const setFilterQuery = useDashboardStore((state) => state.setFilterQuery)

  const {
    data: tree,
    isLoading: treeIsLoading,
    isError: treeIsError,
  } = useGetCompanyTree(currentCompanyActive?.id)

  const isNotAbleToRender = !tree || treeIsLoading || treeIsError

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilterQuery(value)
  }, [setFilterQuery])

  return (
    <ListContainer>
      <>
        <InputWrapper>
          <Input
            type='text'
            value={filterQuery}
            placeholder='Buscar Ativo ou Local'
            onChange={handleInputChange}
          />
          <SearchIcon />
        </InputWrapper>

        <Divider />

        <TreeScrollWrapper>
          {isNotAbleToRender ? (
            <Centralizer>
              <AnimatedLoader />
            </Centralizer>
          ) : (
            <Tree data={tree} />
          )}
        </TreeScrollWrapper>
      </>
    </ListContainer>
  )
}

export default AssetsTree
