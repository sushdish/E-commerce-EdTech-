///Note not using this Template 
// Test this method Backend in Postman

import React, {useState} from 'react';
import Base from '../core/Base';
import {userLogins} from "../admin/helper/adminapicall";
import { isAutheticated } from '../auth/helper';


const  UserLogs = () =>{

    const {user, token} = isAutheticated();

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    
    

    const handleFromChange = (event) => {
        setError("");
        setFrom(event.target.value)
    }

    const handleToChange = (event) => {
        setTo(event.target.value)

    }



    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        //Backend Request Fired  getting from ADMIN APi call
        // {From & To is coming from userlogin}
        userLogins(user._id, token, {from, to}).then((data)=> {
            if(data.error){
                setError(true)
            }else {
                setError("")
                setSuccess(true);
                setFrom("");
                setTo("");

            }
        })
    }

  return (
    <Base title="User Logs" description="You can see User Logs here" className="container bg-success p-4 mt-3">
    <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            <form>
                <div className="form-group">
                    <p className="lead text-white font-weight-bold">From</p>
                    <input type="text" className="form-control my-3 mr-4 border-info"
                     onChange={handleFromChange}  value={from}
                     autofocus required placeholder="2022-01-20T00:00:00.998Z" />
                     <p className="lead text-white font-weight-bold">To</p>
                     <input type="text" className="form-control my-3 mr-4 border-info"
                     onChange={handleToChange}  value={to}
                     autofocus required placeholder="2022-01-20T00:00:00.998Z" />
                    <button onClick={onSubmit} className="button btn-outline-info ">See User logins on specific Period</button>
                </div>
            </form>
            </div>
        </div>

  </Base>
  )
}



export default UserLogs;