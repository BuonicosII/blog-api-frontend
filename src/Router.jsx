import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./components/allposts/allposts";
import Post from "./components/post/post"

async function retrievePostAndComments (pathname) {

    const [postJson, postCommentsJson] = await Promise.all([
        await fetch('http://localhost:3000/posts/' + pathname), 
        await fetch('http://localhost:3000/posts/' + pathname + '/comments')
    ]) 

    const retrievedPostAndComments = await Promise.all([await postJson.json(), await postCommentsJson.json()])

    return retrievedPostAndComments
}

export default function Router () {

    const router = createBrowserRouter([
        {
            path: "/", 
            element: <AllPosts />
        },
        {
            path: "/:id",
            element: <Post />, 
            loader: ({params}) => retrievePostAndComments(params.id)
        }
    ])

    return <RouterProvider router={router} />
}