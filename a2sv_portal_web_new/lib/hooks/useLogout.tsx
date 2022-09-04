import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../apollo/Mutations/authMutations";


const useLogout = () => {
    return useMutation(LOGOUT_MUTATION)
}

export default useLogout