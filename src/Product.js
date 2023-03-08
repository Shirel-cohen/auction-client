
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function Product (){
    const navigate = useNavigate();

    //const tender = {}


    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }


    return(
        <div>
            <button onClick={logout}> Logout</button>
            <div>Product page</div>
            <table></table>

        </div>
    )

}
export default Product;