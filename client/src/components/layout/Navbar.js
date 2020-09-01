import React,{useContext,useState} from 'react'
import logo from '../../images/navbar/logo.png'

import AuthContext from '../../context/auth/AuthContext'

import PostContext from '../../context/post/PostContext'

import {Link,useHistory} from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()
    const authContext = useContext(AuthContext);

    const {isAuthenticated,user,logout} = authContext

    const postContext = useContext(PostContext);

    const {addPost} = postContext
    
    const handleLogout = () => {
        logout()
        history.push('/login')
    }

    /*Add photo Modal state and preview/onchange functions */
    const [post, setPost] = useState({
        title: '',
        location: ''
    })

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const onChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if(file instanceof Blob){
            previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        }else{
            setPreviewSource('');
            setFileInputState('');
        }
        
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const onSubmitModal = e => {
        e.preventDefault()
        
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {

            const data = {
                title: post.title,
                location: post.location,
                image: reader.result
            }
            addPost(data)

            setFileInputState('');
            setPreviewSource('');
            setPost({
                title: '',
                location: ''
            })

        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    }
    const authLinks = (
        <>
          <div class="navigation__column">
          <Link to="/">
            <img src={logo} />
            </Link>
        </div>

               <div class="navigation__column">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="Search" />
        </div>
        <div class="navigation__column">
            <ul class="navigations__links">

            <li class="navigation__list-item">
                <div data-toggle="modal" data-target="#staticBackdrop" style={{cursor: 'pointer',color: 'darkblue'}} className="navigation__link">
                <i class="fas fa-plus-circle fa-lg"></i>
                    </div>

                </li>

            {/*modal to add a post*/}
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Add a new Post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <input class="form-control form-control-lg" type="text" name="title" placeholder="Title" value={post.title} onChange={onChange} />

      <input class="form-control form-control-lg" type="text" name="location" placeholder="Location" value={post.location} onChange={onChange} />
      
    <div class="form-group">
            <label for="exampleFormControlFile1">Photo</label>
            <input  type="file" 
                    id="fileInput"
                    class="form-control-file" 
                    onChange={handleFileInputChange}
                    value={fileInputState}

                    
                    />
    </div>
    {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={onSubmitModal} type="button" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
       {/*finish modal to add a post*/}  

            <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="fas fa-paper-plane fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="far fa-compass fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="far fa-heart fa-lg"></i>
                    </a>
                </li>
                {user !== null && <li class="navigation__list-item">
                <Link style={{textDecoration: 'none'}} className="navigation__link" to={`/${user._id}`}>
                    <i class="far fa-user-circle fa-lg"></i>
                    </Link>

                </li>
                }
                
                <li class="navigation__list-item">
                <div onClick={handleLogout} style={{cursor: 'pointer'}} className="navigation__link ico-red">
                    <i class="fas fa-power-off fa-lg"></i>
                    </div>

                </li>
                
                
            </ul>
        </div>
        </>
      )

      const guestLinks = (
        <>
        <div class="navigation__column">
            <Link to="/">
            <img src={logo} />
            </Link>
        </div>
        </>
      )
    

    return (
        <nav class="navigation">
      { isAuthenticated && user !== null ?  authLinks : guestLinks}
    </nav>
    )
}
export default Navbar