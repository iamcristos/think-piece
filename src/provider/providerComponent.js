import React ,{Component, createContext } from "react";
import { firestore } from '../firebase';
import {CollectionIdsAndDocument} from '../utils'

export const PostContext = createContext()
class PostProvider extends Component {
    state = {posts: []}

    unsubscribeFromFirestore = null;
    async componentDidMount() {
        this.unSubcribeStore = await firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(CollectionIdsAndDocument);
            this.setState({posts})
          })
    }

    componentWillUnmount() {
        this.unSubcribeStore()
    }

    render() {
        const { posts } = this.state;
        const { children } = this.props;

        return (
            <PostContext.Provider value={posts}>
             {children}
             </PostContext.Provider>
        )
    }
};

export default PostProvider;