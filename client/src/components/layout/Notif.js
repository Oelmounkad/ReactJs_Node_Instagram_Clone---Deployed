import React,{useState} from 'react'
import { Button, Toast } from 'react-bootstrap';
const Notif = ({message}) => {

    const [show, setShow] = useState(true);

    return (
        <div style={{position: 'absolute', top: 100, right:20 , zIndex: '1'}}>
              
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Notification</strong>
            <small>11 seconds ago</small>
          </Toast.Header>
    <Toast.Body>{message}</Toast.Body>
        </Toast>
  
      
        </div>
    )
}

export default Notif
