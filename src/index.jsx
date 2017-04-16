import React from 'react';
import {render} from 'react-dom';
import Products from './products.jsx';
import Sort from './sort.jsx';
import Loading from './loading.jsx';
import axios from 'axios';
const RESPONSE_OK = 200;
class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        sort: 'id',
        page: 0, 
        limit:20,
        isFetching: false, 
        displayedAdsIds:[],
        products:[],
        EOL: false,
    }
    this._handleScroll  = this._handleScroll.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    window.addEventListener("scroll", this._handleScroll);
  }
  componentDidMount(){
    this.getProducts();
  }
  getProducts(){
    this.setState({
      isFetching: true
    });
    let page = this.state.page; 
    page++;
    let limit = this.state.limit; 
    let sort = this.state.sort;
    var that = this;
    axios.get('/api/products', {
      params: {
        _page: page,
        _limit:limit,
        _sort: sort
      }
    })
    .then(function (response) {
      if(parseInt(response.status) == RESPONSE_OK){
         let adsID = that._getNextAds();
         let products = response.data; 
         let isEOL = false;
         if(products.length > 0){
             products.push({
              'mode': 'ads',
              'id': adsID
            });
         }else{
            products.push({
              'mode': 'eol',
              'id': 'eolID-' + (new Date()).getTime()
            });
            isEOL = true;
         }
         that.setState({
           page: page,
           products: that.state.products.concat(products),
           displayedAdsIds: that.state.displayedAdsIds.concat(adsID),
           isFetching: false,
           EOL: isEOL
        });
      }else{
        alert(response.statusText);
      }
    })
    .catch(function (error) {
    });
  }
  onChangeSort(sort){
    //let page = this.state.page; 
    //page--;
    this.setState({
      sort:sort,
      page:0,
      products:[]
    });
    this.getProducts();
  }
  _handleScroll(){
    if(this.state.isFetching || this.state.isEOL){
      return;
    }
    let currentPosY = window.scrollY; 
    let viewScreen = window.innerHeight; 
    let body = document.body;
    let html = document.documentElement;
    //get document height
    let documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    let scrolledY = viewScreen + currentPosY ; //padding cheat
    if(scrolledY >= documentHeight){
      console.log('get products scrolledY = ' + scrolledY + ' & documentHeight = ' + documentHeight);
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
    
    let items = this.state.products;
    return (
      <div className="products-root">
        <Sort onChangeSort={this.onChangeSort}/>
        <Products items={items} />
        <Loading visible={true}/>
      </div>
    ) ;        
  }
}

render(<App/>, document.getElementById('products-holder'));