import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";
import MenuPage from "./DefaultPage";
import {toast, ToastContainer} from "react-toastify";
function Product (){

    const{id} = useParams();
    const[product, setProduct] = useState({});
    const[username, setUsername] = useState("");
    const[myOffers, setMyOffers]= useState([]);
    const[currentOffer, setCurrentOffer] = useState("");
    const navigate = useNavigate();




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
                toast.success("Offer Uploaded",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
            }else if(res.data.errorCode== 1010){
                toast.error("Not Enough Credits In Your Account!",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
            }
            else if(res.data.errorCode== 1011) {
                toast.error("You Already Submitted An Higher Offer!",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
            }
            else if(res.data.errorCode== 1012) {
                toast.error("Your Offer Is Lower Than The Minimal Cost!",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
            }
            else if(res.data.errorCode==1013){
                toast.warning("You are the owner of the product, you can't make an offer",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
            }
        }));
    }

    return (
        <div className={"background"}>

            <div>
                <MenuPage me={""} username = {username}/>
            </div>

            <table className={"rwd-table"}style={{width:"850px"}}>
                <tr  style={{height:"30px", background:"floralwhite"}}>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Date Of Auction Opening</th>
                    <th>Owner Of The Product</th>
                    <th>Amount Of Offerings</th>
                    <th>Minimal Cost</th>
                </tr>
                <tr>
                    <td >{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{product.auctionOpeningDate}</td>
                    <td >{product.ownerOfProduct}</td>
                    <td>{product.amountOfOfferingOnProduct}</td>
                    <td >{product.minimalCost}</td>
                </tr>
            </table>
            <div>
                <div>
                    <table className={"rwd-table"} style={{width:"300px",position:"absolute", top:"335px",left:"1100px"}} >
                        <tr style={{height:"30px", background:"floralwhite"}}>
                            <th> My Previous Offers </th>
                        </tr>
                            {
                                myOffers.map(offer =>{
                                    return(<tr><td>{offer}</td></tr>)
                                })
                            }

                    </table>
                </div>

            </div>
            <img src={product.image} width={"300px"} height={"300px"} style={{position:"absolute",top:"350px",left:"700px"}}/>
            {
                product.open?             <div>
                    <TextField style={{backgroundColor:"papayawhip" ,position:"absolute",top: "350px" , left: "430px"}} color="success" variant={"filled"} label={"Offer"} type={"number"} value={currentOffer}
                               onChange={(e) => setCurrentOffer(e.target.value)}/>
                    <Button size="large" color="success" variant="contained" onClick={sendOffer} disabled={currentOffer.length==0} style = {{position: "absolute", top: "430px",left:"430px"}}>Place Offer</Button>
                    <ToastContainer/>
                </div> : <h2 style={{marginTop : "350px"}}>Auction is Closed!</h2>
            }
        </div>
    );

}
export default Product;