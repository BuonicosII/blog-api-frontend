import { useLoaderData } from "react-router-dom"


export default function Post () {

    const post = useLoaderData()[0]
    const comments = useLoaderData()[1]

    console.log(post, comments)

    return <div>
        Hi
    </div>
}