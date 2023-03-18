import {Link, NavLink} from "react-router-dom";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import MenuPage from "./DefaultPage";

function MySuggestions (){
    const navigate = useNavigate();
    const[offersForUser, setOffersForUser] = useState([]);
    const[username, setUsername] = useState("");
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
        axios.get("http://localhost:8080/get-all-offers-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setOffersForUser(response.data.offers)
                }
            })
    })

    useEffect(() => {
        axios.get("http://localhost:8080/get-credits-for-user?username=" + username)
            .then(response => {
                if (response.data.success) {
                    setCredits(response.data.credits)
                }
            })
    })

    return (
        <div>
            <div>
                <h3>My Credits : {credits}</h3>
            </div>
            <MenuPage/>

            <div>
                {
                    <table className={"statistics"}>
                        <tr className={"statistics"}>
                            <th className={"statistics"}>product name</th>
                            <th className={"statistics"}>amount of offer</th>
                            <th className={"statistics"}>auction is open?</th>
                            <th className={"statistics"}>offer won?</th>
                        </tr>
                        {
                            offersForUser.map((offers) => {
                                return(
                                    <tr className={"statistics"}>
                                        <Link to={`/product/${offers.auctionId}`}>
                                        <td className={"statistics"}>{offers.productName}</td>
                                        </Link>
                                        <td className={"statistics"}>{offers.amountOfOffer}</td>
                                        <td className={"statistics"}>{}</td>
                                        <td className={"statistics"}>{offers.chosen?"Yes":"No"}</td>
                                    </tr>
                                )
                            })

                        }

                    </table>
                }
            </div>


        </div>
    );

}

export default MySuggestions;