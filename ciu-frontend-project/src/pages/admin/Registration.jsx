import React from 'react'
import './Registration.css'

export const Registration = () => {
  return (
    <div className='container'>
        <h1>Register</h1>
            
        <form>
            <label htmlFor='firstName'>First Name</label>
            <input type="text" placeholder='Enter First Name' name='firstname'/>

            <label htmlFor='lastName'>Last Name</label>
            <input type="text" placeholder='Enter Last Name' name='lastname'/>

            {/* <label htmlFor='faculty'>Faculty</label>
            <select name="faculty" id="faculty">
                <option value="Medicine">Medicine</option>
                <option value="Business">Business</option>
            </select>
            */}

            <label htmlFor='email'>Email</label>
            <input type="email" placeholder='Enter Email' name='email'/>

            <label htmlFor='role'>Role</label>
            <select name="role" id="role">
                <option value="Lecture">Lecture</option>
                <option value="Student">Student</option>
                <option value="Student">Admin</option>
            </select>

            <label htmlFor='password'>Password</label>
            <input type="password" placeholder='Enter Password' name='password'/>

            <button type='submit'>Register</button>
           
        </form>
        
    </div>
  )
}

export default Registration