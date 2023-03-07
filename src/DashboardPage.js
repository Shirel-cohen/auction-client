import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {NavLink} from "react-router-dom";

function DashboardPage () {
    const links=[
      {to:"ManagePage", text:"Manage"},
      {to:"Product", text:"PRODUCT"},
      {to:"MySuggestions", text:"MY-SUGGESTIONS"},
      {to:"MyProducts", text:"MY-PRODUCTS"}
  ]

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
            axios.get("http://localhost:8080/get-username?token=" + token).then((res) => {
                setUsername(res.data.username);
            });
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-open-tenders")
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
                <button onClick={logout}> Logout</button>
            </div>
             <ul>
                {
                    links.map((link)=>{
                        return(
                            <button className={"Buttons"}>
                                <NavLink to={"../"+ link.to}>
                                    {link.text}
                                </NavLink>
                            </button>
                        )
                    })
                }
            </ul>

            <div>dashboard page</div>


        </div>
    )
}

export default DashboardPage;