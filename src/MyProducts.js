import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import ErrorMessage from "./ErrorMessage";
import {Button} from "@mui/material";


function MyProducts(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [auctionForUser, setAuctionForUser] = useState([]);
    const [maxOffer, setMaxOffer] = useState("");

    const links=[
        {to:"dashboard", text:"Home"},
        {to:"ManagePage", text:"Manage"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
    ]
    useEffect(()=>{
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
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
    // useEffect(() => {
    //     axios.get("http://localhost:8080/get-max-offer-for-product" + username)
    //         .then(response => {
    //             if (response.data.success) {
    //                 setAuctionForUser(response.data.auctions)
    //             }
    //         })
    // })


    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }

    // return(
    //     <div>
    //         <button onClick={logout}> Logout</button>
    //         <ul>
    //             {
    //                 links.map((link)=>{
    //                     return(
    //                         <button className={"Buttons"}>
    //                             <NavLink to={"../"+ link.to}>
    //                                 {link.text}
    //                             </NavLink>
    //                         </button>
    //                     )
    //                 })
    //             }
    //         </ul>
    //
    //         <div>
    //             {auctionForUser.map((auction) => {
    //                 return (
    //                     <table className={"statistics"}>
    //
    //                         <tr className={"statistics"}>
    //                             <th className={"statistics"}>product name</th>
    //                             <th className={"statistics"}>max offer</th>
    //                             <th className={"statistics"}>is open?</th>
    //                         </tr>
    //                         <tr className={"statistics"}>
    //                             <td className={"statistics"}>{auction.productName}</td>
    //                             <td className={"statistics"}>a</td>
    //                             <td className={"statistics"}>a</td>
    //                         </tr>
    //                         })
    //
    //                         }
    //                     </table>
    //
    //                 )
    //             })
    //             }
    //
    //         </div>
    //     </div>
    //
    // )
    return (
        <div>

            {

                    <table className={"auctionTable"} id={"myTable"}>
                        <tr>

                                 <th>productName</th>
                                <th>Image</th>

                        </tr>

                            {
                                auctionForUser.map((auction) => {
                                    return (
                                        <tr className={"wpos"}>

                                            <td>b</td>
                                            <td>a</td>


                                        </tr>

                                    );


                                })
                            }
                        </table>
                }

        </div>

    );
}
export default MyProducts;