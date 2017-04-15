import React from 'react';
import {render} from 'react-dom';
class Loading extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        if(!this.props.visible){
            return null;
        }
        return (
            <div className="loading-holder">
                 <div className="loader"></div>
            </div>
        );
    }
}
export default Loading; 