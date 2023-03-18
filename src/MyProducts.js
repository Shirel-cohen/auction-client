import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import RenderProduct from "./RenderProduct";
import MenuPage from "./DefaultPage";


function MyProducts(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [auctionForUser, setAuctionForUser] = useState([]);
    const [credits, setCredits] = useState("");


    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
    ]
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

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-auction-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setAuctionForUser(response.data.auctions)
                }
            })
    })

    const closeAuction = (id) => {
        axios.post("http://localhost:8080/close-auction",null, {
            params:{
                auctionId: id
            }
        }).then(res => {
            if(res.data.errorCode==null){
                alert("Auction Closed!")
            }else if(res.data.errorCode== 1006){
                alert("There Are Not Enough Offers In This Auction!")
            }
        })
    }


    return (
        <div>
            <div>
                <h3>My Credits: {credits} </h3>

            </div>
            <MenuPage me={"MySuggestions"}/>
               {
                   <table className={"statistics"}>
                       <tr className={"statistics"}>
                           <th className={"statistics"}>product name</th>
                           <th className={"statistics"}>max offer</th>
                           <th className={"statistics"}>auction is open?</th>
                           <th className={"statistics"}></th>
                       </tr>
                       {
                           auctionForUser.map((auction) => {
                               return(
                                   <div>
                                       <RenderProduct product={auction} closeAuction={closeAuction} />
                                   </div>
                               )
                           })
                       }
                   </table>
               }
        </div>
    );
}
export default MyProducts;