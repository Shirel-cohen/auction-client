import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "@mui/material";
import {TextField} from "@mui/material";
import MenuPage from "./DefaultPage";


function DashboardPage(props) {


    const [username, setUsername] = useState("");
    const [openAuctions, setOpenAuctions] = useState([]);
    const [token, setToken] = useState("");
    const [option, setOption] = useState("update")
    //product inputs from user
    const [productName, setProductName] = useState("")
    const [describeProduct, setDescribe] = useState("")
    const [urlImage, setUrlImage] = useState("")
    const [minimalPrice, setMinimalPrice] = useState("")
    const [myOffers,setMyOffers] = useState([]);
    const navigate = useNavigate();
    const filter = openAuctions;



    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login");
        } else {
            setToken(token);
            axios.get("http://localhost:8080/get-username?token=" + token).then((res) => {
                setUsername(res.data.username);
            });
        }
        const sse = new EventSource("http://localhost:8080/sse-handler?token=" + token)
        sse.onmessage = (message) => {
            console.log(message.data)
            const data = message.data;
            if (data === "NEW_OFFER") {
                alert("Someone added a new offer to your product!");
            } else if (data === "CLOSE_AUCTION") {
                alert("An Auction that you have an offer in is closed!");
            }
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-open-auctions")
            .then(response => {
                if (response.data.success) {
                    setOpenAuctions(response.data.auctions)
                }
            })
    })

    const getNumberOfMyOffersOnProduct = (productName) => {
        axios.get("http://localhost:8080/get-my-offers-on-product?username=" +username +"&productName="+ productName )
            .then(response => {
                if (response.data.success) {
                    setMyOffers(response.data.offers)
                }
            })
        return myOffers.length;
    }

    const uploadProduct = () => {
        axios.post("http://localhost:8080/upload-product", null, {
            params: {
                owner: username,
                productName: productName,
                img: urlImage,
                describe: describeProduct,
                minimalCost: minimalPrice
            }
        }).then((response) => {
            if (response.data.success) {
                alert("product uploaded");
            }
        })
        setMinimalPrice("");
        setUrlImage("");
        setProductName("")
        setDescribe("");
    }

    const updateProduct = () => {
        return (
            <table>
                <th>
                    <td>
                        <TextField type={"text"} value={productName} label="Product name"
                                   onChange={(e) => setProductName(e.target.value)} variant="outlined"/>
                    </td>
                    <td>
                        <TextField type={"text"} value={describeProduct} label="describe product"
                                   onChange={(e) => setDescribe(e.target.value)} variant="outlined"/>
                    </td>
                    <td>
                        <TextField type={"url"} value={urlImage} label="URL image"
                                   onChange={(e) => setUrlImage(e.target.value)} variant="outlined"/>
                    </td>
                    <td>
                        <TextField type={"number"} value={minimalPrice} label="minimal price"
                                   onChange={(e => setMinimalPrice(e.target.value))} variant="outlined"/>

                    </td>
                </th>

            </table>
        )
    }
    const isAllowToSubmit = () => {
        return productName.length == 0 || describeProduct.length == 0 || urlImage.length == 0 || minimalPrice.length == 0;
    }

    const filterTable = () => {
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }


    return (
        <div>
            <MenuPage me={"dashboard"} username = {username}/>
            <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                <h3 style={{marginRight: "5px", fontStyle: "italic"}}>Hello <span
                    style={{color: "blueviolet"}}>{username}</span></h3>
                {/*<button style={{padding: "10px", color: "#000"}} onClick={logout}> Logout</button>*/}

            </div>


            <div>
                <div style={{alignItems: "center", justifyContent: "center", display: "flex", marginTop: "70px"}}>
                    <input type={"radio"} value={"update"} name={"option"} checked={option == "update"}
                           onChange={event => setOption(event.target.value)}/> Product upload

                    <input type={"radio"} value={"showTenders"} name={"option"} checked={option == "showTenders"}
                           onChange={event => setOption(event.target.value)}/> Presentation of Auctions

                </div>
                <br/> <br/> <br/>

                {
                    option == "update" &&
                    <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                        {updateProduct()}
                        <Button variant="contained" color="success" onClick={uploadProduct}
                                disabled={isAllowToSubmit()}>Upload</Button>
                    </div>
                }

                {
                    option == "showTenders" &&


                    <div style={{justifyContent: "center", marginLeft: "650px"}}>
                        <TextField type={"text"} onKeyUp={filterTable} id="myInput" label="Filter Table"
                                   variant="outlined"/>
                        <br/><br/>

                        {openAuctions.length > 0?
                        <table className={"auctionTable"} id={"myTable"}>
                            <tr>

                                <th>productName</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Opening Date</th>
                                <th>Number of Offers</th>
                                <th>Number of My Offers</th>
                            </tr>

                            {

                                openAuctions.map((auction, i) => {
                                    return (
                                        <tr className={"wpos"}>
                                            <Link to={`/product/${auction.id}`}>
                                                <td>{auction.productName}</td>
                                            </Link>
                                            <td><img src={auction.productImage} width={"100px"} height={"100px"}/></td>
                                            <td>{auction.productDescription }</td>
                                            <td>{auction.dateOpening}</td>
                                            <td>{auction.amountOfOffers}</td>
                                            <td> {auction.ownerOfTheProduct === username? "This is your product" : getNumberOfMyOffersOnProduct(auction.productName)}</td>
                                        </tr>

                                    );


                                })
                            }
                        </table> : <h1> There Are No Open Auctions </h1> }

                    </div>
                }


            </div>

        </div>

    );
}

export default DashboardPage;