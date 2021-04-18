import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function CreatePasswordScreen(props){
    const [password, setPassword]=useState(' ');
    const [confirmPassword, setconfirmPassword]=useState(' ');
    const {token}=useParams()
   const email=props.location.pathname.split('=')[1]
    
    const submitHandler=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/users/create-password", {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ password, confirmPassword, email, token }),
          })
            .then((res) => res.json())
            .then(async (res) => {
              const resData = await res;
              console.log(resData);
              if (resData.status === "success") {
                alert("Message Sent");
              } else if (resData.status === "fail") {
                alert("Message failed to send");
              }
            })
       
    }

   
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div >
                    <h1>
                       Reset Password
                    </h1>

                </div>
                <div>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id="password" placeholder="New Password" required onChange={e=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" id="cpassword" placeholder="Confirm New Password" required onChange={e=>setconfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary" >Reset</button>
                </div>
            </form>
        </div>
    )
}