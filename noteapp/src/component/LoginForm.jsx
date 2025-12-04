import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/LoginSlice";
import "./login.css";

const Loginform = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setlogin((olduser) => {
      return {
        ...olduser,
        [name]: value,
      };
    });
  };
  const handleSubmittoLogin = async (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email: login.email, password: login.password })).then(
      (noteresponse) => {
        if (noteresponse.meta.requestStatus === "fulfilled") {
          navigate("/home");
        }
      }
    );
  };
  // useEffect(() => {
  //   dispatch(LoginUser());
  // }, [dispatch]);
  return (
    <div className="main">
      <div className="all">
        <h1>Login Form</h1>
        <form action="">
          {/* <div className="btns">
          <button>Login</button>
          <button>Signup</button>
        </div> */}
          <div className="inputs">
            <div className="user">
              <label htmlFor="">Email</label>
              <input
                className="reg-name"
                type="text"
                name="email"
                placeholder="Email Address"
                value={login.email}
                onChange={onchangeHandle}
              />
            </div>
            <div className="user">
              <label htmlFor="">Password</label>
              <input
                className="reg-name"
                type="text"
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={onchangeHandle}
              />
            </div>
            <Link className="nav-link">Forget password?</Link>
          </div>
          <button
            type="submit"
            className="signup"
            onClick={handleSubmittoLogin}
          >
            LogIn
          </button>
          {status === "Loading" && <p>Loading...</p>}
          {/* {error && <p>{error}</p>} */}
          <p className="forget">
            If you don't have Account?{" "}
            <Link className="nav-link" to={"/"}>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
