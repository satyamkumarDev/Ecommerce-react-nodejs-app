import React, { useRef, useState } from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {Link} from 'react-router-dom';
// import Axios from 'axios';
// import LoadingBox from '../component/LoadingBox';
// import MessageBox from '../component/MessageBox';

export default function ResetPasswordScreen(props){
    const [email, setEmail]=useState(' ');
    const resetForm = useRef(null)
    
        const submitHandler = async (e) => {
            e.preventDefault();
            console.log({ email });
            const response = await fetch("http://localhost:3000/api/users/resetPassword", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ email }),
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
              
              resetForm.current.reset();

       
    }

    
    return(
        <div>
            <form className="form" onSubmit={submitHandler} ref={resetForm}>
                <div >
                    <h1>
                       Reset Password
                    </h1>

                </div>
                    
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email" required onChange={e=>setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary" > Send Mail</button>
                </div>
                <div>
                    <label />
    
                </div>
            </form>
        </div>
    )
}