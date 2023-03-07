import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function ManagePage () {

    const[users, setUsers] = useState([]);
    const[tenders, setTenders] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8989/get-all-users")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                }
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8989/get-all-open-tenders")
            .then(response => {
                if (response.data.success) {
                    setTenders(response.data.tenders)
                }
            })
    }, [])

    const loginAs = (token) => {
        Cookies.set("token", token);
        navigate("../dashboard");
    }

    return  (
        <div>

            <div style={{marginRight:"1700px"}}>
            Users: {users.length}
            <table>
                {
                    users.map((item) => {
                        return (
                                <tr>
                                    <td><button> {item.username}</button> </td>
                                </tr>


                        )
                    })
                }
            </table>
            </div>

            <div style={{marginLeft:"500px"}}>
                Tenders: {tenders.length}
                <table style={{marginLeft:"500px"}} >
                    {
                        tenders.map((item) => {
                            return (
                                <tr>
                                    <td><button> {item.productName}</button> </td>
                                </tr>


                            )
                        })
                    }
                </table>
            </div>


        </div>
    )
}

export default ManagePage;