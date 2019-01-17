import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './login';
import base, {firebaseApp} from '../base'

class Inventory extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFish: PropTypes.func,

    };

    state = {
        uid:null,
        owner:null
    };

    componentDidMount() {
        firebase.auth() .onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user})
            }
        })
    }
    authHandler = async (authData) => {
        // 1. Look up the current store in firebase database
        const store = await base.fetch(this.props.storeId, {context:this});
        console.log(store);
        // 2. Claim it if there is no owner
        if(!store.owner) {
            //save it as our own
            await base.post(`${this.props.storeId}/owner`,{
                data: authData.user.uid,
            })
        }
        // 3. Set the state of the invertory component
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };

    authenticate = (provider)=>{
        // const authProvider = new firebase.auth.GithubAuthProvider;
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
    };

    logout = async () => {
        console.log('logging out');
        await firebase.auth().signOut();
        this.setState({ uid: null})

};

    render(){
        const logout = <button onClick={this.logout}>Log out!</button>;
        // 1. Check if logged in
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }
        // 2. Check if the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner!</p>
                    {logout}
                </div>
            )
        }
        return (
            <div className={'Invertory'}>
                <h2>Invertory!!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Samples</button>
            </div>
        )
    }
}

export default Inventory;