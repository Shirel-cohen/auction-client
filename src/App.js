import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ManagePage from "./ManagePage";
import Product from "./Product";
import MySuggestions from "./MySuggestions";
import MyProducts from "./MyProducts";

function App() {

    return (
        <div >
        <BrowserRouter>

            <Routes>
                <Route path={"/managePage"} element={<ManagePage/>}></Route>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>
                <Route path={"/dashboard"} element={<DashboardPage/>}></Route>
                <Route path={"/product"} element={<Product/>}></Route>
                <Route path={"/mySuggestions"} element={<MySuggestions/>}></Route>
                <Route path={"/MyProducts"} element={<MyProducts/>}></Route>
                <Route exact path={"/product/:id"} element={<Product/>}></Route>

            </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;
