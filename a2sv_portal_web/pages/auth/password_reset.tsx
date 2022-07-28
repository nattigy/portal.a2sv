import type { NextPage } from 'next'
import Layout from '../../components/auth/Layout'
import PasswordResetForm from '../../components/auth/PasswordReset'

const PasswordResetPage: NextPage = () => {
  return (
    <Layout>
      <PasswordResetForm />
    </Layout>
  )
}

export default PasswordResetPage
