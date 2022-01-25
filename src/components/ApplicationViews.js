import React from "react"
import { Route } from "react-router-dom"
import { PostDetail } from "./posts/Postdetail"
import { PostList } from "./posts/Postlist"
import { CategoryList } from "./categories/CategoryList"
import { TagManagement } from "./tags/TagManagement"
import { UserPostList } from "./posts/UserPosts"
import { NewPost } from "./posts/NewPost"

export const ApplicationViews = () => {
  return (<>
    <h1 >Welcome to Rare Publishing</h1>
    <Route exact path="/posts" >
      <PostList/>
    </Route>
    <Route exact path="/posts/:postId(\d+)" >
      <PostDetail/>
    </Route>
    <Route exact path="/categories">
      <CategoryList />
    </Route>
    <Route exact path="/tags">
      <TagManagement />
    </Route>
    <Route exact path="/my-posts">
      <UserPostList />
    </Route>
    <Route exact path="/new-post">
      <NewPost/>
    </Route>
  </>)
}
