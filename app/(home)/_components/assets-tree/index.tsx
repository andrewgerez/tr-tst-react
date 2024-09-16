import Divider from '@/tokens/divider'
import Input from '@/tokens/input'
import useGetCompanyTree from '@/hooks/http/use-get-company-tree'
import useDashboardStore from '@/store/dashboard'
import Tree from '@/(home)/_components/tree'
import { SearchIcon } from '@/assets'
import { ListContainer, InputWrapper, TreeScrollWrapper } from './styles'
import { useCallback } from 'react'

function AssetsTree() {
  const { currentCompanyActive, filterQuery, setFilterQuery } = useDashboardStore()
  const { data: tree } = useGetCompanyTree(currentCompanyActive?.id)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilterQuery(value)
  }, [setFilterQuery])

  return (
    <ListContainer>
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
        <Tree data={tree} />
      </TreeScrollWrapper>
    </ListContainer>
  )
}

export default AssetsTree
