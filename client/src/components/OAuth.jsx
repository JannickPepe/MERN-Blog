import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { twMerge } from "tailwind-merge";

export default function OAuth() {

    // have the getAuth method to contain the app parameter from firebase.js
    const auth = getAuth(app)
    // Initialize dispatch to useDistpach - A hook to access the redux dispatch function
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        // always going to ask to select an account when using google login
        provider.setCustomParameters({ prompt: 'select_account' })

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            // Display the data in the backend
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            // convert the data to json
            const data = await res.json()
            // if everything is correctly, have dispatch onto our redux userSlice method containing the data and navigate to the correct url
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }

        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <div className='mx-auto w-full justify-center flex'>
            <button 
                type='button'  
                className={twMerge(
                    `
                    relative z-0 w-3/4 text-center justify-center flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
                    border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
                    px-3 py-1.5
                    text-zinc-50 transition-all duration-300
                    
                    before:absolute before:inset-0
                    before:-z-10 before:translate-y-[200%]
                    before:scale-[2.5]
                    before:rounded-[100%] before:bg-zinc-100
                    before:transition-transform before:duration-500
                    before:content-[""]

                    hover:scale-105 hover:text-zinc-900
                    hover:before:translate-y-[0%]
                    active:scale-100`,
                )}  
                onClick={handleGoogleClick}
            >
                <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
                Continue with Google
            </button>
        </div>
    
    );

}