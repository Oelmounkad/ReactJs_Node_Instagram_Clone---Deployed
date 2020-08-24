import React,{useEffect,useContext} from 'react'

import ProfileContext from '../../context/profile/ProfileContext'

const Profile = props => {

    const profileContext = useContext(ProfileContext)
    const {getProfile,profileData,profilePosts} = profileContext

    const { match: { params } } = props

useEffect(() => {
    getProfile(params.userId)
}, [])

    return (
        
       <>
            
            {profileData !== null ?
             <main id="profile">
            <header class="profile__header">
            <div class="profile__column">
                <img src={profileData.profile_pic} />
            </div>
            <div class="profile__column">
                <div class="profile__title">
                    <h3 class="profile__username">{profileData.name}</h3>
                    <a href="edit-profile.html">Edit profile</a>
                    <i class="fa fa-cog fa-lg"></i>
                </div>
                <ul class="profile__stats">
                    <li class="profile__stat">
                        <span class="stat__number">X</span> posts
                    </li>
                    <li class="profile__stat">
                        <span class="stat__number">X</span> followers
                    </li>
                    <li class="profile__stat">
                        <span class="stat__number">X</span> following
                    </li>
                </ul>
                <p class="profile__bio">
                    <span class="profile__full-name">
                    {profileData.fullname} <br />
                    </span> {profileData.bio}
                </p>
            </div>
        </header>
        <hr />
        <section class="profile__photos">
            { profilePosts !== null ? 
            
            profilePosts.map(post => (

                <div class="profile__photo">
                <img src={post.img_url} />
                <div class="profile__photo-overlay">
                    <span class="overlay__item">
                        <i class="fa fa-heart"></i>
                        {post.likes}
                    </span>
                    <span class="overlay__item">
                        <i class="fa fa-comment"></i>
                        {post.comments.length}
                    </span>
                </div>
            </div>

    )) : 
    <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
     <span class="sr-only">Loading...</span>
    </div> 
    </div>
        }
           

        </section>
        </main>
            : 

            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
    </div> 
    </div>
            }
            </>


 
    )
}
export default Profile