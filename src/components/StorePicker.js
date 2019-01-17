import React from "react";
import PropTypes from 'prop-types';
import {getFunName} from "../helpers";

class StorePicker extends React.Component{
    // constructor() {
    //     super();
    //     this.goToStore =this.goToStore.bind(this)
    // }

    static propTypes = {
        history: PropTypes.object,
    };

    myInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        //1.Stop submit
        const storeName = this.myInput.current.value;
        //2.Get input value
        this.props.history.push(`/store/${storeName}`);
        //3.Change page to /store/whateverEntered
    };

    componentDidMount(){
        console.log(this)
    }
    render(){
        return (
            <form className='store-selector' onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input
                    type='text'
                    ref={this.myInput}
                    required
                    placeholder='Store Name'
                    defaultValue={getFunName()}
                />
                <button type={'submit'}>Visit store -></button>
            </form>
        )
    }
}

export default StorePicker;