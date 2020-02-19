import React, { Component } from 'react'
import { auth, firestore, storage } from '../firebase';
export default class UserProfile extends Component{
    state = { displayName : ''}

    imageInput = null;

    handleChange = event =>{
        const { name, value} = event.target;
        this.setState({ [name] : value })
    }

    handleSubmit = event => {
        event.preventDefault();

        const {displayName} = this.state;

        if(displayName) {
            this.userRef.update({displayName})
        }

        if(this.file) {
            storage.ref().child('images')
            .child(this.uid)
            .child(this.file.name)
            .put(this.file)
            .then(res => res.ref.getDownloadURL())
            .then(photoURL => this.userRef.update({ photoURL }))
        }
    }

    get uid() {
        return auth.currentUser.uid
    }

    get userRef() {
        return firestore.doc(`/users/${this.uid}`)
    }

    get file() {
        return this.imageInput && this.imageInput.file[0];
    }
    render() {
        const { displayName } = this.state
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        value={displayName} 
                        name='displayName' 
                        onChange={this.handleChange}
                        placeholder='Display Name'
                    />
                    <input type='file' ref= {ref => this.imageInput = ref} />
                    <input type='submit' />
                </form>
            </section>
        )
    }
}
