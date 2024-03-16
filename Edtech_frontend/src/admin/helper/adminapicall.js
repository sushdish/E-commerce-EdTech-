import {API} from "../../backend"


//Creating Tag Here 
export const createTag = (userId, token, tag) => {
    return fetch(`${API}/tag/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tag)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

// get All Tags 
export const getTags = () => {
    return fetch(`${API}/tags`, {
         method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
    
 }

//createCategory
export const createCategory = (userId, token ,category) => {
    return fetch(`${API}category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}




//getallCategories
export const getCategories = () => {
   return fetch(`${API}/categories`, {
        method: "GET"
   })
   .then(response => {
       return response.json();
   })
   .catch(err => console.log(err))
   
}





//create Course 
export const createCourse = (userId,token, course) => {
    return fetch(`${API}/course/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: course
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}



// get Course 

export const getCourses = () => {
    return fetch(`${API}/courses`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


//User Logins
export const userLogins = (userId, token, userlogin) => {
    return fetch(`${API}userlogins/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userlogin)
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

//Most Enrolled categories
export const getmostEnrolledCategories = () => {
    return fetch(`${API}category/mostenrolledcategory`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


/// List of Courses By Tagname 
export const listOfCoursesTagName = () => {
    return fetch(`${API}/tag/coursesbytagname`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err)) 
}



