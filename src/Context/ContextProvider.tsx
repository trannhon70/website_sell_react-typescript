
// import { onAuthStateChanged } from 'firebase/auth'
// import React, { createContext, useEffect, useState } from 'react'
// import Loading from '../Component/Loading'
// import { auth } from '../Firebase/firebase'
// export type AuthUser = {
//     hoTen: string,
//     email: string,
//     sdt: string,
//     diaChi: string,
//     password: string,
//     ngaysinh: string,
// }

// type UserContextProviderProps = {
//     children: React.ReactNode
// }

// type userContextType = {
//     user: AuthUser | null
//     setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
// }

// export const UserContext = createContext<userContextType | null>(null)

// export default function ContextProvider({children}: UserContextProviderProps) {
//     const [user,setUser] = useState<AuthUser | null>(null);
//     const [loading, setLoading] = useState(true);
//     // console.log({user});
    
//     useEffect(() =>{
//         onAuthStateChanged(auth,(user:any) =>{
//             setUser(user);
//             localStorage.setItem('user',JSON.stringify(user));
//             setLoading(false);
//         });
//     },[]);
    
//     if(loading){
//         return <Loading/>;
//     }
//   return (
//     <UserContext.Provider value={{user, setUser}} >  {children} </UserContext.Provider>
//   )
// }

import { onAuthStateChanged } from 'firebase/auth';
import {createContext, useEffect, useState,useContext} from 'react'
import Loading from '../Component/Loading';
import { auth } from '../Firebase/firebase';


export const AuthContext = createContext<any>(null);

const AuthProvider = ({children}:any) =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [google, setGoogle]= useState<any>({})
    useEffect(() =>{
        onAuthStateChanged(auth,(user:any) =>{
            setUser(user);
            localStorage.setItem('user',JSON.stringify(user));
            setLoading(false);
        });
    },[]);

    useEffect(() =>{
        // eslint-disable-next-line no-lone-blocks
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{{
          setGoogle(currentUser);
          console.log({currentUser});
          
        }});
        return () =>{
          unsubscribe();
        }
       
      },[]);
    if(loading){
        return <Loading/>;
    }
    
    return <AuthContext.Provider value={{user}} >  {children} </AuthContext.Provider>
}
export default AuthProvider;

export const UserAuth = () =>{
    return useContext(AuthContext)
}