import { Avatar, Grid, Paper } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { auth, firestore } from "../../Firebase/firebase";
import { Data } from "../../Interface";
import NotPound from "../NotPound";
import personalStyle from './Personal.module.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const PersonalInformation: FC = () => {
  const naviga = useNavigate();

  const [data, setData] = useState<Data>();

  const user = useContext(AuthContext);

  useEffect(() => {
    if (auth.currentUser?.uid) {
      getDoc(doc(firestore as any, "user", auth.currentUser?.uid as any)).then((docSnap) => {
        if (docSnap.exists as any) {
          setData(docSnap.data() as Data);
        }
      });
    }
  }, [])

  const handleChangeQuanTri = () =>{
    naviga(`/${data?.uid}/admin`)
  }


  const avataStyle = { backgroundColor: '#1bbd7e' }
  const headerStyle = { margin: 0, display: 'flex', justifyContent: 'center', padding: '20px', fontSize: '25px', fontWeight: 600 }

  // console.log({data});
  
  return (user ? <Grid sx={{ minHeight: '788px' }}>
    <Paper elevation={20} className={personalStyle['profile']}>
      <Grid >
        <Avatar style={avataStyle} sx={{ display: 'flex', margin: 'auto', width: '100px', height: "100px" }}>
          <img style={{ borderRadius: '50%', height: '100%', objectFit: 'fill' }} src={data?.avatar} alt="" />
          
        </Avatar>
        <h1 style={headerStyle}>Thông tin cá nhân</h1>
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Họ và tên :</span> {data?.hoTen.toLocaleUpperCase()}
      </Grid>
      {/* <Grid sx={{ paddingBottom: "20px" }}>
        <span>Ngày sinh :</span> {moment(data?.ngaysinh?.seconds).subtract(10, "days").calendar()}
      </Grid> */}
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Địa chỉ :</span> {data?.diaChi.toLocaleUpperCase()}
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Số điện thoại :</span> {data?.sdt}
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Email :</span> {data?.email}
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Trạng thái :</span> {(() => {
          if (data?.isOnline) {
            return "online"
          }
        })()}
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Người dùng :</span> {(() => {
          if (data?.nguoidung === "user") {
            return "Là thành viên của cửa hàng"
          }else if (data?.nguoidung === "quantri"){
            return "Xin chào quản trị viên"
          }
        })()}
      </Grid>
     
     {(()=>{
        if(data?.nguoidung === "quantri"){
          return  <Button variant="contained" color="success" fullWidth onClick={handleChangeQuanTri} >Đến trang quản trị</Button>
        }
      })()}
    
    </Paper>
  </Grid> : <NotPound />
  )
}

export default PersonalInformation;