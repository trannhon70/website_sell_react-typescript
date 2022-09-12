import { doc, getDoc } from "firebase/firestore";
import { FC, Fragment, useContext, useState,useEffect } from "react";
import { auth, firestore } from "../../Firebase/firebase";
import { Data } from "../../Interface";
import NotPound from "../NotPound";


const Admin : FC = () =>{

    const [data, setData] = useState<Data>();
    useEffect(() => {
        if (auth.currentUser?.uid) {
          getDoc(doc(firestore as any, "user", auth.currentUser?.uid as any)).then((docSnap) => {
            if (docSnap.exists as any) {
              setData(docSnap.data() as Data);
            }
          });
        }
      }, [])
      
    return (data?.nguoidung.includes('quantri') ? <div>trang admin</div> : <NotPound />)
}
export default Admin;