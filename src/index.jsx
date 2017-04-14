import React from 'react';
import {render} from 'react-dom';
import Products from './products.jsx';
import Sort from './sort.jsx';
import axios from 'axios';
const RESPONSE_OK = 200;
class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        sort: {
          by: 'size',
          mode: 'ASC',
        },
        page: 0, 
        limit:20,
        isFetching: false, 
        displayedAdsIds:[],
        products:[],
    }
    this._handleScroll  = this._handleScroll.bind(this);
    window.addEventListener("scroll", this._handleScroll);
  }
  componentDidMount(){
    this.getProducts();
    
  }
  getProducts(){
    let page = this.state.page; 
    page++;
    let limit = this.state.limit; 
    var that = this;
    axios.get('/api/products', {
      params: {
        _page: page,
        _limit:limit
      }
    })
    .then(function (response) {
     
      if(parseInt(response.status) == RESPONSE_OK){
         let adsID = that._getNextAds();
         let products = response.data; 
         products.push({
           'mode': 'ads',
           'id': adsID
         });
         that.setState({
           page: page,
           products: that.state.products.concat(products),
           displayedAdsIds: that.state.displayedAdsIds.concat(adsID)
        });
      }else{
        alert(response.statusText);
      }
    })
    .catch(function (error) {
    });
  }
  _handleScroll(){
    let currentPosY = window.scrollY; 
    let viewScreen = window.innerHeight; 
    let documentHeight = document.body.offsetHeight;
    let scrolledY = viewScreen + currentPosY + 10 ; //padding cheat
    console.log('scrolledY = ' + scrolledY);
    console.log('documentHeight = ' + documentHeight);
    if(scrolledY >= documentHeight){
      this.getProducts();
    }
  }
  _getNextAds(){
    var id = null;
    var displayedAdsIds = this.state.displayedAdsIds; 
    do{
      id = Math.floor(Math.random()*1000); 
      if(displayedAdsIds.indexOf(id) < 0){
        return id;
      }
    }while(1 == 1);
    return id;
  }
  render () {
    console.log('render index');
    let items = this.state.products;
    return (
      <div className="products-root">
        <Sort />
        <Products items={items} />
      </div>
    ) ;        
  }
}

render(<App/>, document.getElementById('products-holder'));