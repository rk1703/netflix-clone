import { signOut } from 'firebase/auth'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from '../components/Nav'
import './Profile.css'

const Profile = () => {
    const user = useSelector(selectUser)
  return (
    <div className='profile'>
        <Nav/>
        <div className="profile_body">
            <h1>Edit Profile</h1>
            <div className="profile_info">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                <div className="profile_details">
                    <h2>{user.email}</h2>
                    <div className='profile_user'>
                        <h3>User Details</h3>
                        
                        <button className='profile_signout' onClick={()=> signOut(auth)}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile