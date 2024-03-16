import React,{useState, useEffect} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base"
import {createCategory, } from "./helper/adminapicall"


const AddCategory = () => {

  const {user, token} = isAutheticated();

  const [name, setName] = useState("")
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)


  const goBack = () => {
    return(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    )
}

 // On change 
  const handleChange = (event) => {
      setError("");
      setName(event.target.value)
  }

  // OnSubmit Method 
  const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSuccess(false);


      //Backend Request Fired  getting from ADMIN APi call
      // {name is coming from Category}
      createCategory(user._id, token, {name}).then((data)=> {
          if(data.error){
              setError(true)
          }else {
              setError("")
              setSuccess(true);
              setName("");
          }
      })
  }
  // Success Messgae 
  const successMessage = () => {
      if(success){
          return <h4 className="text-success">{name} Category has been Created </h4>
      }
  }

  // Warning Message 
  const warningMessage = () => {
      if(error){
          return <h4 className="text-danger">Failed to create Category</h4>
      }
  }

    // Category Form
    const myCategoryForm = () => {
        return(
            <form>
            {/* <span>Post image</span> */}
            <div className="form-group">
              <label className="btn btn-block btn-dark">
              </label>
            </div>
            <div className="form-group m-1">
              <input
                onChange={handleChange}  
                value={name}
                type="text"
                className="form-control"
                placeholder="Category Name"
                autofocus required
              />
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success m-2"
            >
              Create Category
            </button>
          </form>
        )
    }

    return(
        <Base title="Create a category here" description="Add a new category for new T-shirts" className="container p-4">
            <div className="row bg-dark  rounded pb-3">
                <div className="col-md-12 offser md-2 text-dark">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>

            </div>
        </Base>
    )
}

export default AddCategory