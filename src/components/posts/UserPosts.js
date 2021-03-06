import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { deletePost, GetUserPosts, updatePost } from "./PostManager"
import "./MyPost.css"
import TrashIcon from '../comments/trash.svg'

export const UserPostList = () => {
    const [posts, setposts] = useState([])
    const [userposts, setuserposts] = useState([])
    const history = useHistory()


    useEffect((
        () => {
            Posts()
        }
    ), [])

    const getuserposts = () => {
        let userposts = []
        const theuser = parseInt(localStorage.getItem("userid"))
        for (const thepost of posts) {
            if (parseInt(thepost.user?.id) === theuser) {
                userposts.push(thepost)
            }
        }
        return userposts
    }

    const deletepost = (id) => {
        let result = confirm("Are you sure you want to delete this post? ")
        if (result) {
            deletePost(id)
                .then(GetUserPosts())
                .then(res => setposts(res))
        } else {

        }
    }

    const updateApproval = (id) => {
        let post = posts.find((obj) => {
            return id == obj.id
        })
        const updatedPost = Object.assign({}, post)
        updatedPost.approved = false
        updatedPost.user = post.user?.id
        updatedPost.category = post.category?.id
        let postTags = []
        if (post.tags?.length > 0) {
            for (const tag of post.tags) {
                postTags.push(tag.id)
            }
        }
        updatedPost.tags = postTags
        console.log(updatedPost)
        updatePost(id, updatedPost)
            .then(() => Posts())

    }

    const Posts = () => {
        GetUserPosts()
                .then(res => setposts(res))
    }

    return (<>
        <div className="newpostbutton">
            <button onClick={() => history.push("/new-post")}>New Post</button>

        </div>
        <div className="mypostlist">
            {
                getuserposts().map(each => {
                    return <div key={each.id} className="indpost">
                        <div className="posthead">
                            <div><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                            <div>Publication Date: {new Date(each.publication_date).toLocaleDateString()}</div>
                        </div>

                        <div className="postImage"><img src={each.image_url} /></div>
                        <div className="postfoot">
                            <div>
                                <div> Author: {each.user?.first_name} {each.user?.last_name}</div>
                            </div>

                            <div className="rightfoot">
                                <button onClick={() => { history.push(`/editPost/${each.id}`) }}>edit</button>
                                {each.approved ? <div className="postInfo"><button onClick={() => { updateApproval(each.id) }}>Unapprove</button></div> : ''}
                                <button onClick={() => deletepost(each.id)}><img src={TrashIcon} style={{ height: "1.25rem" }} ></img></button>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </>)
}