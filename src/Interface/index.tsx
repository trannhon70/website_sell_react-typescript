//data user
export interface Data {
    avatar: string,
    createAt: createAtUt,
    avatarPath: string,
    diaChi: string,
    email: string,
    hoTen: string,
    isOnline: boolean,
    ngaysinh?: NgaySinh,
    sdt: string,
    uid?: string
    nguoidung:string
  }
  interface createAtUt {
    seconds?: string,
    nanoseconds?: string
  }
  interface NgaySinh {
    seconds?: string,
    nanoseconds?: string
  }

  //data tạo tài khoản user
export interface DataUser {
    hoTen: string,
    email: string,
    sdt: string,
    diaChi: string,
    password: string,
    ngaysinh: string,
    error: string,
}