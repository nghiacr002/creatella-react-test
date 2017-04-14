import React from 'react';
import {render} from 'react-dom';
import timeago from 'timeago.js';
import UTILS from './utils.jsx';
import Ads from './ads.jsx';
class Products extends React.Component {
  render () {
    var products = this.props.items;
    var timeagoInstance = timeago();
    var items = products.map((product) => {
      if(product.mode && product.mode == "ads"){
          return (<Ads id={product.id} key={product.id}/>);
      }
      let style = {
          fontSize: product.size
      };
      let product_time = timeagoInstance.format(product.date);
      let product_price = UTILS.currency2String(product.price, "$" , 2);
      return (
        <div className="col-xs-2 product-item" key={product.id}>
          <div className="product-face" style={style}>{product.face}</div>
          <div className="product-time"> Date: {product_time}</div>
          <div className="product-price"> Price : {product_price}</div>
        </div>
      )
    });
    return <div className="rows">{items}</div>;
  }
}
export default Products;