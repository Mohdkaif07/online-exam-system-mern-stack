
 import Home from "./Components/HomeComponent/Home";
 
 import ResetPassword from "./Components/StudentComponent/StudentLogin/reset"; 
import StudentLogin from "./Components/StudentComponent/StudentLogin/StudentLogin";
import ForgotPassword from "./Components/StudentComponent/StudentLogin/ForgotPassword";
import AdminLogin from "./Components/AdminComponent/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/AdminComponent/AdminDashboard/AdminDashboard";
import StudentDashboard from "./Components/StudentComponent/StudentDashboard/StudentDashboard";
import ContactUs from './Components/HomeComponent/ContactUs'; // Updated import path

import {Route , BrowserRouter , Switch} from "react-router-dom";
import StudentSignup from "./Components/StudentComponent/StudentSignup/StudentSignup";

import { GoogleOAuthProvider } from '@react-oauth/google';



    function App(){
      return (
        <>
          <BrowserRouter>
              <Switch>
              <GoogleOAuthProvider clientId="431482101615-bk1trfmtbf1aoqm859lvvr47h60qcmpc.apps.googleusercontent.com">

                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/StudentLogin" component={StudentLogin}></Route>
                  <Route exact path="/StudentSignup" component={StudentSignup}></Route>
                  <Route exact path="/AdminLogin" component={AdminLogin}></Route>
                  <Route exact path="/AdminDashboard" component={AdminDashboard}></Route>
                  <Route exact path="/StudentDashboard" component={StudentDashboard}></Route>
                  <Route exact path="/ForgotPassword" component={ForgotPassword}></Route>
                  <Route exact path="/reset-password/:token" component={ResetPassword}></Route>
                  <Route exact path="/ContactUs" component={ContactUs}></Route>
                  </GoogleOAuthProvider>;
              </Switch>
          </BrowserRouter>
        </>
      );
     
    }

      

  export default App;