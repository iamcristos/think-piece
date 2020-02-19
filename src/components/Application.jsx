import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import { firestore, auth, createUserDocument } from '../firebase';

import Posts from './Posts';
import Authentication from './Authentication';
import {CollectionIdsAndDocument} from '../utils';
import UserProfile from './userProfile';
import PostPage from './PostPage';

class Application extends Component {
  state = {
    user: null,
    posts: [
      // {
      //   id: '1',
      //   title: 'A Very Hot Take',
      //   content:
      //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
      //   user: {
      //     uid: '123',
      //     displayName: 'Bill Murray',
      //     email: 'billmurray@mailinator.com',
      //     photoURL: 'https://www.fillmurray.com/300/300',
      //   },
      //   stars: 1,
      //   comments: 47,
      // },
      // {
      //   id: '2', 
      //   title: 'The Sauciest of Opinions',
      //   content:
      //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
      //   user: {
      //     uid: '456',
      //     displayName: 'Mill Burray',
      //     email: 'notbillmurray@mailinator.com',
      //     photoURL: 'https://www.fillmurray.com/400/400',
      //   },
      //   stars: 3,
      //   comments: 0,
      // },
    ],
  };

  unSubcribeStore = null;
  unSubcribeAuthUser = null;

  async componentDidMount() {
    // normal get
  //  const snapshot = await firestore.collection('posts').get()
  //  const posts = snapshot.docs.map(CollectionIdsAndDocument)
  //  this.setState({posts})
  //  snapshot.forEach((doc) =>{
  //    const id = doc.id;
  //    const data = doc.data()
  //    console.log({id, data})
  //  });

  // subscribe to the store
    // this.unSubcribeStore = await firestore.collection('posts').onSnapshot(snapshot => {
    //   const posts = snapshot.docs.map(CollectionIdsAndDocument);
    //   this.setState({posts})
    // })
  //  console.log({snapshot})
  // this.unSubcribeAuthUser = await auth.onAuthStateChanged(async userAuth => {
  //   const user = await createUserDocument(userAuth)
  //   this.setState({user})
  // })
  }

  componentWillUnmount() {
    // this.unSubcribeStore()
  }

  handleCreate = async post => {
    const { posts } = this.state;
    const docRef = await firestore.collection('posts').add(post)
    const doc = await docRef.get()
    const newpost = CollectionIdsAndDocument(doc)
    this.setState({ posts: [newpost, ...posts] });
  };

  handleRemove = async id => {
    const allPost = this.state.posts;
    await firestore.doc(`posts/${id}`).delete()
    const posts = allPost.filter(post => post.id !== id);
    this.setState({posts})
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <Link to='/'>  <h1>Think Piece</h1> </Link>
        <Authentication />
        <Switch>
          <Route exact path='/' component={Posts}/>
          <Route exact path='/profile' component={UserProfile} />
          <Route exact path='/post/:id' component={PostPage} />
        </Switch>
        {/* <Posts/> */}
      </main>
    );
  }
}

export default Application;
