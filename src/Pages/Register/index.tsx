/* eslint-disable react/jsx-no-comment-textnodes */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, CircularProgress, Grid, Paper, Snackbar, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FC, Fragment, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosAddCircle } from 'react-icons/io';
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../Component/HookComponent/Alert/Alert";
import { AuthContext } from "../../Context/ContextProvider";
import { auth, firestore, storege } from "../../Firebase/firebase";
import { DataUser } from '../../Interface';
import registerStyles from './Register.module.css';


interface StateLoginRegister {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

const Register: FC = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [startDate, setStartDate] = useState(new Date());
    const [img, setImg] = useState<any>(null);
    const [data, setData] = useState<DataUser>({
        hoTen: "",
        email: "",
        sdt: "",
        diaChi: "",
        password: "",
        ngaysinh: Date.toString(),
        error: ""
    })
    const [open, setOpen] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [values, setValues] = useState<StateLoginRegister>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const { hoTen, email, sdt, diaChi, password, error } = data




    

    const handleCloseFailure = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFailure(false);
    };

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
            setImg(event.target.result)
        };
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setData({ ...data, error: "" });
        if (!hoTen) {
            setData({ ...data, error: "Họ tên không được bỏ trống !" });
        } else if (!email) {
            setData({ ...data, error: "Email không được bỏ trống !" });
        } else if (!sdt) {
            setData({ ...data, error: "Số điện thoại không được bỏ trống !" });
        } else if (!diaChi) {
            setData({ ...data, error: "Địa chỉ không được bỏ trống !" });
        } else if (!password) {
            setData({ ...data, error: "Mật khẩu không được bỏ trống !" });
        } else if (password.length < 6) {
            setData({ ...data, error: "Mật khẩu phải có ít nhất 6 ký tự !" });
        } else if (!img) {
            setData({ ...data, error: "Bạn chưa thêm ảnh đại diện !" });
        }
        setLoading(true)
        //thêm dữ liệu vào database
        try {
            
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            //upload image
            const imgRef = ref(
                storege,
                `Avatar/${new Date().getTime()} - ${img.name}`
            );
            const snap = await uploadBytes(imgRef, img);
            const dlUrl = await getDownloadURL(ref(storege, snap.ref.fullPath));
            
            await setDoc(doc(firestore, "user", result.user.uid), {
                uid: result.user.uid,
                hoTen,
                email,
                sdt,
                diaChi,
                ngaysinh: startDate,
                createAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                avatar: dlUrl,
                avatarPath: snap.ref.fullPath,
                nguoidung: 'user',
                
            });
            setOpen(true);
            setLoading(false);
            
        } catch (err) {
            setOpenFailure(true);
            setLoading(false);
            // setData({ ...data });   
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        // navigate("/login");
    };

    //*  thực hiện render lại khi upload hình ảnh lên
    async function changeFile(e: any) {
        const file = e.target.files[0];
        setImg(file);
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = (event: any) => {
        //     setImg(event.target.result)
        // };
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const avataStyle = { backgroundColor: '#1bbd7e' }
    const headerStyle = { margin: 0, display: 'flex', justifyContent: 'center', padding: '20px', fontSize: '25px', fontWeight: 600 }

    


    return <Fragment>{user ? <Navigate to="/" /> : <Grid sx={{ minHeight: '788px' }}>
        <Paper elevation={20} className={registerStyles['register_Responsive']} >
            <Grid >
                <Avatar style={avataStyle} sx={{ display: 'flex', margin: 'auto' }}>
                    <IoIosAddCircle />
                </Avatar>
                <h1 style={headerStyle}>Đăng ký tài khoản</h1>
            </Grid>
            {error ? <Alert sx={{ marginBottom: '20px' }} severity="warning">{error}</Alert> : null}
            <form onSubmit={handleSubmit} style={{ paddingBottom: '20px' }}>
                <TextField sx={{ paddingBottom: '20px' }} onChange={handleChange} value={hoTen} type="text" name="hoTen" fullWidth label="Họ và tên" />
                <TextField sx={{ paddingBottom: '20px' }} onChange={handleChange} value={email} type="email" name="email" fullWidth label="Email" />
                <TextField sx={{ paddingBottom: '20px' }} onChange={handleChange} value={sdt} type="number" name="sdt" fullWidth label="Số điện thoại" />
                <TextField sx={{ paddingBottom: '20px' }} onChange={handleChange} value={diaChi} type="text" name="diaChi" fullWidth label="Địa chỉ" />
                <FormControl sx={{ width: '100%', paddingBottom: '20px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        name="password"
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color="success"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <div style={{ paddingBottom: '20px', display: 'flex' }}>
                    <div className={registerStyles['register_DatePicker']} >Ngày sinh :</div>
                    <DatePicker showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        className={registerStyles['react-datepicker-wrapper']}
                    />
                </div>
                <div style={{ clear: 'both' }}></div>
                <div style={{ display: 'flex', paddingBottom: '20px' }}>
                    <div className={registerStyles['register_DatePicker']}>
                        Avatar :
                    </div>
                    <input
                        name="hinhAnh"
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={changeFile}
                    />
                </div>
                <Button sx={{ padding: '10px', fontSize: '20px' }} type="submit" variant="contained" fullWidth color="success" disabled={loading} >{loading ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress color="success" />
                </Box> : "Đăng ký"}</Button>
            </form>
        </Paper>

        {/* đăng ký tài khoản thành công */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }} >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}  >
                Chúc mừng bạn đã đăng ký tài khoản thành công !
            </Alert>
        </Snackbar>
        {/* đăng ký tài khoản thất bại */}
        <Snackbar open={openFailure} autoHideDuration={6000} onClose={handleCloseFailure} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }} >
            <Alert onClose={handleCloseFailure} severity="warning" sx={{ width: '100%' }}  >
                Đăng ký tài khoản không thành công, có thể là do Email của bạn đã được đăng ký !
            </Alert>
        </Snackbar>
    </Grid>}
    </Fragment>
}

export default Register