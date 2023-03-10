
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
                    setMyOffers(response.data.listOfMyOffers)
                }
            })
    })

    const sendOffer = () => {
        axios.post("http://localhost:8080/send-offer",null,{
            params:{
                ownOfOffer : username,
                productName : product.productName,
                amountOfOffer: currentOffer,
                ownOfProduct: product.ownerOfTheProduct
            }
        }).then((res => {
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
        }));
    }

    return (
        <div style={{marginLeft: "70px"}}>

            <button onClick={logout}> Logout</button>
            <div></div>
            <table className={"statistics"}>
                <th className={"statistics"}>Product Name</th>
                <th className={"statistics"}>Product Description</th>
                <th className={"statistics"}>Date Of Auction Opening</th>
                <th className={"statistics"}>Owner Of The Product</th>
                <th className={"statistics"}>Amount Of Offerings</th>
                <th className={"statistics"}>My Offers On The Product </th>
                <tr className={"statistics"}>
                    <td className={"statistics"} >{product.productName}</td>
                    <td className={"statistics"}>{product.productDescription}</td>
                    <td className={"statistics"}>{product.dateOpenTender}</td>
                    <td className={"statistics"} >{product.ownerOfTheProduct}</td>
                    <td className={"statistics"}>{product.amountOfOffering}</td>
                    <td className={"statistics"}>{myOffers}</td>
                </tr>
            </table>
            <div>
                picture:
            </div>
            <img src={product.productImage} width={"400px"} height={"400px"} />
            {
                product.open?             <div>
                    <TextField variant={"filled"} label={"Offer"} type={"number"} onChange={offerChanged}/>
                    <button onClick={sendOffer}>Place Offer</button>
                </div> : "Auction is Closed!"
            }
        </div>
    );

}
export default Product;