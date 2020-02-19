import React, { createContext, Component } from 'react'
import { auth, createUserDocument } from '../firebase'

export const UserContext = createContext();

class UserProvider extends Component{
    state={user: 'null'}

    unSubcribeAuthUser = null;

    async componentDidMount() {
        this.unSubcribeAuthUser = await auth.onAuthStateChanged(async userAuth =>{
            if(userAuth) {
                const userRef = await createUserDocument(userAuth);
                userRef.onSnapshot(snapshot =>{
                    this.setState({ user: {uid: snapshot.id, ...snapshot.data()}})
                })
            }
            this.setState({user: userAuth})
        })
    }

    componentWillUnmount() {
        this.unSubcribeAuthUser()
    }

    render() {
        const { user} = this.state;
        const { children } = this.props;
        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;

