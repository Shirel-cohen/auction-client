import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Cookies from "js-cookie";

function MenuPage(){

    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
        {to:"MyProducts", text:"MY-PRODUCTS"},
        {to:"product", text:"PRODUCT"},
    ]
    const navigate=useNavigate();

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }
    return (

        <div>

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
                <button style={{padding: "10px", color: "#000"}} onClick={logout}> Logout</button>

            </ul>

        </div>

    );
}export default MenuPage;