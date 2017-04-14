import React from 'react';
import {render} from 'react-dom';
class Ads extends React.Component {
  constructor(props){
    super(props);
  }
 
  render () {
      let url = "ads/?r=" + this.props.id;
       return <img className="ad" src={url}/>;
  }
}
export default Ads;