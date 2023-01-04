import React, { useContext, useState } from "react";

import PostContext from "../../context/post/PostContext";
import { useEffect } from "react";
import PostItem from "../post/PostItem";
import Stories from "../story/Stories";
import Notif from "../layout/Notif";

const Feed = () => {
  const postContext = useContext(PostContext);
  const { allPosts, getAllPosts } = postContext;

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Notif message="Test notification !!" />
      <Stories />
      <main id="feed">
        {allPosts !== null ? (
          allPosts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default Feed;
