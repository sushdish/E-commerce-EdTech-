import React,{useState} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base"
import {createTag} from "./helper/adminapicall"


const AddTag = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)

    const {user, token} = isAutheticated();

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        )
    }


    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    }


    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        //Backend Request Fired  getting from ADMIN APi call
        // {name is coming from Tag}
        createTag(user._id, token, {name}).then((data)=> {
            if(data.error){
                setError(true)
            }else {
                setError("")
                setSuccess(true);
                setName("");
            }
        })
    }
    // Success Message 
    const successMessage = () => {
        if(success){
            return <h4 className="text-success">{name}Tag has been Created </h4>
        }
    }

        // Warning Messsage
    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to create Tag</h4>
        }
    }



        // Tag Form
    const myTagForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead text-white font-weight-bold">Enter the Tag</p>
                    <input type="text" className="form-control my-3 mr-4 border-info"
                     onChange={handleChange}  value={name}
                     autofocus required placeholder="For Ex. AD (App Development)" />
                    <button onClick={onSubmit} className="button btn-outline-info ">Create Tag</button>
                </div>
            </form>
        )
    }

    return(
        <Base title="Create a Tag here" description="Add a new Tag for new Course" className="container p-4">
            <div className="row bg-dark  rounded pb-3">
                <div className="col-md-12 offser md-2 text-dark">
                    {successMessage()}
                    {warningMessage()}
                    {myTagForm()}
                    {goBack()}
                </div>

            </div>
        </Base>
    )
}

export default AddTag