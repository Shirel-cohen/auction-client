import {NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

function MySuggestions (){
    const navigate = useNavigate();
    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MyProducts", text:"MY-PRODUCTS"}
    ]
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

    return (
        <div>
            <button onClick={logout}> Logout</button>
            <ul>
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
            <div>
                mySuggest page
            </div>


        </div>
    );

}

export default MySuggestions;