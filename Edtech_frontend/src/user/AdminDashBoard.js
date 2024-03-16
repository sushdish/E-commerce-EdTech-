import React from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import Base from "../core/Base"



const AdminDashboard = () => {

    //  Getting data from Autheticated middleware
    const {user: {name , email, role }} = isAutheticated();

    // Admin Left side form
    const adminLeftSide = ()=> {
        return(
            <div className='card'>
                <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
                <ul className="list-group">
                <li className="list-group-item p-0">
                        <Link to="/admin/create/tag" className="nav-link text-dark"> Create Tag</Link>
                    </li>
                    <li className="list-group-item p-0">
                        <Link to="/admin/create/category" className="nav-link text-dark"> Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/course" className="nav-link text-dark"> Create course</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/mostEnrolledCategories" className="nav-link text-dark"> Most Enrolled Categories</Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link to="/admin/coursesByTagname" className="nav-link text-dark"> List of Courses by Tagname</Link>
                    </li> */}
                </ul>
            </div>
        )
    }

    // Admin right side form
    const adminRightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header text-info"> Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="text-dark mr-3">Name :- </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="text-dark mr-3">Email :- </span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="text-danger">Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title='Welcome to Admin Dashboard' description='Manage all your products' className='container bg-success p-4 mt-3'>
            <div className='row'>
            <div className='col-3'>{adminLeftSide()}</div>
            <div className='col-9'> {adminRightSide()}</div>
            </div>
        </Base>
    )
}

export default AdminDashboard