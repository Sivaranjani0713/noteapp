import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { registerUser } from "../redux/RegisterSlice";
import { useDispatch } from "react-redux";
import "./register.css";

const Registerform = () => {
  const [errors] = useState({
    name: { required: false },
    email: { required: false },
    password: { required: false },
  });
  const [createRegister, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loading, successfully, error, message } = useSelector(
  //   (state) => state.notes
  // );
  const handleChangeInput = (event) => {
    setRegister({ ...createRegister, [event.target.name]: event.target.value });
  };

  const handleSubmittoSign = async (e) => {
    e.preventDefault();
    if (
      !createRegister.name ||
      !createRegister.email ||
      !createRegister.password
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      await dispatch(
        registerUser({
          name: createRegister.name,
          email: createRegister.email,
          password: createRegister.password,
        })
      );
      navigate("/login");
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };
  // const handleproduct = () => {
  //   navigate("/product");
  // };
  // useEffect(() => {
  //   // createRegister();
  //   dispatch(registerUser(createRegister));
  // }, [dispatch]);
  return (
    <div className="main">
      <div className="all">
        <h1>Register</h1>
        <form action="">
          {/* <div className="btns">
          {" "}
          <button>Login</button>
          <button>Signup</button>
        </div> */}
          <div className="inputs">
            <div className="user">
              <label htmlFor="">Name:</label>
              <input
                className="reg-name"
                type="text"
                placeholder="Enter your Username"
                name="name"
                value={createRegister.name}
                onChange={handleChangeInput}
                required={true}
              />
              {errors.name.required === true ? (
                <span>name is required</span>
              ) : null}
            </div>
            <div className="user">
              <label htmlFor="">Email:</label>
              <input
                className="reg-name"
                type="text"
                placeholder="Enter your Email"
                name="email"
                value={createRegister.email}
                onChange={handleChangeInput}
                required={true}
              />
              {errors.email.required === true ? (
                <span>email is required</span>
              ) : null}
            </div>
            <div className="user">
              <label htmlFor="">Password:</label>
              <input
                className="reg-name"
                type="text"
                placeholder="Password"
                name="password"
                value={createRegister.password}
                onChange={handleChangeInput}
                required={true}
              />
              {errors.password.required === true ? (
                <span>password is required</span>
              ) : null}
            </div>
          </div>
          {/* <button>SignUp</button> */}
          <button className="signup" onClick={handleSubmittoSign}>
            Create Account
          </button>
        </form>
        {/* <div className="middle">
          <hr />
          or
          <hr />
        </div> */}
        {/* {loading === "loading" && <p>Loading...</p>}
      {successfully === "succeeded" && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} */}
        <p className="forget">
          Already have an account?{" "}
          <Link className="nav-link" to={"/login"}>
            {" "}
            LogIn
          </Link>
        </p>
      </div>
      {/* <button onClick={handleproduct}>Product</button> */}
    </div>
  );
};

export default Registerform;
