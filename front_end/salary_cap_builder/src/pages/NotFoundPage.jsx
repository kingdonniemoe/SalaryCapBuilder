import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const NotFoundPage = () => {
    let navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/')
    }
  return (
    <>
    <h1>404 - Not Found</h1>
    <p>Sorry, the page you are looking for doesn not exist.</p>
    <div className='d-grid gap-2'>
        <Button onClick={handleClick} variant="success" size='lg'>Return Home</Button>
    </div>
    </>
  );
}


export default NotFoundPage