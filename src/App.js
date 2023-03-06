import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ManagePage from "./ManagePage";
import Product from "./Product";
import MySuggestions from "./MySuggestions";
import MyProducts from "./Product";

function App() {
    const links=[
        {to:"MangePage", text:"Manage"},
        {to:"/", text:"LOG-IN"},
        {to:"Dashboard", text:"DASHBOARD"},
        {to:"Product", text:"PRODUCT"},
        {to:"MySuggestions", text:"MY-SUGGESTIONS"},
        {to:"MyProducts", text:"MY-PRODUCTS"}

    ]
    return (
        <div className="App">
        <BrowserRouter>
            <ul>
                {
                    links.map((link)=>{
                        return(
                            <button className={"Buttons"}>
                                <NavLink to={link.to}>
                                    {link.text}
                                </NavLink>
                            </button>
                        )
                    })
                }
            </ul>
            <Routes>
                <Route path={"/manage"} element={<ManagePage/>}></Route>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>
                <Route path={"/dashboard"} element={<DashboardPage/>}></Route>
                <Route path={"/product"} element={<Product/>}></Route>
                <Route path={"/mySuggestions"} element={<MySuggestions/>}></Route>
                <Route path={"/myProducts"} element={<MyProducts/>}></Route>

            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;
