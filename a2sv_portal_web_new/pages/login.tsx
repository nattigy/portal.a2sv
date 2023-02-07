import { signIn } from 'next-auth/react'
import React from 'react'

type Props = {}

const Login = (props: Props) => {
    return (
        <div>
            <button onClick={async () => {
                await signIn('credentials', {
                    email: "natnael.hussein@a2sv.org",
                    password: "Password1@",
                    redirect: false,
                });
            }}>Login</button>
        </div>
    )
}

export default Login