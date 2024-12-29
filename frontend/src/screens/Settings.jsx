import React from 'react';
import Navbar from '../components/Navbar';
import defaultImage from '../assets/profile/default.jpg';

const Settings = () => {

 









  return (
    <div className='d-flex align-items-center justify-content-center vh-100 vw-100'>
      
      <Navbar/>
      <form>
        
        <label htmlFor='file-uplaod'>
          <img src={defaultImage} alt=''/>
        </label>

        <input
          type='file'
          lable='Image'
          name='myFile'
          id='file-upload'
          accept='.jpeg, .png,.jpg'
        
        />

        <h3>Taha Khan</h3>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Settings


// function convertToBase64(file) {
//   return new 
// }