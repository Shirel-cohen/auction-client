import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function Product (){
    const navigate = useNavigate();
    const links = [
        {to: "ManagePage", text: "Manage"},
        {to: "MySuggestions", text: "MY-SUGGESTIONS"},
        {to: "MyProducts", text: "MY-PRODUCTS"}
    ];


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
            <div>Product page</div>
        </div>
    )

}
export default Product;