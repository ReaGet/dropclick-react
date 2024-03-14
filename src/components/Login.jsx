import { Form } from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "services/Firebase";
import { useState } from "react";

const Login = () => {

    const dispatch = useDispatch();
    const push = useNavigate();

    const [err, setErr] = useState();

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken
            }));
            push('/');
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                setErr("Неправильный пароль");
            }
            if (errorCode === "auth/invalid-email") {
                setErr("Неправильный Email");
            }
        });

    }

  return (
    <Form
        title='Sign In'
        err={err}
        handleClick={handleLogin}
     />
  )
}

export {Login}