import Header from '@/components/header'
import { useGetCompanies } from '@/hooks/http'

export default function Home() {
  const { data: companies } = useGetCompanies()

  return (
    <div>
      <Header />
    </div>
  )
}
