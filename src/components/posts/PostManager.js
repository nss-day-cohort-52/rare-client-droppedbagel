export const GetPosts = () => {
    return fetch("http://localhost:8000/posts")
        .then(res => res.json())
}

export const getSinglePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`)
        .then(res => res.json())
}

export const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE"
    })
}

export const updatePost = (id, newPost) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
}

export const New_post = (post_body) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_body)
    })
        .then(res => res.json())
}

export const New_entrytags = (post_body) => {
    return fetch("http://localhost:8000/posttags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_body)
    })
}

export const GetPostReactions = () => {
    return fetch("http://localhost:8000/postreactions")
        .then(res => res.json())
}

export const GetReactions = () => {
    return fetch("http://localhost:8000/reactions")
        .then(res => res.json())
}

export const New_reaction = (post_body) => {
    return fetch("http://localhost:8000/postreactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post_body)
    })
}

export const deletePostReaction = (id) => {
    return fetch(`http://localhost:8000/postreactions/${id}`, {
        method: "DELETE"
    })
}