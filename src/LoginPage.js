import {useEffect, useState} from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


function LoginPage () {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[type, setType] = useState("login");
    const[errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
        } else {
            navigate("../dashboard")
        }
    }, [])

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
                    alert ("OK")
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
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })

        }
    }

    return (
        <div style={{marginLeft: "1000px"} }>
            <div>
                 <span  >
                     <input type={"radio"} name={"type"} value={"login"}
                            checked={type == "login"} onChange={typeChanged} />Login
                 </span >
                 <input type={"radio"} name={"type"} value={"signUp"}
                               checked={type == "signUp"} onChange={typeChanged}/>Sign Up
            </div>
            <table>
                <tr>
                    <td>
                        Username:
                    </td>
                    <td>
                        <input type={"text"} value={username} onChange={usernameChanged}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input type={"password"} value={password} onChange={passwordChanged}/>
                    </td>
                </tr>
                {
                    type == "signUp" &&
                    <tr>
                        <td>Repeat Password:</td>
                        <td><input type={"password"} value={password2} onChange={password2Changed}/></td>
                        <td>
                            {
                                password != password2 &&
                                <ErrorMessage message={"Passwords Don't match"} lineBreak={true}/>
                            }
                        </td>
                    </tr>
                }

            </table>

            {
                errorCode > 0 &&
                <ErrorMessage message={errorCode} lineBreak={true}/>
            }
            <button  onClick={submit} disabled={
                (password != password2 && type == "signUp") ||
                username.length == 0
            }>{type == "signUp" ? "Sign Up" : "Login"}</button>

            <div>
                Statistics
                <table className={"statistics"}>
                    <tr className={"statistics"}>
                        <th className={"statistics"}>users</th>
                        <th className={"statistics"}>tender</th>
                        <th className={"statistics"}>Offers made</th>
                    </tr>
                    <tr className={"statistics"}>
                        <td className={"statistics"}>a</td>
                        <td className={"statistics"}>b</td>
                        <td className={"statistics"}>c</td>
                    </tr>
                </table>

            </div>
        </div>


    )


}

export default LoginPage;