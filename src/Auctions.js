import {Link, useActionData} from "react-router-dom";
import React, {useState} from "react";
function Auctions(props) {

    const openAuctions = props.auctions


    return (
        <div>

            <table id={props.id} className={"rwd-table"}>
                <tr style={{height: "30px", background: "floralwhite"}}>
                    <th>productName</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Opening Date</th>
                    <th>Number of Offers</th>
                    {props.id === "myTable" &&
                    <th>Number of My Offers</th> }

                </tr>
                {
                    openAuctions.map((auction, i) => {
                        return (
                            <tr>
                                <Link to={`/product/${auction.id}`}>
                                    <td>{auction.productName}</td>
                                </Link>
                                <td><img src={auction.productImage} width={"100px"} height={"100px"}/></td>
                                <td>{auction.productDescription}</td>
                                <td>{auction.dateOpening}</td>
                                <td>{auction.amountOfOffers}</td>
                                {props.id === "myTable" &&
                                    <td> {auction.ownerOfTheProduct === props.owner ? "This is your product" : props.MyOffersOnProduct(auction.productName)}</td>
                                }
                                </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}

export default Auctions;