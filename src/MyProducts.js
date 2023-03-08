import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";


function MyProducts(){
    const navigate = useNavigate();
    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
    ]
    useEffect(()=>{
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
        }
    },[])


    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }

    return(
        <div>
            <button onClick={logout}> Logout</button>
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

            <div>my product page</div>
        </div>
    )
}
export default MyProducts;