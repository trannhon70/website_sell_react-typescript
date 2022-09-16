import { FC, Fragment, useContext, useState, useEffect } from "react";

const Product:FC = () =>{
    const [title, setTitle] = useState('')
    const [calories, setcalories] = useState('')
    const [price, setprice] = useState<number>(0)
    const [category, setcategory] = useState(null)
    const [fields, setfields] = useState<boolean>(true)
    const [alertStatus, setalertStatus] = useState('danger')
    const [msg, setmsg] = useState(null)
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [imageAsset, setimageAsset] = useState(null)
    return <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[75%] boder border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
              {
                fields && (
                    <p className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ? "bg-red-400 text-red-800 " : "bg-emerald-400 text-emerald-800"}`}>
                        Something Wrong
                    </p>
                )
              }
            </div>
    </div>
}

export default Product;