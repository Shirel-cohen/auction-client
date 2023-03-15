
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
    const[product, setProduct] = useState({});
    const[username, setUsername] = useState("");
    const[myOffers, setMyOffers]= useState([]);
    const[currentOffer, setCurrentOffer] = useState("");
    const[credits, setCredits] = useState("");




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
        axios.get("http://localhost:8080/get-credits-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setCredits(response.data.credits)
                }
            })
    })

    const offerChanged = (event) => {
        setCurrentOffer(event.target.value)
    }

    useEffect(() => {
        axios.get("http://localhost:8080/get-product-by-id?id=" + id)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.auction)
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
                ownOfProduct: product.ownerOfTheProduct,
                amountOfOffering : product.amountOfOffering + 1
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
            debugger
        }));
    }

    return (
        <div style={{marginLeft: "70px"}}>
            <div>
                <h3>My Credits: {credits}</h3>
            </div>

            <button onClick={logout}> Logout</button>
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
                    <td className={"statistics"}>{product.dateOpenTender}</td>
                    <td className={"statistics"} >{product.ownerOfTheProduct}</td>
                    <td className={"statistics"}>{product.amountOfOffering}</td>
                    <td className={"statistics"}>{product.minCost}</td>
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
            <img src={product.productImage} width={"400px"} height={"400px"} />
            {
                product.open?             <div>
                    <TextField variant={"filled"} label={"Offer"} type={"number"} value={currentOffer}
                               onChange={(e) => setCurrentOffer(e.target.value)}/>
                    <button onClick={sendOffer}>Place Offer</button>
                </div> : "Auction is Closed!"
            }
        </div>
    );

}
export default Product;