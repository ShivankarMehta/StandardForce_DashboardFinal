"use client"
import axios from "axios";
import {useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default async function Logout(){
    const router = useRouter();
   const logout = async () => {
      try {
          await axios.get('/api/logout')
          toast.success('Logout successful')
          router.push('/')
      } catch (error:any) {
          console.log(error.message);
          toast.error(error.message)
      }
  }
  return (
    <div>
        <ToastContainer />
         <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
        </div>
  );
}