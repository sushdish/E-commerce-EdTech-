import React,{useState, useEffect} from 'react';
import Base from '../core/Base';
import {getmostEnrolledCategories} from "../admin/helper/adminapicall"

const  MostEnrolledCategory =() =>{

  const [values, setValues] = useState({
    loading: false,
    mostenrolled: "",
  })

  // Destructing the Values 
  const {loading, mostenrolled} = values;

  const preload = async () => {
       
    try{
      const mostenrolled = await getmostEnrolledCategories()
      setValues({...values, mostenrolled, formData: new FormData()})
    } catch(err) {
        setValues({...values, loading: false})
    }
    // console.log("Most Enrolled:", mostenrolled)
}

  
  // Just to preload the most enrolled Category 
  useEffect(() => {
   preload();
  }, []);
  

  return (
    <Base title="Most Enrolled Categories">
       <div className="card mb-4">
                <ul className="list-group">
                    <li className="list-group-item">
                        <h4 className="text-dark mr-3">Most Enrolled Categories</h4> 
                    </li>
                    <li className="list-group-item">
                        <span className="text-dark mr-3">{
                         mostenrolled &&  mostenrolled.map((enroll, index)=> (
                          <option key={index} value={enroll._id}>{enroll.name}</option>
                        ))
                        }</span> 
                    </li>
                </ul>
            </div>
    </Base>
  );
}



export default MostEnrolledCategory