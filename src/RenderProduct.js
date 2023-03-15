import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function RenderProduct(props){
const product = props.product;

return(

    <div>
      <table className={"statistics"}>
          <tr className={"statistics"}>
              <Link to={`/product/${product.id}`}>
            <td className={"statistics"}>{product.productName}</td>
              </Link>
              <td className={"statistics"}>{product.maxOfferAmount} </td>
              <td className={"statistics"}>{product.open?"Yes":"No"}</td>
              <td className={"statistics"}><button disabled={product.open===false} onClick={() => {
                  props.closeAuction(product.id)
              }}>close auction</button></td>

          </tr>
      </table>
    </div>
)
}

export default RenderProduct;