import { Forma } from "./Forma";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import axios from "axios";


const SignUp = () => {

    const dispatch = useDispatch();
    const push = useNavigate();

    const handleRegister = (email, password, referal) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken
            }));
            axios
            .post("https://dropclick.pro/base/addUser.php", {
                email: user.email,
                count: referal
            });
            push('/');
        })
        .catch(console.error)
    }

  return (
    <Forma
        title='Sign Up'
        handleClick={handleRegister}
    />
  )
}

export {SignUp}