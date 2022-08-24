import type { NextPage } from 'next'
import Layout from '../../../components/auth/Layout'
import VerifyOtp from '../../../components/auth/VerifyOtp'

const VerifyPasswordPage: NextPage = () => {
  return (
    <Layout>
      <VerifyOtp />
    </Layout>
  )
}

export default VerifyPasswordPage
