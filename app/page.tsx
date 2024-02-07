"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//login Page 


export default function LoginPage() {
   const router = useRouter();
   const [user, setUser] = useState({
      userId: "",
      password: "",
   })
   //  const [buttonDisabled, setButtonDisabled] = React.useState(false);
   const [loading, setLoading] = useState(false);

   const onLogin = async () => {
      try {
         setLoading(true);
         console.log(user);
         const response = await axios.post("/api/login", user);
         console.log("Login success", response.data);
         toast.success("Login Sucessful ");
         router.push("/dashboard");
      } catch (error: any) {
         toast.error(error.response.data.message);
         console.log("Login failed", error.response.data.message);
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <div >
            <h1 ><strong>{loading ? "Processing" : "Login"}</strong></h1>
         </div>
         <hr />
         <div className="m-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
            <input
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               id="email"
               type="text"
               value={user.userId}
               onChange={(e) => setUser({ ...user, userId: e.target.value })}
               placeholder="email"
            />
         </div>
         <div className="m-5">

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="password"
               type="password"
               value={user.password}
               onChange={(e) => setUser({ ...user, password: e.target.value })}
               placeholder="password"
            />
         </div>
         <button
            onClick={onLogin}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
            <ToastContainer />
         <Link href="/signup">Visit Signup page</Link>
      </div>
   )

}