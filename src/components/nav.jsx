import "./compo.css";
import Swal from "sweetalert2";
import logo from "./assets/logoNav.svg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import ava from "./assets/users.png";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Nav(props) {
  const [isHover, setIsHover] = useState(false);
  const [search, setSearch] = useState([]);
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [showRegist, setShowRegist] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegist = () => setShowRegist(true);
  const handleCloseRegist = () => setShowRegist(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);

  const [eyeConfirm, setEyeConfirm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  window.addEventListener("scroll", () => {
    document
      .querySelector("nav")
      .classList.toggle("window-scroll", window.scrollY > 0);
  });
  const inputStyle = {
    width: "40%",
    height: "50%",
    color: "white",
    borderRadius: "25px",
  };
  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  };

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };

  const EyeConfirm = () => {
    if (passwordConfirm === "password") {
      setPasswordConfirm("text");
      setEyeConfirm(false);
      setTypeConfirm(true);
    } else {
      setPasswordConfirm("password");
      setEyeConfirm(true);
      setTypeConfirm(false);
    }
  };
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = async () => {
    // console.log(email);
    // console.log(pass);

    try {
      const res = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users/login",
        { email: email, password: pass }
      );
      // console.log(res.data.data);
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.data.first_name));
      localStorage.setItem("image", JSON.parse(res.data.data.image));
      localStorage.setItem("log", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setPass("");
      setEmail("");
      setShow(false);
      setLogin(true);

      Swal.fire("Horeee!", "Login Berhasil!", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau Password Salah!",
      });
    }
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setLogin(token);
    setLogin(true);
    const user = JSON.parse(localStorage.getItem("log"));
    setUser(user);
  }, [login]);

  // Regist
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");
  const onSubmitReg = async () => {
    try {
      const res = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users",
        {
          first_name: firstname,
          last_name: lastname,
          email: mail,
          password: pwd,
          password_confirmation: pwdConf,
        }
      );
      // console.log(res);
      setShowRegist(false);
      setShow(true);
      Swal.fire("Horeee!", "Regist Berhasil!", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau Password Salah!",
      });
    }
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to Log Out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Log Out Succes!", "", "success");
        setTimeout(function () {
          window.location.reload(1);
        }, 2000);
        localStorage.clear();
      } else if (result.isDenied) {
        Swal.fire("Gajadi", "", "info");
      }
    });
  };

  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let profile = localStorage.getItem("user");
  let image = localStorage.getItem("image");

  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return (
    <div>
      <nav>
        <div className="container nav_container">
          <div className="logo cursor-pointer">
            <img src={logo} alt="logo" onClick={() => navigate("/")} />
          </div>

          <Input
            type="text"
            className="seacrh bg-transparent     hover:border-red-700"
            style={inputStyle}
            placeholder="Search Movies"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            value={search.original_title}
            onKeyDown={(e) => handleKeyPressed(e)}
            onChange={(e) => setSearch(e.target.value)}
          />
          {token && login && token.length ? (
            <div className="wrapper flex flex-wrap space-x-4 items-center">
              {user.image || user.picture ? (
                <img
                  src={JSON.parse(image) || JSON.parse(user.picture)}
                  alt=""
                  className="w-7 rounded-full"
                />
              ) : (
                <img src={ava} alt="" className="w-7" />
              )}

              <h2 className="text-white text-xl ">
                Halo,
                {JSON.parse(profile)}
              </h2>

              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="items flex space-x-4">
              <Button variant="outline-danger" onClick={handleShow}>
                Login
              </Button>
              <Modal show={show} onHide={handleClose} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Login To Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Control
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      {email.match(regexEmail) === null ? (
                        <span className="text-rose-700 text-sm ">
                          Please Input A Valid Email
                        </span>
                      ) : (
                        ""
                      )}

                      <div className="icon icon-mail relative">
                        <i>
                          <AiOutlineMail />
                        </i>
                      </div>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3">
                      <Form.Control
                        type={password}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Password"
                        className={`  ${
                          type ? "type_password" : ""
                        } hover:border-rose-700`}
                      />
                      <div className="icon icon-eye-login absolute">
                        <i
                          onClick={Eye}
                          className={`fa ${
                            eye ? "fa-eye-slash" : "fa-thin fa-eye"
                          }`}
                        ></i>
                      </div>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleSubmit}>
                    Login
                  </Button>
                  <div className="signInDiv">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        // console.log(credentialResponse);
                        var decoded = jwt_decode(credentialResponse.credential);
                        // console.log(decoded);
                        localStorage.setItem(
                          "token",
                          JSON.stringify(credentialResponse.credential)
                        );
                        localStorage.setItem(
                          "image",
                          JSON.stringify(decoded.picture)
                        );
                        localStorage.setItem(
                          "user",
                          JSON.stringify(decoded.name)
                        );
                        localStorage.setItem("log", JSON.stringify(decoded));
                        setUser(decoded);
                        setLogin(true);
                        Swal.fire("Horeee!", "Login Berhasil!", "success");
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                </Modal.Footer>
              </Modal>
              {/* Modal Login */}

              {/* Modal Register */}
              <Button variant="danger" onClick={handleShowRegist}>
                Register
              </Button>
              <Modal show={showRegist} onHide={handleCloseRegist} size="md">
                <Modal.Header closeButton>
                  <Modal.Title>Create Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    {/* First Name */}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="first name"
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      <div className="icon icon-first absolute">
                        <i>
                          <AiOutlineUser />
                        </i>
                      </div>
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      <div className="icon icon-last absolute">
                        <i>
                          <AiOutlineUser />
                        </i>
                      </div>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Email Address"
                        className="hover:border-rose-700 focus:bg-rose-700"
                      />
                      {mail.match(regexEmail) === null ? (
                        <span className="text-rose-700 text-sm ">
                          Please Input A Valid Email
                        </span>
                      ) : (
                        ""
                      )}
                      <div className="icon icon-mail-regist absolute">
                        <i>
                          <AiOutlineMail />
                        </i>
                      </div>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3">
                      <Form.Control
                        type={password}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Password"
                        className={`  ${
                          type ? "type_password" : ""
                        } hover:border-rose-700`}
                      />
                      <div className="icon icon-eye absolute">
                        <i
                          onClick={Eye}
                          className={`fa ${
                            eye ? "fa-eye-slash" : "fa-thin fa-eye"
                          }`}
                        ></i>
                      </div>
                    </Form.Group>

                    {/* Password Confirm */}
                    <Form.Group className="mb-3">
                      <Form.Control
                        type={passwordConfirm}
                        onChange={(e) => setPwdConf(e.target.value)}
                        placeholder="Confirm Password"
                        className={`  ${
                          typeConfirm ? "type_password" : ""
                        } hover:border-rose-700`}
                      />
                      {/* {pwd === pwdConf ? (
                        <span className="text-rose-700 text-sm">
                          Password Confirmation Not same
                        </span>
                      ) : (
                        ""
                      )} */}
                      <div className="icon icon-eye-confirm absolute">
                        <i
                          onClick={EyeConfirm}
                          className={`fa ${
                            eyeConfirm ? "fa-eye-slash" : "fa-thin fa-eye"
                          }`}
                        ></i>
                      </div>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={onSubmitReg}>
                    Regist Now
                  </Button>
                  <Button variant="danger">Sign Up With Google</Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
