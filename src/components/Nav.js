import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const[show,handleShow] = useState(false)
  const navigation = useNavigate()

  const transitionNavBar = ()=>{
    if(window.scrollY > 100){
      handleShow(true)
    }else{
      handleShow(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll",transitionNavBar)

    return ()=> window.removeEventListener("scroll",transitionNavBar)
  },[])
  return( 
  <div className={`nav ${show && 'nav_black'}`}>
    <div className="nav_contents">
    <img className="nav_logo" onClick={()=> navigation('/')}  src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
    <img className="nav_avatar" onClick={()=> navigation('/profile')} src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
    </div>
  </div>
  )
};

export default Nav;
