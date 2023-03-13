
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";
function Product (props){
    const navigate = useNavigate();



    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }
    const{id} = useParams();
    const[product, setProduct] = useState([]);



    useEffect(() => {
        axios.get("http://localhost:8080/get-product-by-id?id=" + id)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.auction)
                }
            })
    })


    return (
        <div style={{marginLeft: "70px"}}>

            <button onClick={logout}> Logout</button>
            <div>
                <TextField variant={"filled"} label={"Offer"} type={"number"}/>
            </div>
            <div></div>

            <table className={"statistics"}>
                <th className={"statistics"}>product name</th>
                <th className={"statistics"}>product image</th>
                <th className={"statistics"}>product description</th>
                <th className={"statistics"}>Date open auction</th>
                <th className={"statistics"}>amount of offering</th>
                <th className={"statistics"}>owner of the auction</th>
                <th className={"statistics"}>My Offers</th>
                <tr className={"statistics"}>
                    <td className={"statistics"} >{product.productName}</td>
                    <td className={"statistics"}><img src={product.productImage} alt="Girl in a jacket" width="500" height="600"/> </td>
                    <td className={"statistics"}>{product.productDescription}</td>
                    <td className={"statistics"}>{product.dateOpenTender}</td>
                    <td className={"statistics"}>{product.amountOfOffering}</td>
                    <td className={"statistics"} >{product.ownerOfTheProduct}</td>
                    <td className={"statistics"}>{product.getAmountOfOfferingForUser}</td>

                </tr>


            </table>
            <div>
                picture:
            </div>


        </div>
    );

}
export default Product;