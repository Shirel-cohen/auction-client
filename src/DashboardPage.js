import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Alert, Button} from "@mui/material";
import {TextField} from "@mui/material";
import MenuPage from "./DefaultPage";
import {toast, ToastContainer} from "react-toastify";


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
            toast.success("Someone added a new offer to your product!",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"})
        } else if (data === "CLOSE_AUCTION") {
            toast.warning("An Auction that you have an offer in is closed!",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"})
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
                toast.success("Product Uploaded Successfully",{ className : "toast-su", position: toast.POSITION.TOP_CENTER,theme: "colored"});
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
                        <TextField  style={{backgroundColor:"papayawhip"}} color="success" type={"text"} value={productName} label="Product name"
                                   onChange={(e) => setProductName(e.target.value)} variant="outlined"/>
                    </td>
                    <td>
                        <TextField style={{backgroundColor:"papayawhip"}} color="success" type={"text"} value={describeProduct} label="describe product"
                                   onChange={(e) => setDescribe(e.target.value)} variant="outlined"/>
                    </td>
                    <td>
                        <TextField  style={{backgroundColor:"papayawhip"}} color="success" type={"url"} value={urlImage} label="URL image"
                                   onChange={(e) => setUrlImage(e.target.value)} variant="outlined"/>
                    </td>
                    <td>
                        <TextField style={{backgroundColor:"papayawhip"}} color="success" type={"number"} value={minimalPrice} label="minimal price"
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
        <div className={"background"} >

            <div style={{ justifyContent: "center", display: "flex"}}>
                <MenuPage me={"dashboard"} username = {username}/>
                <h2 style={{marginInlineEnd:"20px", fontStyle: "italic",color: "lightgreen"}}>Hello <span
                    style={{fontStyle: "oblique",color: "lightgreen"}}>{username}</span></h2>

            </div>



            <div>
                <div style={{ fontSize:"20px",alignItems: "center", justifyContent: "center", display: "flex", marginTop: "40px"}}>
                    <input type={"radio"} value={"update"} name={"option"} checked={option == "update"}
                          onChange={event => setOption(event.target.value)}/> <h3> Product upload </h3>
                <input type={"radio"} value={"showTenders"} name={"option"} checked={option == "showTenders"}
                           onChange={event => setOption(event.target.value)}/> <h3>Presentation of Auctions</h3>

                </div>
                <br/> <br/>

                {
                    option == "update" &&
                    <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                        {updateProduct()}
                        <Button size="large" variant="contained" color="success" onClick={uploadProduct}
                                disabled={isAllowToSubmit()}><h3>Upload</h3></Button>
                    <ToastContainer/>
                    </div>
                }

                {
                    option == "showTenders" &&

                    <div>
                        <TextField   style={{backgroundColor:"papayawhip",  marginLeft:"700px",
                            marginBottom:"20px"}}type={"text"} onKeyUp={filterTable} id="myInput" label="Filter Table By Name"
                                  color="success"  variant="outlined"   />
                        <ToastContainer/>
                        <br/>

                        {openAuctions.length > 0?
                        <table className={"rwd-table"}>
                            <tr style={{height:"30px", background:"floralwhite"}}>
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
                                        <tr>
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
                        </table> :
                            <Alert  variant="outlined" severity="error">
                                <h1 style={{marginLeft:"600px"}}> There Are No Open Auctions </h1>
                            </Alert>
                            }

                    </div>
                }


            </div>

        </div>

    );
}

export default DashboardPage;