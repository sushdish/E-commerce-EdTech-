import React from 'react'
import {BrowserRouter , Switch, Route} from "react-router-dom"
import Home from "./core/Home"
import Signin from './user/Signin'
import Signup from './user/Signup'
import PrivateRoute from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes"
import UserEnrollment from './user/UserEnrollment'
import AdminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import AddCourse from './admin/AddCourse'
import AddTag from './admin/AddTag'
import UserLogs from './admin/UserLogs'
import MostEnrolledCategories from './admin/MostEnrolledCategories'
import CoursesByTagname from './admin/CoursesByTagname'

/// Rendering all my component in index.js 
const Routes =() => {
    return(
        <BrowserRouter>
            <Switch>
                <Route  path="/" exact component={Home}></Route>
                <Route  path="/signup" exact component={Signup}></Route>
                <Route  path="/signin" exact component={Signin}></Route>
                <PrivateRoute path="/userenrollemnt" exact component={UserEnrollment} />
                {/* <PrivateRoute path="/userenrollemnt" exact component={UserEnrollment} />
                <PrivateRoute path="/userenrollemnt" exact component={UserEnrollment} /> */}
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/create/tag" exact component={AddTag} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/create/course" exact component={AddCourse} />
                {/* <AdminRoute path="/admin/userlogs" exact component={UserLogs} /> */}
                <AdminRoute path="/admin/mostEnrolledCategories" exact component={MostEnrolledCategories} />
                {/* <AdminRoute path="/admin/coursesByTagname" exact component={CoursesByTagname} /> */}




            </Switch>
        </BrowserRouter>
    )
}

export default Routes;


