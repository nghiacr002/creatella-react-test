import React from 'react';
import {render} from 'react-dom';
const options = [ 'id', 'size', 'price'];

class Sort extends React.Component {
  constructor(props){
    super(props);
    this.onChangeSort = this.onChangeSort.bind(this);
  }
  componentDidAmount(){
    
  }
  onChangeSort(e){
    this.props.onChangeSort(e.target.value)
  }
  render () {
      
      var listItems = options.map((key,index) => {
           return (<option value={key} key={index}>{key}</option>);
      });
    return (
        <div className="product-sorting-holder">
        <select className="product-sorting form-control" onChange={this.onChangeSort}>
            {listItems}
        </select>
        </div>
    );
  }
}
export default Sort;