import { useSelector } from "react-redux";

export function useAuth() {
    const {token, id} = useSelector(state => state.user);
    const email = localStorage.getItem('email');
    return {
        isAuth: !!email,
        email,
        token,
        id
    };
}