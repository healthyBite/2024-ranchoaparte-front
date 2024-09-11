import React, {useState,useEffect} from "react";
import loginImg from '../../assets/login.png'
import loginMobile from '../../assets/loginMobile.png'
import Input from "../../components/Input";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail ,fetchSignInMethodsForEmail} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth,firestore } from '../../firebaseConfig';
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";

function Login() {
    const [inValidation,setInValidation]=useState(false)
    const [signUp, setSignUp]=useState(false)
    const [message, setMessage]=useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [infoOk, setInfoOk]=useState(false);
    const [forgot, setForgot]=useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesión exitoso:', userCredential.user);

          } catch (error) {
            setLoginError(error)
            console.error('Error al iniciar sesión:', error);

        }}
        

    return (
        <div className=" h-screen flex justify-center items-center bg-healthyGray ">
            {window.innerWidth<640 ? 
            <img src={loginMobile} alt="Login" className=" h-full w-full z-0 relative object-cover" />
            :
            <img src={loginImg} alt="Login" className="w-full h-full z-0 relative object-cover" />
            }
            <div className={`bg-healthyGray w-full sm:w-2/5 lg:w-2/5 xl:w-5/12 absolute flex  sm:left-20 lg:left-40 top-64 flex-col  ${signUp ? ' sm:top-12 md:top-20 xl:top-12':'  sm:top-40'} `} >
                <div className={`flex  sm:mt-0  px-12 xs:px-16 sm:px-0   w-full flex-col `}>
                    <h1 className= {`font-belleza text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-darkGray ${forgot ? 'text-center':'text-left'}`}>Healthy Bite</h1>
                    {signUp ? (<SignUp setSignUp={setSignUp} signUp={signUp} />)
                    : ( forgot ? (<Forgot setForgot={setForgot}  forgot={forgot}/>)
                        :(<div className="w-full lg:w-2/3 ">
                            <div className="sm:mt-6 flex flex-col">
                                {inValidation && !infoOk && <p className="font-quicksand mt-4 sm:mt-0 text-sm font-semibold bg-darkGray text-white p-1 rounded-md text-center">{message}</p>}
                                {loginError && (<p className="font-quicksand mt-4 text-sm font-semibold bg-red-200 text-red-600 p-1 rounded-md text-center">{loginError}</p>)}
                                <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                                <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <p onClick={()=>setForgot(true)} className="font-quicksand text-sm font-bold text-healthyDarkGreen mt-1 hover:cursor-pointer">I forgot my password</p>
                            </div>
                            <div className="flex justify-between flex-col xs:flex-row">
                                <button onClick={handleLogin} className="font-quicksand bg-healthyGreen p-1 md:p-2 w-full md:w-1/2 mr-2 rounded-md md:rounded-xl  text-white font-semibold mt-2 md:my-4 hover:bg-healthyDarkGreen">Log in</button>
                                <button onClick={()=>setSignUp(true)} className="font-quicksand bg-healthyOrange p-1 md:p-2 w-full md:w-1/2 rounded-md md:rounded-xl  text-white font-semibold mt-2 md:my-4 hover:bg-healthyDarkOrange">Sign up</button>
                            </div>
                        </div>)
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Login;
