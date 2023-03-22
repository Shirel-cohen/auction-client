import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import RenderProduct from "./RenderProduct";
import MenuPage from "./DefaultPage";
import {Button} from "@mui/material";


function MyProducts(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [auctionForUser, setAuctionForUser] = useState([]);


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
        <div className={"background"}>
            <div>
                <MenuPage me={"MyProducts"} username = {username}/>

            </div>
            {auctionForUser.length>0?
           <div  style={{alignItems: "center", justifyContent: "center", display: "flex"} }>
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

            }  </div> : <h1>You Have No Products Yet</h1> }
        </div>
    );
}
export default MyProducts;