import React from 'react';
import {render} from 'react-dom';
class Ads extends React.Component {
  constructor(props){
    super(props);
  }
 
  render () {
      let url = "ads/?r=" + this.props.id;
       return (
         <div className="col-xs-3 ">
          <div className="product-item item-ads">
           <img className="ad" src={url}/>
           </div>
         </div>
       );
  }
}
export default Ads;