import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Message from "./Message";

function DashboardPage () {

    const[username, setUsername] = useState("");
    const[tenders, setTenders] = useState([]);
    const[token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login");
        } else {
            setToken(token);
            axios.get("http://localhost:8989//get-username" , (res)=> {
                    setUsername(res.data.username);
                })
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8989/get-all-open-tenders")
            .then(response => {
                if (response.data.success) {
                    setTenders(response.data.tenders)
                }
            })
    }, [])

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }


    return (
        <div>
            <div id={"header"}>

                Hello {username}
                <button onClick={logout}>Logout</button>
            </div>
            <div id={"page"}>

            </div>
        </div>
    )
}

export default DashboardPage;