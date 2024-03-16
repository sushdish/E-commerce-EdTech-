import React from "react"
import Menu from "./Menu"


/// A Base Component for all the Component
const Base = ({
    title ="Make learning earsier and Fun",
    description ="Please Signup Here to Enroll our Amazing Courses",
    className = "bg-dark text-white p-4",
    children

})=> (
    <div>
        <Menu />
        <div className="containe-fluid  text-white text-center">
            <div className="jumbotron text-center text-white">
                <h4 className="display-6 py-1">{title}</h4>
                <h5 className="lead">{description}</h5>
            </div>
            <div className={className}>{children}</div>
        </div>
       
    </div>
)



export default Base