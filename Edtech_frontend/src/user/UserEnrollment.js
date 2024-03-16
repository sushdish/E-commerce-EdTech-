import React, { useState, useEffect } from 'react';
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {getCourses } from "../admin/helper/adminapicall";
import { isAutheticated } from "../auth/helper";
import {userEnrollment} from "./helper/userapicalls"

const  UserEnrollment = () =>{

  // Getching Data from Middlware 
  const {user: {name , email, role },user , token} = isAutheticated();

  const [values, setValues] = useState({
    loading: false,
    courses: "",
    course: "",
    enrollsuccessful: "",
    error: false,
    success: false,
  })

    // Destructing
  const {loading, courses, course, error, success, enrollsuccessful} = values;

  const preload = async () => {
      // getting the courses to enroll for student 
    try{
      const courses = await getCourses();
      setValues({...values, courses, formData: new FormData()})
    } catch(err) {
        setValues({...values, loading: false})
        console.log(courses)
    }
  }


  useEffect(()=> {
    preload();
  },[])

   // HandleChange
  const handleChange = course => event => {
    setValues({...values, error: "", [course]: event.target.value})
  }

  // on Submit Method 
  const onSubmit =  (event) => {
      event.preventDefault();
      setValues({...values, error: "", succes: false})

      userEnrollment(user._id, token , course).then(data => {
        if(data.error){
          setValues({...values, error: true})
        }
        else {
          setValues({...values, success: true, error: "", course: "", courses: "", enrollsuccessful: values.course})
        }
      })

  }
  // Sucess Message 
  const successMessage = () => (
    <div className="text-info"
    style={{display: enrollsuccessful ? "" : "none" }} >
      <h5 className="m-0 p-0 text-light">You have enrolled the course Successfully</h5>
    </div>
  )

   // Warning Messsage
  const warningMessage = () => {
    if(error){
      return <h4 className="text-light">Failed to enroll the  Course</h4>
  }
  }


  return (
      <Base title="User Enrollment" description="Enroll Your Course Here" className="container bg-success p-4 mt-3">
       <div className="row">
         {successMessage()}
        {warningMessage()}
                <div className="col-md-6 offset-sm-3 text-left mt-2">
                    <form>
                    <select
                      onChange={handleChange("course")}
                      className="form-control"
                      placeholder="Course"
                    >
                      <option>Select Course</option>
                      {courses &&
                      courses.map((course, index)=> (
                        <option key={index} value={course._id}>{course.title}</option>
                      ))}
                    </select>
                        <button  onClick={onSubmit} className="btn btn-dark btn-block mt-3">Click Here to enroll Course</button>
                    </form>
                    <div className="card m-4">
                <h4 className="card-header text-info"> User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="text-dark mr-3">Name :- </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="text-dark mr-3">Email :- </span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="text-danger">User Area</span>
                    </li>
                </ul>
            </div>
                </div>
            </div>
      </Base>
  )
}



export default UserEnrollment