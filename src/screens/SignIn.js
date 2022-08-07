import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignIn.css";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const register = async (e) => {
    e.preventDefault();
    try {
      let user = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      let user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin">
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email Address"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="signin_button" type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signin_h4_grey">New to Netflix? </span>
          <span className="signin_h4_link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignIn;
