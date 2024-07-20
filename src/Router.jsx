import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./components/allposts/allposts";
import Post from "./components/post/post"
import Header from "./components/header/header"
import SignUp from "./components/sign-up-form/sign-up-form";
import LogIn from "./components/log-in/log-in";

async function retrievePostAndComments (pathname) {

    const [postJson, postCommentsJson] = await Promise.all([
        await fetch('http://localhost:3000/posts/' + pathname), 
        await fetch('http://localhost:3000/posts/' + pathname + '/comments')
    ]) 

    const retrievedPostAndComments = await Promise.all([await postJson.json(), await postCommentsJson.json()])

    return retrievedPostAndComments
}

async function retrievePosts () {
    const postsJson = await fetch('http://localhost:3000/posts');
    const retrievedPosts = await postsJson.json()

    return retrievedPosts
}

export default function Router () {

    const router = createBrowserRouter([
        {
            path: "/", 
            element: <><Header /><AllPosts /></>,
            loader: retrievePosts
        },
        {
            path: "/:id",
            element: <><Header /><Post /></>, 
            loader: ({params}) => retrievePostAndComments(params.id)
        },
        {
            path: "/sign-up",
            element: <><Header /><SignUp /></>
        },
        {
            path: "/log-in",
            element: <><Header /><LogIn /></>
        }
    ])

    return <RouterProvider router={router} />
}