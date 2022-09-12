import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Popover } from "@mui/material";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { FC, Fragment, ReactNode, useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../Assets/img/logo.png";
import { AuthContext } from "../../Context/ContextProvider";
import { auth, firestore } from "../../Firebase/firebase";
import { Data } from "../../Interface";


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


const Header: FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // destop
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  // mobile
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const open1 = Boolean(anchorEl1);

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

  const handleSignout = async () => {

    localStorage.setItem('user', JSON.stringify(""));
    await updateDoc(doc(firestore as any, "user", auth.currentUser?.uid as any), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/")
    setAnchorEl(null);
    // window.location.reload();
  };

  //destop
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //mobile
  const handleClick1 = (event: any) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };


  const hanldChangNextLogin = () => {
    navigate("/login")
  }

  const handleInformation = () => {
    navigate(`/information/${data?.uid}`)
    setAnchorEl(null);
  }
  const id = open ? 'simple-popover' : undefined;
  const id1 = open1 ? 'simple-popover' : undefined;
  return (
    <Fragment>
      <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
        {/* desktop & tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2">
              <motion.img whileTap={{ scale: 0.8 }} className="w-10 object-cover " src={logo} alt="logo" />
              <p className="text-headingColor text-xl font-bold">City</p>

            </div>
          </Link>
          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-8 ">
              {listHeader?.map((list) => (
                <motion.li whileTap={{ scale: 1.3 }} key={list.id}>
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
            </motion.ul>

            <motion.div whileTap={{ scale: 0.8 }} className="relative flex justify-center items-center">
              <FaShoppingCart className="text-textColor text-2xl cursor-pointer" />
              <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">2</p>
              </div>
            </motion.div>
            <div className="relative">
              {
                user ? (

                  <motion.img aria-describedby={id} onClick={(e) => { handleClick(e) }} whileTap={{ scale: 0.8 }} src={data?.avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer" />
                  // <div onClick={handleSignout}>Đăng xuất</div>
                ) : (
                  <Button variant="contained" color="success" onClick={hanldChangNextLogin}>Đăng nhập</Button>
                )
              }

            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex md:hidden w-full h-full item-center justify-between">
          <motion.div whileTap={{ scale: 0.8 }} className="relative flex justify-center items-center">
            <FaShoppingCart className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-1 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </motion.div>
          <Link to="/">
            <div className="flex items-center gap-2">
              <motion.img whileTap={{ scale: 0.8 }} className="w-10 object-cover " src={logo} alt="logo" />
              <p className="text-headingColor text-xl font-bold">City</p>

            </div>
          </Link>

          <div className="relative">
            {
              user ? (

                <motion.img aria-describedby={id} onClick={(e) => { handleClick1(e) }} whileTap={{ scale: 0.8 }} src={data?.avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer" />
                // <div onClick={handleSignout}>Đăng xuất</div>
              ) : (
                <Button variant="contained" color="success" onClick={hanldChangNextLogin}>Đăng nhập</Button>
              )
            }

          </div>
          <Popover
            id={id1}
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{ marginTop: '10px' }}
          >

            <List sx={{ width: '250px' }}>
              {listHeader?.map((list) => (
                <NavLink
                  className=" text-2xl text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
                  to={list.path}
                  style={({ isActive }) => {
                    return { color: isActive ? "red" : "black" };
                  }}
                >
                  <ListItem autoFocus button key={list.id} className="hover:bg-slate-500" >
                    <ListItemAvatar>
                      <Avatar>
                        {list.name.slice(0, 1)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={list.name} />
                  </ListItem>
                </NavLink>
              ))}
              <ListItem autoFocus button onClick={handleInformation} >

                <ListItemAvatar>
                  <Avatar>
                    <img src={data?.avatar} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Thông tin cá nhân" />
              </ListItem>

              <ListItem autoFocus button onClick={handleSignout}>
                <ListItemAvatar>
                  <Avatar>
                    <AiOutlineLogout />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Đăng Xuất" />
              </ListItem>
            </List>
          </Popover>
        </div>

      </header>
      <div className="w-full h-auto flex flex-col bg-primary">
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Outlet />
        </main>

      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ marginTop: '10px' }}
      >

        <List sx={{ width: '250px' }}>
          <ListItem autoFocus button onClick={handleInformation} >
            <ListItemAvatar>
              <Avatar>
                <img src={data?.avatar} alt="" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thông tin cá nhân" />
          </ListItem>

          <ListItem autoFocus button onClick={handleSignout}>
            <ListItemAvatar>
              <Avatar>
                <AiOutlineLogout />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Đăng Xuất" />
          </ListItem>
        </List>
      </Popover>
    </Fragment>
  );
};

export default Header;
