import Cookies from "js-cookie";
import {NavLink, useNavigate} from "react-router-dom";

function MyProducts(){
    const navigate = useNavigate();
    const links=[
        {to:"ManagePage", text:"Manage"},
        {to:"Product", text:"PRODUCT"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
    ]

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