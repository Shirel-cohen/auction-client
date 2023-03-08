import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {NavLink} from "react-router-dom";

function DashboardPage () {
    const links=[
      {to:"ManagePage", text:"Manage"},
      {to:"MySuggestions", text:"MY-SUGGESTIONS"},
      {to:"MyProducts", text:"MY-PRODUCTS"}
  ]

    const[username, setUsername] = useState("");
    const[tenders, setTenders] = useState([]);
    const[token, setToken] = useState("");
    const[option , setOption] = useState("update")
    //product inputs from user
    const[productName , setProductName] = useState("")
    const[describeProduct , setDescribe] = useState("")
    const[urlImage , setUrlImage] = useState("")
    const[minimalPrice , setMinimalPrice] = useState("")
    const navigate = useNavigate();

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
        axios.get("http://localhost:8080/get-all-open-tenders")
            .then(response => {
                if (response.data.success) {
                    setTenders(response.data.tenders)
                }
            })
    }, [])
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

                {
                    option == "update" &&
                    <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                        {updateProduct()}
                        <button onClick={uploadProduct} style={{backgroundColor: "greenyellow"}}
                                disabled={isAllowToSubmit()}>upload
                        </button>
                    </div>
                }

                {
                    option == "showTenders" &&
                    <div style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
                       show Tenders here


                    </div>
                }


            </div>


        </div>
    );
}

export default DashboardPage;