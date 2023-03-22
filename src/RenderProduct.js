import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";


function RenderProduct(props){
const product = props.product;

return(

    <div className={"background"}>


      <table className={"rwd-table"}>
          <tr>
              <th colSpan="4" style={{height:"50px", fontSize:"20px", background:"papayawhip"}}>My Products</th>
          </tr>
          <tr style={{height:"30px", background:"floralwhite"}}>
              <th>Product Name</th>
              <th>Max Offer</th>
               <th>Auction Status</th>
               <th></th>
          </tr>
          {
              product.map((product) => {
                  return (
                      <tr >
                          <Link to={`/product/${product.id}`}>
                              <td>{product.productName}</td>
                          </Link>
                          <td>{product.maxOfferAmount} </td>
                          <td>{product.open?"Open":"Close"}</td>
                          <td><Button size="large" color="success" variant="contained" disabled={product.open===false} onClick={() => {
                              props.closeAuction(product.id)
                          }}>close auction</Button></td>

                      </tr>
                  )

          })
       }



      </table>

    </div>
)
}

export default RenderProduct;