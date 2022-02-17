import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetAdminPosts, getSinglePost, updatePost } from "./PostManager"
import { getCategories } from "../../apimanager/categoryFetches"
import { getAllUsers } from '../Users/userManager'
import { getAllTags } from "../tags/TagManager";


export const AdminPostList = () => {
    const [posts, setposts] = useState([])
    const [titles, setTitles] = useState([])
    const [categories, setCategories] = useState([])
    const [filtered, setFiltered] = useState([])
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const unapproveString = ' (UNAPPROVED) '


    useEffect((
        () => {
            adminPosts()
        }
    ), [])

    useEffect((
        () => {
            const originalTitle = posts.map((title) => {
                return title.title, title.id
            })
        }
    ), [])

    useEffect(() => {
        getCategories()
            .then(setCategories)

    },
        [])

    useEffect(
        () => {
            setFiltered(posts)
        },
        [posts]
    )

    useEffect(
        () => {
            getAllUsers()
                .then((data) => {
                    setUsers(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllTags()
                .then(setTags)
        }, [])



    // FUNCTIONS ---------------------------------------------------------------------------------------------------------------
    const filterCategory = (categoryid) => {
        if (categoryid == 0) {
            return fetch(`http://localhost:8000/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        } else {
            return fetch(`http://localhost:8000/posts?catfilter=${categoryid}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))

        }
    }

    const filterUser = (userid) => {
        if (userid == 0) {
            return fetch(`http://localhost:8000/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        } else {
            return fetch(`http://localhost:8000/posts?userfilter=${userid}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }

    const filterTag = (tagid) => {
        if (tagid == 0) {
            return fetch(`http://localhost:8000/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        } else {
            return fetch(`http://localhost:8000/posts?tagfilter=${tagid}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }

    const searchFunction = (event) => {
        if (event.key === "Enter") {
            return fetch(`http://localhost:8000/posts?search=${event.target.value}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }

    const updateApproval = (id) => {
        let post = posts.find((obj) => {
            return id == obj.id
        })
        const updatedPost = Object.assign({}, post)
        updatedPost.approved = true
        updatedPost.user = post.user?.id
        updatedPost.category = post.category?.id
        console.log(updatedPost)
        updatePost(id, updatedPost)
            .then(() => adminPosts())
  
    }

    const adminPosts = () => {
        GetAdminPosts()
                .then(res => setposts(res))
    }


    // JSX ---------------------------------------------------------------------------------------------------------------
    return (<>
        <div className="filters">
            <select className="filterBox" onChange={(evt) => { filterCategory(evt.target.value) }} name="filter" id="filter">
                <option value={0}>category</option>
                {categories.map(category => {
                    return <option value={category.id}>{category.label}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterUser(evt.target.value) }} name="filter" id="filter">
                <option value={0}>user</option>
                {users.map(user => {
                    return <option value={user.id}>{user.user?.username}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterTag(evt.target.value) }} name="filter" id="filter">
                <option value={0}>tag</option>
                {tags.map(tag => {
                    return <option value={tag.id}>{tag.label}</option>
                })}
            </select>

            <div className="searchContainer">
                <input className="searchBar"
                    onKeyPress={(e) => searchFunction(e)}
                    placeholder="search..."></input>
            </div>
        </div>

        <div className="postObj">
            <div className="postInfo"><b>Title</b></div>
            <div className="postInfo"><b>Author</b></div>
            <div className="postInfo"><b>Category</b></div>
        </div>

        {
            filtered.map(each => {
                return <div key={each.id} className="postObj">
                    <div className="postInfo"><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                    <div className="postInfo"> {each.user?.user.first_name} {each.user?.user.last_name}</div>
                    <div className="postInfo">{each.category?.label}</div>
                    <div className="postInfo"><button onClick={() => {updateApproval(each.id)}}>Approve</button></div>
                </div>
            })
        }

    </>)
}