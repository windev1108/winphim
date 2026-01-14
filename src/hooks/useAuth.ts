import { useAuthStore } from "@/store"

export const useAuth = () => {
    const { account, token, ...rest } = useAuthStore()
    return {
        ...rest,
        isLogged: !!token && !!account?.email,
        token,
        user: account,
    }
}
