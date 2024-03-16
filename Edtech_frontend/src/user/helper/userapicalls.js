import {API} from '../../backend'
//  API  http://localhost:7000/api/


// Calling User Enrollment 
export const userEnrollment = (userId, token, userenrolled) => {
    return fetch(`${API}userenrollment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId: userId, courseId: userenrolled})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

