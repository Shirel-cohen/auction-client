import Cookies from "js-cookie";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


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

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }

    return (
        <div>
            <button onClick={logout}> Logout</button>
                {
                    links.map((link) => {
                        return (
                            <button className={"Buttons"}>
                                <NavLink to={"../" + link.to}>
                                    {link.text}
                                </NavLink>
                            </button>
                        )
                    })
                }
           <br/><br/><br/>

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
                                   <tr className={"statistics"}>
                                       <Link to={`/product/${auction.id}`}>
                                       <td className={"statistics"}>{auction.productName}</td>
                                       </Link>
                                       <td className={"statistics"}>{auction.maxOfferAmount}</td>
                                       <td className={"statistics"}>{auction.open?"Yes":"No"}</td>
                                       <td><button>close auction</button></td>
                                   </tr>
                               )
                           })

                       }

                   </table>
               }




        </div>

    );
}
export default MyProducts;