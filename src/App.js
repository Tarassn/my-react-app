import React from 'react';
import PropTypes from 'prop-types';
import Header from "./components/Header";
import Inventory from './components/Inventory';
import Order from './components/Order';
import sampleFishes from './sample-fishes';
import Fish from './components/Fish';
import base from './base';


class App extends React.Component{
    state ={
        fishes:{},
        order:{},
    };

    static propTypes = {
        match: PropTypes.object,
    };

    componentDidMount() {
        const {params} = this.props.match;
        //reinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context:this,
            state: 'fishes',
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    componentDidUpdate(){
        const {params} = this.props.match;
        localStorage.setItem(params.storeId,
            JSON.stringify(this.state.order)
        );


    }

    addFish = fish => {
        //1.Copy of existing state
        const fishes = {...this.state.fishes};
        //2.Add new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({
            fishes
        })
    };

    updateFish = (key, updatedFish) => {
        // 1. Take copy of current state
        const fishes = { ...this.state.fishes};
        // 2. update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        // 1. take a copy of state
        const fishes = {...this.state.fishes};
        // 2. update the state
        fishes[key] = null;
        // 3. update state
        this.setState({fishes})
    };

    loadSampleFishes =() =>{
        this.setState({ fishes: sampleFishes})
    };

    addToOrder = (key) => {
        // 1. take copy of state
        const order = {...this.state.order};
        // 2.Add to order or update
        order[key] = order[key] +1 || 1;
        // 3. Call setState to update state object
        this.setState({ order });
    };

    deleteFromOrder = (key) => {
        // 1. take copy of state
      const order = {...this.state.order};
      delete order[key];
      this.setState({ order })

    };


    render(){
        return(
            <div className={"catch-of-the-day"}>
                <div className={"menu"}>
                    <Header tagline={'Taras is Cool!'}  age={500} cool={true}/>
                    <ul className={'fishes'}>
                        {Object.keys(this.state.fishes).map(key =>
                            <Fish
                                key = {key}
                                index = {key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                                fishes={this.state.fishes}
                            />
                        )}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    deleteFromOrder = {this.deleteFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes = {this.state.fishes}
                    deleteFish = {this.deleteFish}
                    storeId = {this.props.match.params.storeId}
                />
            </div>
        )
    }
}
export default App;