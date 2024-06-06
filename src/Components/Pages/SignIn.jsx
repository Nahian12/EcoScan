import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import supabase from "../../supabase";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { redirect } from "react-router-dom";
import { useAuth } from '../../authContext';
import { useNavigate } from 'react-router-dom';


// const SignIn = () => {
//     const auth = useAuth();
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [message, setMessage] = useState("")


//     // supabase.auth.onAuthStateChange(async (event) => {
//     //     if(event !== "SIGNED_OUT") {
//     //         redirect("/");
//     //     } else {
//     //         redirect("/sign-in");
//     //     }
//     // })

//     const handleSignIn = async (e) => {
//         e.preventDefault()

//         const signIn = await auth.login(email, password)

//         if(signIn.error) {
//             setMessage(signIn.error.message)
//         } else {
//             setMessage("Login link has been sent")
//         }

//         setEmail("")
//     }

//   return (
//     <Layout>

//         {message && message}
//         <h1>Sign In</h1>
//         {/* <Auth 
//             supabaseClient={supabase}
//             appearance={{ theme: ThemeSupa }}
//         /> */}

//         <form onSubmit={handleSignIn}>
//             <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
//             <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
//             <button type={'submit'}>Sign In</button>
//         </form>
        
//     </Layout>
//   )
// }

function SignIn() {

    const { session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/');
          }
        }, [session, navigate]);

    return(
        
                <Layout>
                    <Auth 
                        supabaseClient={supabase} 
                        appearance={{theme: ThemeSupa}}   
                        providers={[]}
                    />
                </Layout>
            
    )
}

export default SignIn;

