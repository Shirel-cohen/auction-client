import {Link, NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import MenuPage from "./DefaultPage";
import {Alert} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Button, Zoom} from "@mui/material";

function MySuggestions (){
    const navigate = useNavigate();
    const[offersForUser, setOffersForUser] = useState([]);
   // const[auctions, setAuctions] = useState([]);
    const[username, setUsername] = useState("");

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
        axios.get("http://localhost:8080/get-all-offers-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setOffersForUser(response.data.offers)
                }
            })
    })


    //     const notify = () => {
    //     toast.success("hello",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
    // }

    return (
        <div className={"background"}>
            <div>
                <MenuPage me={"MySuggestions"} username = {username}/>
                {/*<Button  onClick={notify}>App</Button>*/}
                {/*<ToastContainer/>*/}
            </div>
            {offersForUser.length>0?
            <div>
                {
                    <table className={"statistics"}>
                        <tr className={"statistics"}>
                            <th className={"statistics"}>product name</th>
                            <th className={"statistics"}>amount of offer</th>
                            <th className={"statistics"}>auction status</th>
                            <th className={"statistics"}>offer status</th>
                        </tr>
                        {
                            offersForUser.map((offers) => {
                                return(
                                    <tr className={"statistics"}>
                                        <Link to={`/product/${offers.auctionId}`}>
                                            <td className={"statistics"}>{offers.productName}</td>
                                        </Link>
                                        <td className={"statistics"}>{offers.amountOfOffer}</td>
                                        <td className={"statistics"}>{offers.auctionStatus? "Open" : "Close" }</td>
                                        <td className={"statistics"}>{offers.offerStatus?"Won":"Didn't Win"}</td>
                                    </tr>
                                )
                            })

                        }

                    </table>
                }
            </div>  :
                <Alert  variant="outlined" severity="error">
                    <h1 style={{marginLeft:"600px"}}> You Didn't Place Any Offers Yet </h1>
                </Alert>

            }
        </div>
    );

}

export default MySuggestions;