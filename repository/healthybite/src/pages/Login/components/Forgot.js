import React, {useState,useEffect} from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail ,fetchSignInMethodsForEmail} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth,firestore } from '../../../firebaseConfig';
import Input from "../../../components/Input";

const Forgot = ({forgot,setForgot}) => {
    const [email, setEmail] = useState('');
    const [inValidation,setInValidation]=useState(false)
    const [resetpasswordMessage, setResetPasswordMessage]=useState('');

    useEffect(() => {
        setInValidation(false);
        setResetPasswordMessage('')
    }, [forgot]); 


    const handleResetPassword = async (e) => {
        setInValidation(true)
        e.preventDefault();
        if (email){
            try {
                await sendPasswordResetEmail(auth, email);
                setResetPasswordMessage('Password reset email sent!, please check your inbox');
            } catch (error) {
                console.error('Error during password reset:', error);
                setResetPasswordMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col  w-full px-0  sm:max-w-[450px]  my-8">
                <p className="font-quicksand font-semibold text-lg text-center text-darkGray ">Forgot your password?</p>
                <p className="font-quicksand text-md text-center text-darkGray">If you have forgotten your password, please enter your email address below. We will send you a link to a page where you can easily create a new&nbsp;password.</p>
                <Input required={inValidation && email===''} label=" " inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                <div className="flex flex-col items-center justify-center mt-3">
                    {resetpasswordMessage && (<p className="font-quicksand text-sm font-semibold p-1 rounded-md text-healthyOrange">{resetpasswordMessage}</p>)}
                    <button onClick={handleResetPassword}   className="font-quicksand bg-healthyGreen hover:bg-healthyDarkGreen text-md text-white p-1 font-semibold rounded-md w-full xs:w-1/2 ">Send</button>
                    <p onClick={()=>setForgot(false)} className="font-quicksand text-healthyOrange hover:text-healthyDarkOrange underline hover:underline-offset-4 hover:cursor-pointer  font-bold text-md mt-3">Go back to Log in</p>
                </div>
            </div>
        </div>
    )
}

export default Forgot