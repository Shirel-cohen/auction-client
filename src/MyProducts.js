import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import RenderProduct from "./RenderProduct";
import MenuPage from "./DefaultPage";
import {Alert, Button} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";


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
                toast.success("Auction Closed!" , { className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
            }else if(res.data.errorCode== 1006){
                toast.error("There Are Not Enough Offers In This Auction!" , { className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
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
                                      <div>
                                           <RenderProduct product={auctionForUser} closeAuction={closeAuction} />
                                          <ToastContainer/>
                                      </div>

            }  </div> :  <Alert  variant="filled" severity="error"  style = {{backgroundColor: "papayawhip", marginTop:"20px", scale: "80%"}}>
                    <h1 style={{marginLeft:"600px"}}> You Don't Have Any Products Yet </h1>
                </Alert> }
        </div>
    );
}
export default MyProducts;