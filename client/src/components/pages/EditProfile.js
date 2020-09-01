import React,{useEffect,useContext,useState} from 'react'

import ProfileContext from '../../context/profile/ProfileContext'
import AuthContext from '../../context/auth/AuthContext'

import { useHistory } from 'react-router-dom'

 const EditProfile = () => {
    const history = useHistory()

    const profileContext = useContext(ProfileContext)
    const {getProfile,editProfile,profileData} = profileContext

    const authContext = useContext(AuthContext) 
    const {user} = authContext

    const [profile, setProfile] = useState({   
        name: '',
        fullname: '',
        profile_pic: '',
        website: '',
        bio: '',
        email: '',
        phone:''
    })

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const onChange = e => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
    }
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
    
    const onSubmit = e => {
        e.preventDefault()
        
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            //uploadImage(reader.result);
            console.log('base : ',reader.result)
            editProfile(user._id,profile,reader.result)

            setFileInputState('');
            setPreviewSource('');

            history.push(`/${user._id}`)
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };

        
        

    }

    
      useEffect(() => {
        getProfile(user._id)
    }, [])
    useEffect(() => {

        if(profileData !== null) {
            
        const {name,fullname,website,bio,email,phone} = profileData
        
       setProfile({...profile,
        name,
        fullname,
        website,
        bio,
        email,
        phone
         })
       
}
    }, [profileData])

    return (
        <>

    {profileData !== null ?  
    <main id="edit-profile">
        <form onSubmit={onSubmit}>
           <div class="edit-profile__container">
            <header class="edit-profile__header">
                <div class="edit-profile__avatar-container">
                    <img src={profileData.profile_pic} class="edit-profile__avatar" />
                </div>
                <div>
                   <h4>{profileData.name}</h4>
               {/*<h5 onClick={() => console.log('hey')} style={{color: '#3d5afe'}} >Edit photo</h5> */}
        <input type="file"
        id="fileInput"
        type="file"
        name="image"
        onChange={handleFileInputChange}
        value={fileInputState}
        className="form-input" />
                </div>
                
            </header>
            <div class="edit-profile__form">
                <div class="form__row">
                    <label for="full-name" class="form__label">Full Name:</label>
                    <input id="full-name" type="text" class="form__input" name="fullname" value={profile.fullname} onChange={onChange} />
                </div>
                <div class="form__row">
                    <label for="user-name" class="form__label">Username:</label>
                    <input id="user-name" type="text" class="form__input" name="name" value={profile.name} onChange={onChange} />
                </div>
                <div class="form__row">
                    <label for="website" class="form__label">Website:</label>
                    <input id="website" type="text" class="form__input" name="website" value={profile.website} onChange={onChange} />
                </div>
                <div class="form__row">
                    <label for="bio" class="form__label">Bio:</label>
                    <textarea id="bio" name="bio" value={profile.bio} onChange={onChange}></textarea>
                </div>
                <div class="form__row">
                    <label for="email" class="form__label">Email:</label>
                    <input id="email" type="email" class="form__input" name="email" value={profile.email} onChange={onChange} />
                </div>
                <div class="form__row">
                    <label for="phone" class="form__label">Phone Number:</label>
                    <input id="phone" type="tel" class="form__input" name="phone" value={profile.phone} onChange={onChange} />
                </div>

                <input type="submit" value="Submit" />
            </div>
        </div> 
        </form>

        {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        
    </main> :
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
</div> 
</div>
    
}
        
    </>
    )
}
export default EditProfile