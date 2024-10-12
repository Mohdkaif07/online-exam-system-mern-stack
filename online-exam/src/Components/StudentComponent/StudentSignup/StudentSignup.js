
import { NavLink , useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import style from "./StudentSignup.module.css";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;


function StudentSignup() {

    const [userData , setUserData] = useState({
       user_name: "",
       user_email: "",
       user_password: ""
      
    });

    function onTextFieldChange(e){
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        });
    }


     const [password , setPassword] = useState("");

     function handlePassword(e){
       setPassword( { "confirmPassword":e.target.value});
   }
   

   let history = useHistory();
   
  async function handleSignup(){
       // console.log(userData);


       if(userData.user_password === password.confirmPassword)
       {
          const response = await axios.post("http://localhost:5000/user/register", userData);
           console.log(response.data)
            if(response.data.status == 'ok'){

            alert("Your account has created");
            alert("Please Login");
            history.push("/StudentLogin");
            }
            else
            alert('email id already registerd!');

       }
       else alert("password did not match");
   }

//    async function handleSignup(event){
//         event.preventDefault()
//  
//    //  document.getElementsById("p").innerHTML ="Duplicate email found";
//              alert('email id already registerd!')


   return (
       <>  <div id={style.header}>
       <div id={style.headerHeadingBox}>
            <h3>Online Examination System</h3> 
        </div>
    </div>
       <div id={style.container}>

           <div id={style.formHeading}>
               <h1>Student Signup</h1>
               <p>Please complete the form below to register with us</p>
           </div>

           <div id={style.nameBox}>
               <label htmlFor="name">Name 
                   <input onChange={(e) => onTextFieldChange(e)} 
                   type="text" name="user_name"  required />
               </label>
           </div>


           <div id={style.emailBox}>
               <label htmlFor="email"> Email
                   <input onChange={(e) => onTextFieldChange(e)}  
                   type="text" name="user_email" required />
               </label>
           </div>

           <div id={style.passwordBox}>
               <label htmlFor="password"> Password
                   <input onChange={(e) => onTextFieldChange(e)} 
                   type="password" name="user_password" required />
               </label>
           </div>


           <div id={style.confirmPasswordBox}>
               <label htmlFor="confirmPassword">Confirm Password
                   <input  onChange={(e) => handlePassword(e)}
                    type="password" name="confirmPassword" required />
               </label>
           </div>


           {/* <button id={style.signup} onclick="signup()">Sign Up</button> */}
           <button id={style.signup} onClick={handleSignup} >Sign Up</button>

           <div style={{ display: 'flex', justifyContent: 'center' }}>
            
            <GoogleLogin
        onSuccess={credentialResponse => {
            
             const credentialResponseDecode = jwtDecode(credentialResponse.credential);
             if(credentialResponseDecode){
                history.push("/StudentDashboard");
             }
             console.log(credentialResponseDecode);
          }}
        onError={() => {
          console.log('Login Failed');
         }}
          />
        </div>
           <div id={style.login}>
               Have a Account?  <NavLink exact to="/StudentLogin"> Log in</NavLink><hr></hr>
               <NavLink id={style.goBackLink} exact to="/"> Go Back</NavLink> 
           </div>

       </div>
       </>
   );
}

export default StudentSignup;