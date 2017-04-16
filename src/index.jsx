import React from 'react';
import {render} from 'react-dom';
import Products from './products.jsx';
import Sort from './sort.jsx';
import Loading from './loading.jsx';
import axios from 'axios';
const RESPONSE_OK = 200;
const USER_TIMEOUT = 3000; 
class App extends React.Component {
  timer:null
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
        prefetchData:{
          page:0, 
          products:[],
          ads: 0,
          isEOL: false,
        },
    }
    this._handleScroll  = this._handleScroll.bind(this);
    this._getProducts = this._getProducts.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this._prefetch = this._prefetch.bind(this);
    window.addEventListener("scroll", this._handleScroll);
  }
  componentDidMount(){
    this.getProducts();
  }
  getProducts(){
   
    let prefetchData = this.state.prefetchData;
    
    if(prefetchData.products.length > 0){
      this.setState({
        products: this.state.products.concat(prefetchData.products),
        page: prefetchData.page,
        displayedAdsIds: this.state.displayedAdsIds.concat(prefetchData.ads),
        isFetching: false,
        EOL: prefetchData.isEOL,
        prefetchData: {
            page:0, 
            products:[],
            ads: 0,
            isEOL: false,
        }
      });
      this.timer = setTimeout(this._prefetch,USER_TIMEOUT);
      return;
    }
    this.setState({
      isFetching: true
    });
    if(this.timer){
      clearTimeout(this.timer);
    }
    var that = this; 
    this._getProducts((result) => {
       that.setState({
           page: result.page,
           products: that.state.products.concat(result.products),
           displayedAdsIds: that.state.displayedAdsIds.concat(result.displayedAdsIds),
           isFetching: result.isFetching,
           EOL: result.isEOL
       });
       that.timer = setTimeout(that._prefetch,USER_TIMEOUT);
    });
  }
  onChangeSort(sort){
    this.setState({
      sort:sort,
      page:0,
      products:[],
      prefetchData:{
        products:[],
        page:0, 
        ads:0,
        isEOL: false,
      },
    });
    this.getProducts();
  }
  _getProducts(cb){
    var that = this; 
    let page = that.state.page; 
    page++;
    let limit = that.state.limit; 
    let sort = that.state.sort;
     console.log('go here' + page + '& limit' + limit + '&sort = ' + sort);
    
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
        cb({
           page: page,
           products: products,
           displayedAdsIds: adsID,
           isFetching: false,
           EOL: isEOL
        });
      }else{
        alert(response.statusText);
      }
    })
    .catch(function (error) {
      console.log('errr');
      console.log(error);
    });
  }
  _prefetch(){
    if(this.state.isFetching || this.state.isEOL || this.state.prefetchData.products.length > 0){
      return;
    }
    console.log('prefetching data');
    var that = this; 
    this._getProducts((result) => {
       that.setState({
         prefetchData:result
       });
    });
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