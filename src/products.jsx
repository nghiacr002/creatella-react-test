import React from 'react';
import {render} from 'react-dom';
import UTILS from './utils.jsx';
import Ads from './ads.jsx';
class Products extends React.Component {
  render () {
    var products = this.props.items;
   
    var items = products.map((product) => {
      if(product.mode ){
         if( product.mode == "ads"){
            return (<Ads id={product.id} key={product.id}/>);
         }
         if( product.mode == "eol"){
            return (<div className="col-xs-12 eol">~ end of catalogue ~</div>);
         }
      }
      
      let style = {
          fontSize: product.size
      };
      let product_time = UTILS.date2String(product.date);
      let product_price = UTILS.currency2String(product.price, "$" , 2);
      return (
        <div className="col-xs-3" key={product.id}>
          <div className="product-item">
          <div className="product-face" style={style}>{product.face}</div>
          <div className="product-time"> Date: {product_time}</div>
          <div className="product-price"> Price : {product_price}</div>
          </div>
        </div>
      )
    });
    return <div className="rows">{items}</div>;
  }
}
export default Products;