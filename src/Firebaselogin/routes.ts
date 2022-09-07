import IRoute from "../Interfaces/routes";
import Register from "../Pages/Register";
import Home from './../Pages/Home/index';


const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        exact: true,
        component: Register,
        name: 'Register Page',
        protected: false
    },
    // {
    //     path: '/login',
    //     exact: true,
    //     component: LoginPage,
    //     name: 'Login Page',
    //     protected: false
    // },
    // {
    //     path: '/change',
    //     exact: true,
    //     component: ChangePasswordPage,
    //     name: 'Change Password Page',
    //     protected: true
    // },
    // {
    //     path: '/logout',
    //     exact: true,
    //     component: LogoutPage,
    //     name: 'Logout Page',
    //     protected: true
    // },
    // {
    //     path: '/forget',
    //     exact: true,
    //     component: ForgotPasswordPage,
    //     name: 'Forgot Password Page',
    //     protected: false
    // },
    // {
    //     path: '/reset',
    //     exact: true,
    //     component: ResetPasswordPage,
    //     name: 'Reset Password Page',
    //     protected: false
    // }
];

export default routes;