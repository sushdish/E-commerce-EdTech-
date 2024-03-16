import React from 'react'
import { API } from '../backend'
import '../styles.css'
import Base from './Base'



export default function Home() {

    //Fetching This APi from Backend.js file
    // console.log("API is", API)
    return(
        <Base>
            <div className="bg-dark text-center">
                <h1 className="text-center text-light">Welcome to Online Learning</h1>
                {/* <h6 to="/signin">Please Signup Here to Enroll our Amazing Courses</h6> */}
            </div>
        </Base>
    )

}