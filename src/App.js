import React, { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./screens/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Profile from "./screens/Profile";
import MediaScreen from "./screens/MediaScreen";

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("L1   ", authUser);
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email,
        }))
      }else{
        dispatch(logout())
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path="/netflix-clone/" element={<HomeScreen />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/media" element={<MediaScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
