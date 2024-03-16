import React, { useState} from 'react'
import {API} from '../backend'
import Base from '../core/Base'
import {Link, Redirect} from 'react-router-dom'
import { signup } from '../auth/helper'
import FormData from "form-data"



const Signup =() => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        country: "",
        city: "",
        education: "",
        language: "",
        error: "",
        image:"",
        success: false,
        role: "",
        })


    //Destructing the sestates 
    const {name , email, password, city, country, language, education, error, success,image, role} = values;

        // To get the values from the frontend and store in state

    const handleImage = async (event) => {
        event.preventDefault();
        event.persist();
        let files = await event.target?.files
        var mimeType = files[0]?.type;
        if (files) {
            if (mimeType?.includes('image')) {
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = (_event) => {
                    // setArtistImage(_event.target.result)
                    let imageData;
                    imageData = reader.result;
                    imageData = imageData.split(",")[1];
                    let image_data = { mime: mimeType, data: imageData, imageresult: reader.result };
                    console.log("image_data", image_data)
                    setValues({ ...values, image: image_data })
                };

            } else console.log("Invalid file format");
        }
    }
    
    const handleChange = parameter =>  event => {
        console.log(parameter , "DA")
        console.log(event.target.value , "AD")
        setValues({...values, [parameter]: event.target.value})
    }

    // For submit button
    const onSubmit = (event)=> {
        event.preventDefault()
        console.log(values , "CC")
        setValues({...values, error: false})
        console.log(values, "PP")
        signup({...values}).then(data => {
            if(data.error){
                setValues({...values, error: data.error, error: false});
            }
            else {
                setValues({...values, name :"", email: "", password: "",
                education: "", city: "", language: "",role: "", country: "", error: "", success: true })
            }
            console.log(data)
        })
        .catch( console.log(error))
        // console.log(values)
    }


 

    // for success Alert 
    const successMessage = ()=> {
        return(
            <div className="alert alert-success"
            style={{display: success ? "": "none"}}
            >
            New Account has been created. Please <Link to="/signin">Login Here</Link>
            </div>
        )
    }
    
    // For Error alert
    const errorMessage = ()=> {
        return(
            <div className="alert alert-danger"
            style={{display: error ? "": "none"}}
            >
            Unable to signin
            </div>
        )
    }




    const signupform =()=> {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" value={name} onChange={handleChange("name")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Email</label>
                            <input  className="form-control" value={email}  onChange={handleChange("email")} type="Email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Password</label>
                            <input  className="form-control" value={password}  onChange={handleChange("password")} type="password" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Country</label>
                            <input  className="form-control" value={country}  onChange={handleChange("country")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">City</label>
                            <input  className="form-control" value={city}  onChange={handleChange("city")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Education</label>
                            <input  className="form-control" value={education}  onChange={handleChange("education")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Language</label>
                            <input  className="form-control" value={language}  onChange={handleChange("language")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Role</label>
                            <input  className="form-control" value={role}  onChange={handleChange("role")} type="text" placeholder="Login as a admin than enter 1 else 0" />
                        </div>
                        <div className="form-group">
                            <label className="text-light mt-2">Image (Upload less then 10kb image)</label>
                            <input  className="form-control" enc  onChange={(e)=>{handleImage(e)}} name="image" accept="image" type="file"  />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block mt-3">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Sign Up Page" description="A page for user to signup">
            {successMessage()}
            {errorMessage()}
            {signupform()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>

    )
}

export default Signup