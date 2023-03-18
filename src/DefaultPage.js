import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Cookies from "js-cookie";

function MenuPage(props){

    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
        {to:"MyProducts", text:"MY-PRODUCTS"},
    ]
      // links.filter((item)=>{
      //     return item.to===props.disable
      //     alert(links)
      // })
    const navigate=useNavigate();

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }
    return (

        <div>

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