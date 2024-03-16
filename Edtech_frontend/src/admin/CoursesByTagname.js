///Note not using this Template 
// Test this method Backend in Postman

import React from 'react';
import Base from '../core/Base';

const  CoursesByTagname =() => {

 const onSubmit = () => {

 }

 const handleChange = () => {

 }

  return (
      <Base title="" description="Find Course by Tagname">
           <form>
                <div className="form-group">
                    <p className="lead text-white font-weight-bold">Enter the Tag</p>
                    <input type="text" className="form-control my-3 mr-4 border-info"
                     onChange={handleChange}  
                     autofocus required placeholder="For Ex. AD (App Development)" />
                    <button onClick={onSubmit} className="button btn-info ">Submit</button>
                </div>
            </form>
      
      </Base>
  );
}



export default CoursesByTagname