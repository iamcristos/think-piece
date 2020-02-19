import React, {useContext} from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostContext } from '../provider/providerComponent'


const Posts = ( ) => {
  const posts = useContext(PostContext)
  return (
    <section className="Posts">
      <AddPost  />
      {/* <PostContext.Consumer> */}
        {  posts.map(post => <Post {...post} key={post.id} />) }
      {/* </PostContext.Consumer> */}
    </section>
  )
}

export default Posts;
