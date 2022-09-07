import { Box, Grid } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import { ImHome } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { SxHeader } from "./style";
import logo from "../../Assets/img/logo.png";
import Avata from "../../Assets/img/avatar.png";
import {motion} from "framer-motion"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../../Firebase/firebase";

export interface IListHeader {
  id: number;
  icon: ReactNode;
  name: string;
  path: string;
}
const listHeader = [
  { id: 1, icon: <ImHome />, name: "Home", path: "/" },
  { id: 2, icon: <ImHome />, name: "Menu", path: "/menu" },
  { id: 3, icon: <ImHome />, name: "About Us", path: "/about" },
  { id: 4, icon: <ImHome />, name: "Service Us", path: "/service" },
] as IListHeader[];

const Header: FC = (props) => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const login = async () =>{
        const response = await signInWithPopup(firebaseAuth, provider);
        // console.log({response});
        
    }
  return (
    <Fragment>
      <header className="fixed z-50 w-screen p-6 px-16">
        {/* desktop & tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <motion.img whileTap={{scale:0.8}} className="w-10 object-cover " src={logo} alt="logo" />
            <p className="text-headingColor text-xl font-bold">City</p>
           
          </div>
          </Link>
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-8 ">
              {listHeader?.map((list) => (
                <motion.li whileTap={{scale:1.3}} key={list.id}>
                  <NavLink
                    className=" text-2xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                    to={list.path}
                    style={({ isActive }) => {
                      return { color: isActive ? "red" : "black" };
                    }}
                  >
                    {list.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div whileTap={{scale:0.8}} className="relative flex justify-center items-center">
              <FaShoppingCart className="text-textColor text-2xl cursor-pointer" />
              <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">2</p>
              </div>
            </motion.div>
           <div className="relative">
           <motion.img whileTap={{scale:0.8}} src={Avata} alt="" className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer" onClick={login} />
           </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex md:hidden w-full h-full"></div>
      </header>
    </Fragment>
  );
};

export default Header;
