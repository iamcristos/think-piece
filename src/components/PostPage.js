import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

import Post from './Post'
import Comments from './Comments';
import { firestore } from '../firebase';
import {  CollectionIdsAndDocument } from '../utils';

class PostPage extends Component {

    state = { post: null, comments: [] };

    get postId() {
        return this.props.match.params.id;
    }

    get postRef() {
        return firestore.doc(`posts/${this.postId}`);
    }

    get commentsRef() {
        return this.postRef.collection('comments');
    }

    onCreate = (comment) =>{
        this.commentsRef.add({
            ...comment
        })
    }

    unsubscribeFromPosts = null;
    unsubscribeFromComments = null;

    componentDidMount = async () => {
        this.unsubscribeFromPosts = this.postRef.onSnapshot(snapshot => {
            const post = CollectionIdsAndDocument(snapshot)
            this.setState({post})
        })
        this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
            const comments = snapshot.docs.map(CollectionIdsAndDocument(snapshot))
            this.setState({comments})
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromPosts()
        this.unsubscribeFromComments()
    }
    
    render() {
        const {post, comments } = this.state;
        return (
            <section>
                {post && <Post {...post} />}
                <Comments
                    comments={comments}
                    // postId={post.id}
                    onCreate={this.onCreate}
                />
            </section>
        )
    }
}

export default  withRouter(PostPage);