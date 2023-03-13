import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

function DashboardPage () {
    const links=[
      {to:"ManagePage", text:"Manage"},
      {to:"MySuggestions", text:"MY-OFFERS"},
      {to:"MyProducts", text:"MY-PRODUCTS"}
  ]

    const[username, setUsername] = useState("");
    const[openAuctions, setOpenAuctions] = useState([]);
    const[token, setToken] = useState("");
    const[option , setOption] = useState("update")
    //product inputs from user
    const[productName , setProductName] = useState("")
    const[describeProduct , setDescribe] = useState("")
    const[urlImage , setUrlImage] = useState("")
    const[minimalPrice , setMinimalPrice] = useState("")
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
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/get-all-open-auctions")
            .then(response => {
                if (response.data.success) {
                    setOpenAuctions(response.data.auctions)
                }
            })
    })
    const uploadProduct = () => {
        axios.post("http://localhost:8080/upload-product" , null ,{
            params:{owner : username ,productName:productName,img: urlImage , describe:describeProduct, minimalCost: minimalPrice}
        }).then((response)=>{
            if (response.data.success) {
                alert("product uploaded");
            }
        })
        setMinimalPrice("");
        setUrlImage("");
        setProductName("")
        setDescribe("");
    }

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }
    const updateProduct = () => {
      return(
          <table>
              <th>
                  <td>
                      <input type={"text"} placeholder={"Product name"} value={productName} onChange={ (e) => setProductName(e.target.value) }/>
                  </td>
                  <td>
                      <input type={"text"} placeholder={"describe product"} value={describeProduct} onChange={(e)=> setDescribe(e.target.value)}/>
                  </td>
                  <td>
                      <input type={"url"} placeholder={"URL image"} value={urlImage} onChange={(e)=>setUrlImage(e.target.value)}/>
                  </td>
                  <td>
                      <input type={"number"} placeholder={"minimal price"} value={minimalPrice} onChange={(e => setMinimalPrice(e.target.value))}/>
                  </td>
              </th>

          </table>
      )
    }
    const isAllowToSubmit =()=>{
        return  productName.length == 0 || describeProduct.length == 0 || urlImage.length == 0 || minimalPrice.length == 0;
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
            <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                <h3 style={{marginRight: "5px", fontStyle: "italic"}}>Hello <span
                    style={{color: "blueviolet"}}>{username}</span></h3>
                <button style={{padding: "10px", color: "#000"}} onClick={logout}> Logout</button>

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
            <div>
                <div style={{alignItems: "center", justifyContent: "center", display: "flex", marginTop: "70px"}}>
                    <input type={"radio"} value={"update"} name={"option"} checked={option == "update"}
                           onChange={event => setOption(event.target.value)}/> Product upload

                    <input type={"radio"} value={"showTenders"} name={"option"} checked={option == "showTenders"}
                           onChange={event => setOption(event.target.value)}/> Presentation of tenders

                </div>
                <br/> <br/> <br/>

                {
                    option == "update" &&
                    <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                        {updateProduct()}
                        <Button variant="contained" color="success"  onClick={uploadProduct} disabled={isAllowToSubmit()}>Upload</Button>
                    </div>
                }

                {
                    option == "showTenders" &&
                    <div style={{justifyContent: "center", marginLeft: "650px"}}>
                        <input type={"text"} onKeyUp={filterTable} id={"myInput"}/> <br/><br/>


                        <table className={"auctionTable"} id={"myTable"}>
                            <tr>

                                <th>productName</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Opening Date</th>
                                <th>Number of Offers</th>
                                <th>Number of Offers of {username}</th>
                            </tr>

                            {

                                openAuctions.map((auction, i) => {
                                    return (
                                        <tr className={"wpos"}>

                                            <td>{auction.productName}</td>
                                            <td>{auction.productImage}</td>
                                            <td>{auction.productDescription}</td>
                                            <td>{auction.dateOpening}</td>
                                            <td>{auction.amountOfOffers}</td>
                                            <td>{auction.amountOfOfferingForUser}</td>
                                        </tr>

                                    );


                                })
                            }
                        </table>

                    </div>
                }


            </div>

        </div>

    );
}

export default DashboardPage;