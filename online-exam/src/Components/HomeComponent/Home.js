
//  import style from "./Home.module.css";
//  import pic1 from "../../images/1.png";
//  import pic2 from "../../images/2.png";
//  import pic3 from "../../images/3.jpg";

//  import {NavLink} from "react-router-dom";


    
//     function Home(){
//         return(
//             <>
//                <div id={style.header}>
//                    <div id={style.headerHeadingBox}>
//                         <h3>Online Exam System</h3> 
//                     </div>
//                 </div>

//               <div id={style.div1}>
//                   <img src={pic1} alt="" />
//                   <span>Online Exam</span>
//               </div>


//               <div id={style.div2}>
            
//                   <div className ={style.div3}>
//                      <NavLink exact  to="/StudentLogin">
//                         <img src={pic2} alt="" />
//                         <span>Student</span>
//                      </NavLink>
//                   </div>

//                   <div  className ={style.div3}>
//                     <NavLink  to="/AdminLogin">
//                        <img src={pic3} alt="" />
//                        <span>Admin</span>
//                      </NavLink> 
//                   </div>
                
//               </div>


             

//             </>
//         );
//     }

     

//     export default Home;

import React, { useState } from 'react';
import style from './Home.module.css';
import pic1 from '../../images/1.png';
import pic2 from '../../images/2.png';
import pic3 from '../../images/3.jpg';
import { NavLink } from 'react-router-dom';

function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className={style.container}>
      {/* Navbar Section */}
      <nav className={style.navbar}>
        <div className={style.navContent}>
          <div className={style.navBrand}>
            <h1>Online Examination System</h1>
          </div>
          <ul className={style.navLinks}>
            <li><NavLink to="/" className={style.navLink}>Home</NavLink></li>
            <li className={style.dropdown} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <NavLink to="" className={style.navLink}>Features</NavLink>
              <div className={`${style.dropdownContent} ${dropdownOpen ? style.show : ''}`}>
                <NavLink to="/StudentLogin" className={style.dropdownLink}>Student Portal</NavLink>
                <NavLink to="/AdminLogin" className={style.dropdownLink}>Admin Dashboard</NavLink>
              </div>
            </li>
            <li><NavLink to="/ContactUs" className={style.navLink}>Contact Us</NavLink></li>
            <li><NavLink to="/" className={style.navLink}>About Us</NavLink></li>
          </ul>
        </div>
      </nav>

      {/* Header Section */}
      <header className={style.header}>
        <div className={style.headerContent}>
          <h1>Welcome to the Online Examination System</h1>
          <p>Efficient and Secure Examination Management Platform</p>
          <div className={style.buttonGroup}>
            <NavLink to="/StudentLogin" className={style.button}>
              Student Login
            </NavLink>
            <NavLink to="/AdminLogin" className={style.button}>
              Admin Login
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className={style.features}>
        <div className={style.featureItem}>
          <img src={pic1} alt="Online Exam Management" className={style.featureImage} />
          <div className={style.featureText}>
            <h2>Online Examination Management</h2>
            <p>Streamline the examination process with our secure, user-friendly system designed to manage all your examination needs.</p>
          </div>
        </div>

        <div className={style.featureList}>
          <div className={style.featureCard}>
            <NavLink to="/StudentLogin" className={style.featureLink}>
              <img src={pic2} alt="Student Portal" className={style.cardImage} />
              <h3>Student Portal</h3>
              <p>Access your exams, results, schedules, and more with a single click.</p>
            </NavLink>
          </div>

          <div className={style.featureCard}>
            <NavLink to="/AdminLogin" className={style.featureLink}>
              <img src={pic3} alt="Admin Dashboard" className={style.cardImage} />
              <h3>Admin Dashboard</h3>
              <p>Manage exams, students, reports, and data effortlessly.</p>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={style.footer}>
        <div className={style.footerContent}>
          <div className={style.footerLinks}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/ContactUs">Contact Us</NavLink>
            <a href="/online-exam-software">Tour</a>
            <a href="/online-test-platform">Features</a>
            <a href="/">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Online Examination System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
