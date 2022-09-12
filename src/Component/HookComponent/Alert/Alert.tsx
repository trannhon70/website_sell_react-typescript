
import { forwardRef } from "react"
import MuiAlert, { AlertProps } from '@mui/material/Alert';

 const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props:any,
    ref:any,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Alert;