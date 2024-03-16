import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {getTags, getCategories, createCourse, createCategory } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



const AddCourse = () => {

  const {user, token} = isAutheticated();


  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    language: "",
    viewscount: "",
    photo: "",
    categories: "",
    category: "",
    tags: "",
    createdCourse: "",
    formData: "",
    loading: false,
    error: "",
    getRedirect: false,
  });

  const { title, subtitle, language, viewscount, tags, photo, categories, category
    , createdCourse , getRedirect, formData , loading, error } = values;


    const preload = async () => {
       
        try{
          const categories = await getCategories()
          const tags = await getTags()
          setValues({...values, categories, tags, formData: new FormData()})
        } catch(err) {
            setValues({...values, loading: false})
        }
    }

  useEffect(() => {
    preload();
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true})
    createCourse(user._id, token, formData).then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      }
      else {
        setValues({...values, title: "", subtitle: "", language: "",
      photo: null,viewscount: "", categories: "", tags: "", loading: false, createdCourse: values.title})
      }
    })
  };

  const handleChange = title => event => {
    const value = title == "photo" ? event.target.files[0] : event.target.value
    formData.set(title, value)
    setValues({...values, [title]: value})
  };

  const successMessage = () => (
    <div className="text-info"
    style={{display: createdCourse ? "" : "none" }} >
      <h5 className="m-0 p-0 text-light">{createdCourse} created Successfully</h5>
    </div>
  )

  const warningMessage = () => {
    if(error){
      return <h4 className="text-danger">Failed to create Course</h4>
  }
  }

  const createCourseForm = () => (
    <form>
      {/* <span>Post photo</span> */}
      <div className="form-group">
        <label className="btn btn-block btn-dark">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group m-1">
        <input
          onChange={handleChange("title")}
          name="photo"
          className="form-control"
          placeholder="Title"
          value={title}
        />
      </div>
      <div className="form-group m-1">
        <input
          onChange={handleChange("subtitle")}
          name="photo"
          className="form-control"
          placeholder="subtitle"
          value={subtitle}
        />
      </div>
      <div className="form-group m-1">
        <input
          onChange={handleChange("language")}
          className="form-control"
          placeholder="Language"
          value={language}
        />
      </div>
      <div className="form-group m-1">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={values.category}
        >
          <option>Select Category</option>
          {categories &&
          categories.map((cate, index)=> (
            <option key={index} value={cate._id}>{cate.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group m-1">
        <select
          onChange={handleChange("tag")}
          className="form-control"
          placeholder="Tag"
          value={values.tag}
        >
          <option>Select tag</option>
          {tags &&
          tags.map((tag, index)=> (
            <option key={index} value={tag._id}>{tag.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group m-1">
        <input
          onChange={handleChange("viewscount")}
          type="number"
          className="form-control"
          placeholder="ViewsCount"
          value={viewscount}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success m-2"
      >
        Create Course
      </button>
    </form>
  );

  return (
    <Base
      title="Add a Course here!"
      description="Welcome to Course creation section"
      className="container bg-success p-1"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-1">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createCourseForm()}</div>
      </div>
    </Base>
  );
};

export default AddCourse;
