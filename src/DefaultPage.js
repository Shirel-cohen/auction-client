import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";

function MenuPage(props){

    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
        {to:"MyProducts", text:"MY-PRODUCTS"},
    ]

    const navigate=useNavigate();
    const[credits, setCredits] = useState("");
    const username = props.username;

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }

    useEffect(() => {
        axios.get("http://localhost:8080/get-credits-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setCredits(response.data.credits)
                }
            })
    })

    return (

        <div>

            <div>
                {props.me === "ManagePage"?
               ""  : <h3>My Credits : {credits}$</h3>}
            </div>

            <ul style={{alignItems: "center", justifyContent: "center", display: "flex"}}>

                {
                    links.filter((item)=>{
                        return item.to!==props.me
                    }).map((link) => {
                        return (

                            <Button variant="contained" className={"Buttons"}>
                                <NavLink to={"../" + link.to}>
                                    {link.text}
                                </NavLink>
                            </Button>
                        )
                    })

                }
                <Button variant="contained" onClick={logout}> Logout</Button>

            </ul>

        </div>

    );
}export default MenuPage;