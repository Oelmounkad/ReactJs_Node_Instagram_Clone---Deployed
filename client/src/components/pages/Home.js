import React,{useContext} from 'react'

import PostContext from '../../context/post/PostContext'
import { useEffect } from 'react'
import PostItem from '../post/PostItem'

 const Home = () => {
     
    const postContext = useContext(PostContext)
    const {allPosts,getAllPosts} = postContext

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <main id="feed">
            { allPosts !== null ? 
            allPosts.map(post =>  

                <PostItem key={post._id} post={post} />
                
                ) : <div>Waiting...</div> }
        </main>
    )
}
export default Home