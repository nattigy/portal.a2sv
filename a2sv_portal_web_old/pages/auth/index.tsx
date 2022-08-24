import type { NextPage } from 'next'
import Layout from '../../components/auth/Layout'
import LoginForm from '../../components/auth/Login'

const AuthPage: NextPage = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}

export default AuthPage
