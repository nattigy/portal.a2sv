import { NextPage } from 'next/types'
import Layout from '../../../components/auth/Layout'
import SuccessCard from '../../../components/auth/PasswordResetSuccess'

const SuccessPage: NextPage = () => {
  return (
    <Layout>
      <SuccessCard />
    </Layout>
  )
}

export default SuccessPage
