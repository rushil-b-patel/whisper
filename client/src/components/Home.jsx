import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username , setUsername] = useState('');

  useEffect(() => {
    const verifyCookie = async () => {
      console.log("token : " + cookies.token)
      const token = cookies.token;
      if(!token){
        console.log('No token found');
        navigate('/login');
      }
      const {data} = await axios.post('http://localhost:3000', {}, {withCredentials:true});
      console.log(data);
      const { status, user } = data;
      setUsername(user);
      if (status) {
        toast(`Welcome ${user}`, { position: "top-right" });
      } else {
        removeCookie('token');
        navigate('/login');
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  
  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  }

  return (
    <>
    <div className='text-4xl text-center font-bold'>
      Welcome {username}
    </div>
    <button onClick={handleLogout} className='flex justify-center text-black px-4 py-2 border-2 rounded-lg mt-5'>Logout</button>
    </>
  )
}

export default Home;