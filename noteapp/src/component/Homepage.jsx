import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Userlogout, checkAuth } from "../redux/LoginSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { IoHeartCircle } from "react-icons/io5";
import { IoHeartDislikeCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaCircleChevronDown } from "react-icons/fa6";
import sitting from "./assets/young man sitting on sofa with cat next to him.png";
import "./Home.css";
const Homepage = () => {
  const [ShowForm, setShowform] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.login);
  const isActive = auth?.isActive;
  const user = auth?.user;

  useEffect(() => {
    dispatch(checkAuth()); // 🔹 refresh panna backend la token check
  }, [dispatch]);

  //logout handle
  const handleLogout = () => {
    dispatch(Userlogout());
    navigate("/");
  };

  //menu
  const [menu, setMenu] = useState(false);
  const togglemenu = () => setMenu((prev) => !prev);

  //avatar
  const getInitialsAvatar = () => {
    const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";
    const colors = ["#FF5733", "#33C1FF", "#8E44AD", "#2ECC71", "#F1C40F"];
    const randomColor = colors[firstLetter.charCodeAt(0) % colors.length];

    return (
      <div className="avatar" style={{ backgroundColor: randomColor }}>
        {firstLetter}
      </div>
    );
  };
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handlefeedback = async (e) => {
    e.preventDefault();
    try {
      const feedback = await axios.post(
        "http://localhost:5000/api/userfeedback/feedback",
        {
          email: user?.email,
          report: message,
        },
        { withCredentials: true }
      );
      console.log("feedback:", feedback);
      setEmail("");
      setMessage("");
      setShowform(!ShowForm);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStart = () => {
    if (!user) {
      toast.error("❌ Please login to continue!");
      navigate("/login");
    } else if (!isActive) {
      toast.warning("⚠️ Please activate your account first!");
    } else {
      toast.success("🚀 Welcome! You can start now");
      navigate("/notes");
    }
  };
  const [ShowCategory, setCategory] = useState(false);
  return (
    <div className="home">
      <header>
        <div onClick={togglemenu} className="left">
          {menu ? (
            <IoMdCloseCircle className="close" />
          ) : (
            <IoMdMenu className="open" />
          )}
        </div>
        {menu && (
          <div className="profile">
            <div className="sub-profiles">
              <div className="side-profile">
                {user ? (
                  <p className="welcome-text">" Welcome back "</p>
                ) : (
                  <p className="welcome-text">Please login</p>
                )}

                <div className="profile-pic">{getInitialsAvatar()}</div>

                {user && (
                  <>
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </>
                )}

                <p>
                  {isActive ? (
                    <IoHeartCircle className="statu" />
                  ) : (
                    <IoHeartDislikeCircleSharp className="inactive-statu" />
                  )}
                </p>
              </div>
              <div className="info">
                <div className="dropdown-1">
                  <p
                    className="dropdown-btn-1"
                    onClick={() => setCategory((prev) => !prev)}
                  >
                    <span className="cat">
                      Category's{" "}
                      <FaCircleChevronDown
                        className={`arrow-1 ${ShowCategory ? "rotate" : ""}`}
                      />{" "}
                    </span>{" "}
                  </p>
                  {ShowCategory && (
                    <div className="links-1">
                      <Link to={"/notes/work"}>Work</Link>
                      <Link to={"/notes/personal"}>Personal</Link>
                      <Link to={"/notes/study"}>Study</Link>
                      <Link to={"/notes/idea"}>Idea</Link>
                    </div>
                  )}
                </div>
                <p className="delete" onClick={() => setShowform(true)}>
                  Help
                </p>
                <p className="delete">Delete Account</p>
                <p className="delete">Setting</p>
                <p className="delete">Contact</p>
                {isActive && (
                  <button className="logout-btn" onClick={handleLogout}>
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="right">
          <h1>Do Anything</h1>
          <div className="link">
            <Link to={"/notes/work"}>Work</Link>
            <Link to={"/notes/personal"}>Personal</Link>
            <Link to={"/notes/study"}>Study</Link>
            <Link to={"/notes/idea"}>Idea</Link>
          </div>
          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={() => setCategory((prev) => !prev)}
            >
              <span className="cate">
                Category's{" "}
                <TiArrowSortedDown
                  className={`arrow ${ShowCategory ? "rotate" : ""}`}
                />{" "}
              </span>{" "}
            </button>
            {ShowCategory && (
              <div className="links">
                <Link to={"/notes/work"}>Work</Link>
                <Link to={"/notes/personal"}>Personal</Link>
                <Link to={"/notes/study"}>Study</Link>
                <Link to={"/notes/idea"}>Idea</Link>
              </div>
            )}
          </div>
          <div className="right-1">
            <Link className="feed-help" onClick={() => setShowform(true)}>
              Help
            </Link>
            {ShowForm && (
              <div className="modal-overlay">
                <form action="" className="help-form" onSubmit={handlefeedback}>
                  <h3>Report Form</h3>
                  <div className="help">
                    <label htmlFor="">Email:</label>
                    <input
                      className="help-email"
                      type="text"
                      placeholder="Enter your email"
                      value={user?.email || ""}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="">Feed Back:</label>
                    <textarea
                      className="report"
                      type="text"
                      placeholder="Your login email will appear here"
                      value={message}
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button className="submit">Submit</button>
                </form>
              </div>
            )}
            <button onClick={() => navigate("/login")} className="login-btn">
              LogIn
            </button>
          </div>
        </div>
      </header>
      <div className="middle-page">
        <div className="middle-part">
          <div className="girl-sitting">
            <img src={sitting} alt="" />
          </div>
          <div>
            <h2 className="h2">
              All Your Tasks in <br /> One Place
            </h2>
          </div>
        </div>
        <p className="sub-head">
          Easily and simple tool for to-dos manage your personal tasks, family{" "}
          projects, and <br /> team’s work , reminders, and project planning All
          in one place.
        </p>
        <button className="button" onClick={handleStart}>
          Get Started. it's Free
        </button>
        <p className="free">Free Forever. No credit card.</p>
      </div>
      <IoAddCircle className="add-icon" onClick={() => navigate("/notes")} />
      {/* <NotesList /> */}
    </div>
  );
};

export default Homepage;
// <GiPlainCircle />import { GiPlainCircle } from "react-icons/gi";
