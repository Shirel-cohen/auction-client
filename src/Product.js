
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {TextField} from "@mui/material";
function Product (props){
    const navigate = useNavigate();
  /*  const product = {owner: "gel", productName:"computer" , img: "http" , date:"11/3/23"  , offers:"3" , myOffer: "2"}*/

    //const tender = {}


    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }


    return (
        <div style={{marginLeft: "70px"}}>

            <button onClick={logout}> Logout</button>
            <div>
                <TextField variant={"filled"} label={"Offer"} type={"number"}/>
            </div>

            <table>
                <th>Owner</th>
                <th>product</th>
                <th>Opened In</th>
                <th>Offers</th>
                <th>My Offers</th>
                <tr>
                    <td>{props.ownerOfTheProduct}</td>
                    <td>{props.productName}</td>
                    <td>{props.dateOpenTender}</td>
                    <td>{props.amountOfOffering}</td>
                    <td> -no mine offer in props</td>
                </tr>


            </table>
            <div>
                picture:
            </div>


        </div>
    );

}
export default Product;