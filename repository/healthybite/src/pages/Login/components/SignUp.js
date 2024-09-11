import React,{useState,useEffect} from 'react'
import { auth,firestore } from '../../../firebaseConfig';
import Input from "../../../components/Input";
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword} from 'firebase/auth';

const SignUp = ({SignUp,setSignUp}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [inValidation,setInValidation]=useState(false)
    const [message, setMessage]=useState(false)

    useEffect(()=>{
        setName('');
        setSurname('');
        setWeight('');
        setHeight('');
        setBirthDate('');
        setEmail('');
        setPassword('');
        setConfirmPw('');
        setInValidation(false);
        setMessage('');
    },[SignUp]);

    const handleValidation=()=> {
        setInValidation(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Invalid email address");
            return; 
        }

        const birthDateObj = new Date(birthDate);
        const today = new Date();
        if (birthDateObj >= today) {
            setMessage("Check the birth date");
            return; 
        }

        if(password !== confirmPw) {
            setMessage("Passwords do not match")
            return 
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleValidation();
        try {
            // 1. Registrar al usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            // 2. Agregar el nuevo usuario a la colección "User" en Firestore
            await addDoc(collection(firestore, 'User'), {
                id_user: user.uid,  // ID único del usuario generado por Firebase Auth
                name: name,
                surname: surname,
                weight: weight,
                height: height,
                birthDate: birthDate
            });
            console.log('Usuario registrado y agregado a Firestore:', user.uid);
        } catch (error) {
            console.error('Error al registrar usuario o agregar a Firestore:', error);
        }
    };

    return (
        <div classname='  w-full '>
            <div className="sm:mt-6 flex flex-col bg-healthyGray w-full sm:max-h-[580px] md:max-h-[550px]    lg:max-h-[500px] xl:max-h-[450px] sm:overflow-y-auto  lg:max-w-[400px] ">
                <div className="flex w-full bg-healthyGray sm:sticky sm:top-0">
                    <button onClick={()=>setSignUp(false) } className="font-quicksand  bg-healthyGreen p-2   w-full rounded-xl  text-white font-semibold my-4 hover:bg-healthyDarkGreen">Log in</button>
                </div>
                <div className="flex flex-col w-full px-2">
                    <Input required={inValidation && name===''} label="Name" inputType="text" inputValue={name} placeholder="Jane" onChange={(e)=>setName(e.target.value)} />
                    <Input required={inValidation && surname===''} label="Surname" inputType="text" inputValue={surname} placeholder="Doe" onChange={(e)=>setSurname(e.target.value)} />
                    <Input required={inValidation && email===''} label="Email" inputType="email" inputValue={email} placeholder="jane@example.com" onChange={(e)=>setEmail(e.target.value)} />
                    <Input required={inValidation && birthDate===''} label="Date of birth" inputType="date" inputValue={birthDate} placeholder="DD-MM-YYYY" onChange={(e)=>setBirthDate(e.target.value)} />
                    <Input required={inValidation && weight===''} label="Weight" inputType="number" inputValue={weight} placeholder="e.g., 70 kg" onChange={(e) => setWeight(e.target.value)}/>
                    <Input required={inValidation && height===''} label="Height" inputType="number" inputValue={height} placeholder="e.g., 170 cm" onChange={(e) => setHeight(e.target.value)}/>
                    <Input required={inValidation && password===''} label="Password" inputType="password" inputValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Input required={inValidation && confirmPw===''} label="Confirm password" inputType="password" inputValue={confirmPw} placeholder="Password" onChange={(e) => setConfirmPw(e.target.value)} />
                </div>
                <div className="flex sm:sticky sm:bottom-0 bg-healthyGray flex-col-reverse sm:flex-row justify-between items-center">
                    <button onClick={handleSubmit} className="font-quicksand bg-healthyOrange p-2 w-full  rounded-xl  text-white font-semibold mb-12 sm:my-4 hover:bg-healthyDarkOrange">Submit</button>
                    {message && <p className="font-quicksand underline underline-offset-4 text-sm font-semibold p-1 rounded-md text-healthyOrange">{message}</p>}
                </div>
            </div>
        </div>
    )
}

export default SignUp