
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import AuthProvider from "./Context/ContextProvider";
import AboutsUs from "./Pages/AboutUs";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Menu from "./Pages/Menu";
import NotPound from "./Pages/NotPound";
import PersonalInformation from "./Pages/PersonalInformation";
import Register from "./Pages/Register";
function App() {

  return (
    <AuthProvider>
      {/* khách hàng */}
      <BrowserRouter>
        {/* <div className="w-full h-auto flex flex-col bg-primary">
          <Header />
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full"> */}
        <Routes>
          <Route path="/" element={<Header />} >
            <Route path="/" element={<Home />} />
            <Route path="/information/:id" element={<PersonalInformation />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<AboutsUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotPound />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          
        </Routes>
        {/* </main>
        </div> */}
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
