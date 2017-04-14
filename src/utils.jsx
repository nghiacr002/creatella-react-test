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
    }
}