import timeago from 'timeago.js';
module.exports = {
    currency2String: function(value, symbol, decimal){
        if(typeof(decimal) == 'undefined'){
            decimal = 2; 
        }
        decimal = Math.pow(10,decimal);
        var convert = value;
        if(decimal){
             convert = (value/decimal);
        }
        return symbol + "" + convert; 
    },
    date2String: function(date, limit){
        var formatedTime = date; 
        try{
            formatedTime = (new Date(date)).getTime(); 
            console.log(date + ' ==> formatedtime = ' + formatedTime)
        }catch(e){
            console.log('error');
            console.log(e);
            return date; 
        }
        if(typeof(limit) == "undefined"){
            limit = 7 * 60 * 60 * 24 * 1000; //mili seconds
        }
        var currentTime = (new Date()).getTime();
        if(currentTime - formatedTime >= limit){
            return date; 
        }
        let timeagoInstance = timeago();
        return timeagoInstance.format(date);
        
    }
}