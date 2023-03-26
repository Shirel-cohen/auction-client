import {useEffect, useState} from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";



function LoginPage () {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[type, setType] = useState("login");
    const[errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();
    const[amountOfUsers, setAmountOfUsers] = useState("");
    const[amountOfAuctions, setAmountOfAuctions] = useState("");
    const[amountOfOffers, setAmountOfOffers] = useState("");
    const[credits, setCredits] = useState("");


    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
        } else {
            navigate("../dashboard")
        }
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setAmountOfUsers(response.data.users.length)

                }
            })
    } )

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-auctions")
            .then(response => {
                if (response.data.success) {
                    setAmountOfAuctions(response.data.auctions.length)

                }
            })
    } )

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-offers")
            .then(response => {
                if (response.data.success) {
                    setAmountOfOffers(response.data.offers.length)

                }
            })
    } )

    useEffect(() => {
        axios.get("http://localhost:8080/get-credits-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setCredits(response.data.credits)
                }
            })
    })

    const usernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const passwordChanged = (event) => {
        setPassword(event.target.value);
    }

    const password2Changed = (event) => {
        setPassword2(event.target.value);
    }

    const typeChanged = (event) => {
        setType(event.target.value);
    }


    const submit = () => {
        if (type == "signUp") {
            axios.post("http://localhost:8080/sign-up", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    toast.success("You Have Signed Up Successfully",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
                    setUsername("");
                    setPassword("");
                    setPassword2("");
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })
        } else {
            axios.post("http://localhost:8080/login", null, {
                params: {username,  password}
            }).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    Cookies.set("token", response.data.token);
                    navigate("../dashboard")
                    setUsername("");
                    setPassword("");
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })

        }
    }
    return (
        <div className={"background"} >
            <div style={ { paddingTop:"20px",alignItems: "center", justifyContent: "center", display: "flex"}}>
                 <span  >
                     <input type={"radio"} name={"type"} value={"login"}  style={{color: 'white'}}
                            checked={type == "login"} onChange={typeChanged} />Login
                 </span >
                <input style={{ paddingLeft:"40px"}} type={"radio"} name={"type"} value={"signUp"}
                       checked={type == "signUp"} onChange={typeChanged}/>Sign Up
            </div> <br/>
            <div style={{ justifyContent: "center", display: "flex"}}>
                <table >
                    <tr>
                        <td  style={{color:"lightgreen"}}>
                            Username:
                        </td>
                        <td >
                            <TextField style={{backgroundColor:"papayawhip"}} color="success" type={"text"} value={username}
                            onChange={usernameChanged}  label="user name" variant="outlined"  />

                        </td>
                    </tr>
                    <tr >
                        <td style={{color:"lightgreen"}}>
                            Password:
                        </td>
                        <td>
                            <TextField style={{backgroundColor:"papayawhip"}} color="success" type={"password"} value={password} onChange={passwordChanged}  label="password"  variant="outlined" />
                        </td>
                    </tr>
                    {
                        type == "signUp" &&
                        <tr>
                            <td style={{color:"lightgreen"}}>Repeat Password:</td>
                            <td>
                                <TextField style={{backgroundColor:"papayawhip"}} color="success" type={"password"} value={password2} onChange={password2Changed}  id="myInput" label="Repeat password" variant="outlined" />

                            </td>
                            <td>
                                {
                                    password !== password2 &&

                                    <ErrorMessage message={"Passwords Don't match"} lineBreak={true}/>
                                }
                            </td>
                        </tr>
                    }

                </table>

            </div>
            {
                errorCode > 0 &&
                <ErrorMessage message={errorCode} lineBreak={true} isClickable={ password !== password2} />
            }
            <div   style={{alignItems: "center", justifyContent: "center", display: "flex" ,marginTop:"5px" ,marginBottom:"50px" }}>
                <Button size="large"color="success" variant="contained" onClick={submit} disabled={
                    (password !== password2 && type === "signUp") ||
                    username.length == 0
                }>{type === "signUp" ? "Sign Up" : "Login"} </Button>
                <ToastContainer/>

            </div>

            <div  style={{alignItems: "center", justifyContent: "center", display: "flex"} }>

                <table className={"rwd-table"} >
                    <tr>
                        <th colSpan="3" style={{height:"40px", fontSize:"20px", background:"papayawhip"}}>Statistics</th>
                    </tr>
                    <tr  style={{height:"30px", background:"floralwhite"}}>
                        <th>users</th>
                        <th>auctions</th>
                        <th>Offers made</th>
                    </tr>
                    <tr style={{height:"25px"}}>
                        <td>{amountOfUsers}</td>
                        <td>{amountOfAuctions}</td>
                        <td>{amountOfOffers}</td>
                    </tr>
                </table>

            </div>
        </div>


    )

}

export default LoginPage;