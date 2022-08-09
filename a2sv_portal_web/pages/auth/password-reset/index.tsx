import type { NextPage } from 'next'
import Layout from '../../../components/auth/Layout'
import ResetPasswordForm from '../../../components/auth/ResetPassword'

const PasswordResetPage: NextPage = () => {
  return (
    <Layout>
      <ResetPasswordForm />
    </Layout>
  )
}

export default PasswordResetPage
