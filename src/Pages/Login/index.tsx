import { Avatar, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { FC, Fragment, useContext, useState } from "react";
import { IoIosAddCircle } from 'react-icons/io';
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../Component/HookComponent/Alert/Alert";
import { AuthContext } from "../../Context/ContextProvider";
import { auth, firestore } from "../../Firebase/firebase";

interface Data {
  email: string,
  password: string,
  error: string,

}

const Login: FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    error: "",

  });
  const [open, setOpen] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  const { email, password, error } = data;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleCloseFailure = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailure(false);
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setData({ ...data, error: "" });
    if (!email) {
      setData({ ...data, error: "Email không được bỏ trống" });
    } else if (!password) {
      setData({ ...data, error: "Mật khẩu không được bỏ trống" });
    } else if (password.length < 6) {
      setData({ ...data, error: "Mật khẩu phải nhập ít nhất 6 ký tự !" });
    }
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(firestore, "user", result.user.uid), {
        isOnline: true,
      });
     
      setOpen(true);
      setLoading(false);
      
    } catch (err) {
      // setData({ ...data, error: err.message, loading: false });
      
      setOpenFailure(true);
      setLoading(false);
    }
  };

  const handleChangNextRegister = () => {
    navigate("/register");
  }

  const paperStyle = { padding: '50px 20px', width: 500, margin: "20px auto" };
 
  const avataStyle = { backgroundColor: '#1bbd7e' };
  const headerStyle = { margin: 0, display: 'flex', justifyContent: 'center', padding: '20px', fontSize: '25px', fontWeight: 600 };


  return <Fragment>{user ? <Navigate to="/" /> : <Grid sx={{ minHeight: '788px' }}>
    <Paper elevation={20} style={paperStyle}>
      <Grid >
        <Avatar style={avataStyle} sx={{ display: 'flex', margin: 'auto' }}>
          <IoIosAddCircle />
        </Avatar>
        <h1 style={headerStyle}>Đăng nhập</h1>
      </Grid>
      {error ? <Alert sx={{ marginBottom: '20px' }} severity="warning">{error}</Alert> : null}
      <form onSubmit={handleSubmit} >

        <TextField sx={{ paddingBottom: '20px' }} value={email}
          onChange={handleChange} type="email" name="email" fullWidth label="Email" />

        <TextField sx={{ paddingBottom: '20px' }} value={password}
          onChange={handleChange} type="password" name="password" fullWidth label="Mật khẩu" />

        <div style={{ paddingBottom: '20px', cursor: 'pointer', color: 'red' }} onClick={handleChangNextRegister} >Đăng ký tài khoản</div>

        <Button sx={{ padding: '10px', fontSize: '20px' }} type="submit" variant="contained" fullWidth color="success" disabled={loading} >{loading ? <Box sx={{ display: 'flex' }}>
          <CircularProgress color="success" />
        </Box> : "Đăng nhập"}</Button>
      </form>
    </Paper>
 
    {/* đăng nhập tài khoản thành công */}
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }} >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}  >
        Chúc mừng bạn đã đăng nhập thành công !
      </Alert>
    </Snackbar>
    {/* đăng ký tài khoản thất bại */}
    <Snackbar open={openFailure} autoHideDuration={6000} onClose={handleCloseFailure} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }} >
      <Alert onClose={handleCloseFailure} severity="warning" sx={{ width: '100%' }}  >
        Mật khẩu hoặc email không đúng !
      </Alert>
    </Snackbar>
  </Grid> }
  </Fragment>
}

export default Login