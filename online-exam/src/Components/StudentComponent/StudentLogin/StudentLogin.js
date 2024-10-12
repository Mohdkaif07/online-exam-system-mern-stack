
//   import style from "";
import style from "./StudentLogin.module.css";
import { jwtDecode } from "jwt-decode";
import {NavLink , useHistory} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';


 import {useState} from "react" ;
 import axios from "axios";



   function StudentLogin(){

      const [user , setUser] = useState({
          user_email:"",
          user_password:""
      });

      function onTextFieldChange(e){
          setUser({
              ...user ,
              [e.target.name] : e.target.value
          });
      }


        let history = useHistory();

        const [check, setCheck]  = useState(false);


    async function handleLogin()
     {
      //   console.log(user);
        const value = await axios.post("http://localhost:5000/user/login",user);
              // const data = await value.json();
              console.log(value.data)
          //  for(let i=0 ;i<value.data.length ; i++)
          //  {
          //     if( value.data[i].user_email === user.user_email &&
          //        value.data[i].user_password === user.user_password)
              if(value.data.status=="ok"){
                  setCheck(true);
                 alert("success");
                 sessionStorage.setItem("user" , user.user_email);
                 history.push("/StudentDashboard");
              }
          //  }
          //  if(check)
          else
           alert(" Wrong User Email or password");
      }
      //   async function handleLogin(event){
      //   event.preventDefault()
      //   const response = await fetch('http://localhost:3333/user/login', {
      //   headers: {
      //     'Content-Type':'application/JSON',
      //   },
      //   method: 'POST',
      //   body : JSON.stringify({
      //     // name,
      //     user.user_email,
      //     user.user_password,
      //   }),
      //   })
      
      //   const data = await response.json()
      //   if(data.user) {
      //           setCheck(true);
      //                   alert("success");
      //                   sessionStorage.setItem("user" , user.user_email);
      //                     history.push("/StudentDashboard");
      //   }if(check)
      //  alert(" Wrong User Email or password");
      //   console.log(data)
        
      // }



       return(
          <>
            <div id={style.header}>
                 <div id={style.headerHeadingBox}>
                      <h3><a href="/">Online Examination System</a></h3> 
                  </div>
              </div>
          <div id={style.container}>

              <div id={style.containerHeadingBox}>
                  <h1>Student Login</h1>
              </div>

             <div id={style.emailBox}>
                 <label htmlFor="email"> Email
                     <input name="user_email" 
                     onChange={(e) => onTextFieldChange(e)} type="text" id={style.email} />
                 </label>
             </div>


             <div id={style.passwordBox}>
                 <label htmlFor="password"> Password
                   <input name="user_password" 
                    onChange={(e) => onTextFieldChange(e)} type="password" id={style.password} />
                 </label>
             </div>


             <button id={style.login} onClick={handleLogin}>Login</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            
                <GoogleLogin
            onSuccess={credentialResponse => {
                
                 const credentialResponseDecode = jwtDecode(credentialResponse.credential);
                 sessionStorage.setItem("credentialResponseDecode", JSON.stringify(credentialResponseDecode));
                 if(credentialResponseDecode){
                    history.push("/StudentDashboard");
                 }
                 const savedData = sessionStorage.getItem('credentialResponseDecode');
                 const parsedData = JSON.parse(savedData); // Parse the retrieved string back to an object or array
                 console.log(parsedData); // Outputs the parsed data (or null if not found)
                 console.log(credentialResponseDecode);
              }}
            onError={() => {
              console.log('Login Failed');
             }}
              />
            </div>

            <div id={style.signup}>
                <NavLink exact to="/ForgotPassword">Forgot Password </NavLink> <br></br>
               New to Portal?  <NavLink exact to="/StudentSignup"> Register</NavLink> 
               <NavLink id={style.goBackLink} exact to="/"> Go Back</NavLink> 
            </div>
           

             </div>
             
             </>
       ); 
   }

   export default StudentLogin;