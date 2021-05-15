import React, {useState} from "react";
import {Link} from "react-router-dom"
import { itemDetails } from "../../util/Util";
import "../../styles/OrderHistory.css";

const OrderHistory = (props) => {
  const orders = Object.entries(props.orders);
  const orderList = orders.map((order) => (
   <Dropdown key={order[0]} order={order}/>
  ));
  return <div className="Orders">{orderList}</div>;
};

export default OrderHistory;

const Dropdown = ({order}) => {
    const [drop, setDrop] = useState()
    const onClick=()=>{
        setDrop(!drop)
    }
    return (
        <div className="Dropdown" >
        <article onClick={onClick}>
          <h3>{order[0]}</h3>
          <h3>{order[1].date}</h3>
          <h3>{`$${order[1].total}`}</h3>
        </article>
        <div style={{display: drop ? "block" : "none"}}>
          <ul>{itemDetails(order[1].items)}
          <Link to={{
            pathname: `/account/order/${order[0]}`,
            state: order[1]
          }}>
          <h3>View details</h3>
          </Link>
          </ul>
        </div>
      </div>
    )
}