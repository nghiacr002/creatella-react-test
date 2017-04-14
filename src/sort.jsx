import React from 'react';
import {render} from 'react-dom';
const options = ['size', 'price', 'id'];

class Sort extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidAmount(){
    
  }
  render () {
      
      var listItems = options.map((key,index) => {
           return (<option value={key} key={index}>{key}</option>);
      });
    return (
        <select>
            {listItems}
        </select>
    );
  }
}
export default Sort;