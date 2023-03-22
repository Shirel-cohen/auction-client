import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";
import MenuPage from "./DefaultPage";

function Product (props){

    const navigate = useNavigate();
    const{id} = useParams();
    const[product, setProduct] = useState({});
    const[username, setUsername] = useState("");
    const[myOffers, setMyOffers]= useState([]);
    const[currentOffer, setCurrentOffer] = useState("");


    useEffect(()=>{
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
        }else{
            axios.get("http://localhost:8080/get-username?token=" + token).then((res) => {
                setUsername(res.data.username);
            });
        }
    },[])

    useEffect(() => {
        axios.get("http://localhost:8080/get-product-by-id?id=" + id)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.productPage)
                }
            })
    })

    useEffect(() => {
        axios.get("http://localhost:8080/get-my-offers-on-product?username=" +username +"&productName="+ product.productName )
            .then(response => {
                if (response.data.success) {
                    setMyOffers(response.data.offers)
                }
            })
    })

    const sendOffer = () => {
        axios.post("http://localhost:8080/send-offer",null,{
            params: {
                ownOfOffer: username,
                productName: product.productName,
                amountOfOffer: currentOffer,
                ownOfProduct: product.ownerOfProduct,
                amountOfOffering : product.amountOfOfferingOnProduct + 1
               // amountOfOfferingForUser: product.amountOfOfferingOnProductForUser+1
            }}).then((res => {
            if(res.data.errorCode==null){
                alert("Offer Uploaded")
            }else if(res.data.errorCode== 1010){
                alert("Not Enough Credits In Your Account!")
            }
            else if(res.data.errorCode== 1011) {
                alert("You Already Submitted An Higher Offer!")
            }
            else if(res.data.errorCode== 1012) {
                alert("Your Offer Is Lower Than The Minimal Cost!")
            }
            else if(res.data.errorCode==1013){
                alert("You are the owner of the product, you can't make an offer")
            }
        }));
    }

    return (
        <div style={{marginLeft: "70px"}}>

            <div>
                <MenuPage me={""} username = {username}/>
            </div>

            <div></div>
            <table className={"statistics"}>
                <th className={"statistics"}>Product Name</th>
                <th className={"statistics"}>Product Description</th>
                <th className={"statistics"}>Date Of Auction Opening</th>
                <th className={"statistics"}>Owner Of The Product</th>
                <th className={"statistics"}>Amount Of Offerings</th>
                <th className={"statistics"}>Minimal Cost</th>
                <tr className={"statistics"}>
                    <td className={"statistics"} >{product.productName}</td>
                    <td className={"statistics"}>{product.productDescription}</td>
                    <td className={"statistics"}>{product.auctionOpeningDate}</td>
                    <td className={"statistics"} >{product.ownerOfProduct}</td>
                    <td className={"statistics"}>{product.amountOfOfferingOnProduct}</td>
                    <td className={"statistics"}>{product.minimalCost}</td>
                </tr>
            </table>
            <div>
                <h4>My Previous Offers Amount</h4>
                <div>
                    <ul>
                        {
                            myOffers.map(offer =>{
                                return(<li>{offer}</li>)
                            })
                        }
                    </ul>
                </div>
                <ul className={"statistics"}>
                </ul>
            </div>
            <div>
                picture:
            </div>
            <img src={product.image} width={"400px"} height={"400px"} />
            {
                product.open?      <div>
                    <TextField variant={"filled"} label={"Offer"} type={"number"} value={currentOffer}
                               onChange={(e) => setCurrentOffer(e.target.value)}/>
                    <Button variant="contained" onClick={sendOffer} disabled={currentOffer.length==0}>Place Offer</Button>
                </div> : "Auction is Closed!"
            }
        </div>
    );

}
export default Product;