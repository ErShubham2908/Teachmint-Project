import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Style.css'
import { NavLink } from 'react-router-dom';

function User() {

    const [user, setUser] = useState([]);
    const [post, setPost] = useState([]);

    // fetch user detail
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => setUser(response.data))
        .catch((err) => console.log('Error fetching users', err))
    }, [])

    useEffect(() => {
        async function fetchDataForUsers() {
            const newData = await Promise.all(
                user.map(async (userItem) => {
                    const postData = await axios.get(
                        `https://jsonplaceholder.typicode.com/posts?userId=${userItem.id}`
                    );
                    const posts = postData.data;
                    return {
                        id: userItem.id,
                        count: posts.length,
                        name:userItem.name, 
                        username : userItem.username,
                        postData : postData
                    };
                })
            );
            setPost(newData);
        }

        if (user.length > 0) {
            fetchDataForUsers();
        }
    }, [user]);

  return (
    <>  
        {post.map((item, index) =>{
            return(
                <div key={index} className='user_parent'> 
                    <NavLink className='userLink' to={`/user/${item.id}`} state={{postData: item.postData.data, userData: user}} > 
                        <h3>Username : {item.username}</h3>
                        <h3> post : {item.count}</h3>
                    </NavLink>
                </div>
            )
        })}      
    </>
  )
}

export default User;
