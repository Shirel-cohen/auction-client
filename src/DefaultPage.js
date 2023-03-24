import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

function MenuPage(props){

    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-OFFERS"},
        {to:"MyProducts", text:"MY-PRODUCTS"},
    ]
    const[credits, setCredits] = useState("");
    const username = props.username;

    const navigate=useNavigate();

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

            <ul style={{ marginTop:"0px", justifyContent: "center", display: "flex"}}>

                {
                    links.filter((item)=>{
                        return item.to!==props.me
                    }).map((link) => {
                        return (
                            <Button size="large" color="success"  variant="contained" style={{ margin:"35px"}}>
                                <NavLink style={{ color:"white"}} to={"../" + link.to}>
                                    {link.text}
                                </NavLink>
                            </Button>


                        )
                    })

                }

                <Button size="large" color="success" variant="contained" onClick={logout} style={{margin:"30px",position: "absolute", marginLeft:"1500px"}}> Logout</Button>

            </ul>
            <div style={{ fontSize:"20px",alignItems: "center", justifyContent: "center",display:"flex"}}>
                {props.me === "ManagePage"?
                    ""  : <h3>My Credits : {credits}$</h3>}            </div>
        </div>

    );
}export default MenuPage;