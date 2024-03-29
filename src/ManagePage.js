import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, NavLink, useNavigate} from "react-router-dom";
import MenuPage from "./DefaultPage";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import ErrorMessage from "./ErrorMessage";

function ManagePage() {


    const [users, setUsers] = useState([]);
    const [auction, setAuction] = useState([]);
    const [showUserDetails, setShowUserDetails] = useState("")
    const [allAuctions, setAllAuctions] = useState([])
    const [allOffers, setAllOffers] = useState([])
    const [systemMoney, setSystemMoney] = useState(0)
    const [option, setOption] = useState("")
    const [creditToEdit, setCreditToEdit] = useState("");
    const [productId, setProductId] = useState(-1);
    const [errorCode, setErrorCode] = useState(0);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
        } else {
            axios.get("http://localhost:8080/get-username?token=" + token).then((res) => {
                setUsername(res.data.username);
            });
        }
        apiRequestGetUsers();
        axios.get("http://localhost:8080/get-all-open-auctions")
            .then(response => {
                if (response.data.success) {
                    setAuction(response.data.auctions)
                }
            });
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-auctions")
            .then(response => {
                if (response.data.success) {
                    setAllAuctions(response.data.auctions)
                    let systemMoney = 0;
                    allAuctions.map(auction => {
                        systemMoney = systemMoney + (0.05 * auction.maxOfferAmount)
                    })
                    systemMoney = systemMoney + allOffers.length + (2 * allAuctions.length)
                    setSystemMoney(systemMoney)

                }
            })
    })

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-offers")
            .then(response => {
                if (response.data.success) {
                    setAllOffers(response.data.offers)

                }
            })
    })


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

    const handleUserChanged = (e) => {
        setShowUserDetails(e.target.value);
        setCreditToEdit("");
        setErrorCode(0)
    }

    const updateCredit = (token) => {
        axios.post("http://localhost:8080/update-credit", null, {
                params: {token: token, newCredit: creditToEdit}
            }
        ).then((response) => {
            if (response.data.success) {
                apiRequestGetUsers();
                setErrorCode(0)

            } else {
                setErrorCode(response.data.errorCode)
            }

        })

        setCreditToEdit("");
    }
    const apiRequestGetUsers = () => {
        axios.get("http://localhost:8080/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            });
    }
    const handleProductChanged = (e) => {
        setProductId(e.target.value);
    }


    return (
        <div className={"background"}>

            <div>
                <div style={{justifyContent: "center", display: "flex"}}>
                    <MenuPage me={"ManagePage"}/>
                </div>

            </div>

            {username==="Admin"?
               <div>
                <h2 style={{justifyContent: "center", display: "flex",marginInlineEnd: "20px", fontStyle: "italic", color: "lightgreen"}}>Manager Page</h2>
            <div style={{color: "darkmagenta", textAlign: "center", fontSize: "30px", fontStyle: "oblique"}}>

                      <span>
                      Users: {users.length}
                </span>
                <span style={{marginLeft: "20px"}}>
                         Auctions: {auction.length}
                </span>
                <span><h3>Money Earned : {systemMoney}$</h3>
                    </span>
            </div>

            <div style={{alignItems: "center", justifyContent: "center", display: "flex", marginTop: "70px "}}>
                <input size={"50px"} type={"radio"} name={"option"} value={"users"} checked={option == "users"}
                       onChange={event => setOption(event.target.value)}/>  <h3>Show Users </h3>

                <input type={"radio"} name={"option"} value={"auction"} checked={option == "auction"}
                       onChange={optionChangedToTenders}/>  <h3>Show Auctions </h3>
            </div>
            <div>

                {
                    option == "users" &&
                    <div>
                        {
                            users.map((item) => {
                                return (

                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        padding: "5px",
                                    }}>

                                        <Button size="large" color="success" variant="contained" value={item.username}
                                                label="showUserDetails"
                                                checked={showUserDetails == item.username}
                                                onClick={handleUserChanged}
                                        > {item.username}

                                        </Button>

                                        {
                                            showUserDetails == item.username &&

                                            <div style={{margin: "20px"}}>
                                                <table>
                                                    <th style={{padding: "10px"}}>Auctions</th>
                                                    <th style={{padding: "10px"}}>edit Credit</th>
                                                    <th style={{padding: "10px"}}>click to Update</th>
                                                    {errorCode > 0 && <th>alert</th>}
                                                    <tr>

                                                        <td style={{
                                                            color: item.amountOfAuctions == 0 ? "orangered" : "purple",
                                                            fontSize: "25px",
                                                            padding: "10px"


                                                        }}>{item.amountOfAuctions == 0 ? "None" : item.amountOfAuctions}</td>

                                                        <td style={{padding: "10px"}}>
                                                            <TextField style={{backgroundColor: "lightgreen"}}
                                                                       color={"secondary"} size={"small"}
                                                                       variant={"filled"}
                                                                       label={"Current Credit " + item.amountOfCredits}
                                                                       type={"number"} value={creditToEdit}
                                                                       onChange={event => setCreditToEdit(event.target.value)}/>
                                                        </td>
                                                        <td style={{padding: "10px"}}>
                                                            <Button color={"secondary"} size="large" color="success"
                                                                    disabled={creditToEdit == ""}
                                                                    onClick={() => updateCredit(item.token)}
                                                                    variant="contained">Edit</Button>
                                                        </td>
                                                        {
                                                            errorCode > 0 &&
                                                            <td style={{padding: "10px"}}>
                                                                <ErrorMessage message={errorCode} lineBreak={true}/>
                                                            </td>
                                                        }
                                                    </tr>
                                                </table>
                                            </div>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>

            {
                option == "auction" &&
               <div>

                            {
                                auction.map((item) => {

                                    return (

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: "20px",
                                            padding: "5px",
                                        }}>
                                        <Link to={`/product/${item.id}`}>
                                             <Button size="large" color="success" variant="contained" value={item.id}>{item.productName}</Button>
                                        </Link>

                                        </div>





                                    )
                                })
                            }
                </div>

            }
               </div> :<h2>You Are Not Allowed In This Page</h2>}
        </div>
    );
}

export default ManagePage;