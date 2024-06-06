import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';


const Home = () => {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if(value.data?.user) { //handle if user not defined
          console.log(value.data.user);
          setUser(value.data.user);
        } 
      })
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/sign-in")
  }


  return (
    <Layout>
        <h1>Welcome!</h1>

        { Object.keys(user) !== 0 ?
        <>
          <button onClick={() => signOutUser()}>Sign Out</button>
        </>  
        :
        <>
          <h1>User is not logged in </h1>
          <button onClick={() => { navigate("/sign-in")}}>Go to sign in</button>
        </>
        } 
    </Layout>
  )
}

export default Home
