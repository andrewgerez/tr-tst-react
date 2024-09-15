import Divider from '@/tokens/divider'
import Input from '@/tokens/input'
import useGetCompanyTree from '@/hooks/http/use-get-company-tree'
import useDashboardStore from '@/store/dashboard'
import Tree from '@/(home)/_components/tree'
import { SearchIcon } from '@/assets'
import { ListContainer, InputWrapper, TreeScrollWrapper } from './styles'

function AssetsTree() {
  const { currentCompanyActive } = useDashboardStore()
  const { data: tree } = useGetCompanyTree(currentCompanyActive?.id)

  return (
    <ListContainer>
      <InputWrapper>
        <Input type='text' placeholder='Buscar Ativo ou Local' />
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
