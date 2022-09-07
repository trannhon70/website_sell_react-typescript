import { SxProps, Theme } from '@mui/system';
export const SxHeader: SxProps<Theme> = {
    padding:'10px',
    "& .Header_Right":{
        textAlign:'end',
    },
    "& .isActive":{
        color:'black',
        backgroundColor:'#fff',
    },
    "& .header_Right_menu":{

    },
    "& .Header_Right_text":{
        float:'left',
    },
}