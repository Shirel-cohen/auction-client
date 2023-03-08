import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {NavLink, useNavigate} from "react-router-dom";

function ManagePage () {
    const links=[
        {to:"dashboard", text:"Home"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
        {to:"MyProducts", text:"MY-PRODUCTS"}
    ]

    const[users, setUsers] = useState([]);
    const[tenders, setTenders] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                }
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8989/get-all-open-tenders")
            .then(response => {
                if (response.data.success) {
                    setTenders(response.data.tenders)
                }
            })
    }, [])

    const loginAs = (token) => {
        Cookies.set("token", token);
        navigate("../dashboard");
    }
    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }
    useEffect(()=>{
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
        }
    },[])

    return  (
        <div>
            <div  style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                <h1 style={{fontStyle:"italic"}}> Manage Page</h1>
            </div>
            <button style={{padding: "10px", color: "#000"}} onClick={logout}> Logout</button>

            <ul style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                {
                    links.map((link) => {
                        return (
                            <button className={"Buttons"}>
                                <NavLink to={"../" + link.to}>
                                    {link.text}
                                </NavLink>
                            </button>
                        )
                    })
                }
            </ul>

            <div style={{marginRight:"1700px"}}>
            Users: {users.length}
            <table>
                {
                    users.map((item) => {
                        return (
                                <tr>
                                    <td><button> {item.username}</button> </td>
                                </tr>


                        )
                    })
                }
            </table>
            </div>

            <div style={{marginLeft:"500px"}}>
                Tenders: {tenders.length}
                <table style={{marginLeft:"500px"}} >
                    {
                        tenders.map((item) => {
                            return (
                                <tr>
                                    <td><button> {item.productName}</button> </td>
                                </tr>

                            )
                        })
                    }
                </table>
            </div>


        </div>
    )
}

export default ManagePage;