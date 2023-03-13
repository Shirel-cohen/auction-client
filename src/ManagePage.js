import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {NavLink, useNavigate} from "react-router-dom";
import Product from "./Product";

function ManagePage (props) {
    const links=[
        {to:"dashboard", text:"Home"},
        {to:"MySuggestions", text:"MY-OFFERS"},
        {to:"MyProducts", text:"MY-PRODUCTS"}
    ]


    const[users, setUsers] = useState([]);
    const[auction, setAuction] = useState([]);
    const[showUserDetails,setShowUserDetails] = useState("")
    const [option, setOption] = useState("")
    const navigate = useNavigate();



    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
        }

        axios.get("http://localhost:8080/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            });

        axios.get("http://localhost:8080/get-all-open-auctions")
            .then(response => {
                if (response.data.success) {
                    setAuction(response.data.tenders)
                }
            });
    }, [])

    const loginAs = (token) => {
        Cookies.set("token", token);
        navigate("../dashboard");
    }
    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }
    const optionChangedToTenders = (e) => {
        setOption(e.target.value);
        setShowUserDetails("")

    }




    return (
        <div>
            <button onClick={logout}> Logout</button>
            <div style={{textAlign: "center", color: "darkmagenta"}}>
                <h2 style={{fontStyle: "italic", color: "darkmagenta"}}>Manage Page</h2>
                <div style={{fontSize: "23px", fontStyle: "oblique"}}>
                      <span>
                      Users: {users.length}
                </span>
                    <span style={{marginLeft: "20px"}}>
                         Tenders: {auction.length}
                </span>
                </div>

            </div>

            <ul style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
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
            </ul>

            <div style={{alignItems: "center", justifyContent: "center", display: "flex", marginTop: "70px "}}>
                <input type={"radio"} name={"option"} value={"users"} checked={option == "users"}
                       onChange={event => setOption(event.target.value)}/> Show Users

                <input type={"radio"} name={"option"} value={"auction"} checked={option == "auction"}
                       onChange={optionChangedToTenders}/> Show Tenders

            </div>

            <div>

                {
                    option == "users" &&
                    <div>
                        {
                            users.map((item) => {
                                return (

                                    <td style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px"
                                    }}>
                                        <input type={"radio"} name={"showUserDetails"} value={item.username}
                                               checked={showUserDetails == item.username}
                                               onChange={e => setShowUserDetails(e.target.value)}
                                        />
                                        {item.username}

                                        {
                                            showUserDetails == item.username &&

                                            <div style={{margin: "20px"}}>
                                                <table>
                                                    <th>Credit</th>
                                                    <th>Tenders</th>
                                                    <th>edit Credit</th>
                                                    <tr>
                                                        <td style={{padding: "20px"}}>{item.amountOfCredits}</td>
                                                        <td>{item.amountOfTenders}</td>
                                                        <td>
                                                            <input type={"number"}/>
                                                        </td>
                                                        <td>
                                                            <button>Edit</button>
                                                        </td>

                                                    </tr>
                                                </table>
                                            </div>
                                        }
                                    </td>
                                );
                            })
                        }
                    </div>
                }
            </div>

            {
                option == "auction" &&
                <div>
                    <table>
                        {
                            auction.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <button> {item.productName}</button>
                                            {/*//onClick={navigate("../Product" , ()=> <Product data={item}/>)}*/}
                                        </td>
                                    </tr>

                                );
                            })
                        }
                    </table>
                </div>

            }


        </div>
    );
}

export default ManagePage;