import { Avatar, Grid, Paper } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { auth, firestore } from "../../Firebase/firebase";
import { Data } from "../../Interface";
import NotPound from "../NotPound";

const PersonalInformation: FC = () => {
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

  const paperStyle = { padding: '30px 20px', width: 500, margin: "20px auto" }
  const avataStyle = { backgroundColor: '#1bbd7e' }
  const headerStyle = { margin: 0, display: 'flex', justifyContent: 'center', padding: '20px', fontSize: '25px', fontWeight: 600 }


  

  return (user ? <Grid sx={{ minHeight: '788px' }}>
    <Paper elevation={20} style={paperStyle}>
      <Grid >
        <Avatar style={avataStyle} sx={{ display: 'flex', margin: 'auto', width: '100px', height: "100px" }}>
          <img style={{ borderRadius: '50%', height: '100%', objectFit: 'fill' }} src={data?.avatar} alt="" />
          
        </Avatar>
        <h1 style={headerStyle}>Thông tin cá nhân</h1>
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Họ và tên :</span> {data?.hoTen.toLocaleUpperCase()}
      </Grid>
      <Grid sx={{ paddingBottom: "20px" }}>
        <span>Ngày sinh :</span> {moment(data?.ngaysinh?.seconds).subtract(10, "days").calendar()}
      </Grid>
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
            return "Là quản lý của cửa hàng"
          }
        })()}
      </Grid>

    </Paper>
  </Grid> : <NotPound />
  )
}

export default PersonalInformation;