import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation} from "react-router-dom"
import { uploadSubscription } from "../../apimanager/subscriptionFetches"
import {getSingleUser} from './userManager'

export const UserPage = () => {
    const { userId } = useParams()
    const history = useHistory()


     // Use States
        //-------------------------------------------------------------------------------------------------------------------
        const [user, setUsers] = useState([])
    
        // Use Effects
        //-------------------------------------------------------------------------------------------------------------------
    
        useEffect(
            () => {
                getSingleUser(userId)
                    .then((data) => {
                        setUsers(data)
                    })
            },
            []
        )

        const handleSub = (evt) => {
            // evt.preventDefault()
    
            const newSubObj = {
                follower_id: +user.id,
                author_id: +localStorage.getItem('token')
            }
    
            uploadSubscription(newSubObj)
            .then(() => {history.push('/')})
            
        
        }

        return (
            <>
               
                <div>
                    <p>Full Name: {user.first_name} {user.last_name} </p>
                    <p>Profile Image: {user.profile_image_url}</p>
                    <p>Username: {user.username}</p>
                    <p>Created: {user.created_on}</p>
                    <p>Bio: {user.bio}</p>
                    <button onClick={handleSub}>Subscribe</button>
                </div>
             
            </>
        )
}