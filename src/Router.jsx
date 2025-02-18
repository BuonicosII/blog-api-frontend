import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import AllPosts from "./components/allposts/allposts";
import Post from "./components/post/post";
import Header from "./components/header/header";
import SignUp from "./components/sign-up-form/sign-up-form";
import LogIn from "./components/log-in/log-in";
import CreatePost from "./components/create-post/create-post";
import UserView from "./components/userview/userview";

async function retrievePostAndComments(pathname) {
  const [postJson, postCommentsJson] = await Promise.all([
    await fetch("http://localhost:3000/posts/" + pathname),
    await fetch("http://localhost:3000/posts/" + pathname + "/comments"),
  ]);

  const retrievedPostAndComments = await Promise.all([
    await postJson.json(),
    await postCommentsJson.json(),
  ]);

  return retrievedPostAndComments;
}

async function retrievePosts() {
  const postsJson = await fetch("http://localhost:3000/posts");
  const retrievedPosts = await postsJson.json();

  return retrievedPosts;
}

async function retrieveUserPosts(userid) {
  const postsJson = await fetch("http://localhost:3000/posts");
  const retrievedPosts = await postsJson.json();

  const retrievedUserPosts = retrievedPosts.filter(
    (post) => post.userId === userid
  );

  return retrievedUserPosts;
}

async function retrieveUserComments(userid) {
  const commentsJson = await fetch("http://localhost:3000/comments");
  const retrievedComments = await commentsJson.json();

  const retrievedUserComments = retrievedComments.filter(
    (comment) => comment.user.id === userid
  );

  return retrievedUserComments;
}

async function userLogged() {
  if (localStorage.getItem("token")) {
    const userJson = await fetch("http://localhost:3000/users/user", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    const user = await userJson.json();

    return user;
  } else {
    return null;
  }
}

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <AllPosts />
        </>
      ),
      loader: async () => {
        const data = await Promise.all([userLogged(), retrievePosts()]);
        return data;
      },
    },
    {
      path: "/:id",
      element: (
        <>
          <Header />
          <Post />
        </>
      ),
      loader: async ({ params }) => {
        const data = await Promise.all([
          userLogged(),
          retrievePostAndComments(params.id),
        ]);

        if (
          !data[1][0].published &&
          (!data[0] || data[0].id !== data[1][0].user.id)
        ) {
          return redirect("/");
        }

        return data;
      },
    },
    {
      path: "user/:id",
      element: (
        <>
          <Header />
          <UserView />
        </>
      ),
      loader: async ({ params }) => {
        const data = await Promise.all([
          userLogged(),
          retrieveUserPosts(params.id),
          retrieveUserComments(params.id),
        ]);

        if (!data[0]) {
          return redirect("/");
        }

        return data;
      },
    },
    {
      path: "/sign-up",
      element: (
        <>
          <Header />
          <SignUp />
        </>
      ),
      loader: async () => {
        const data = await Promise.all([userLogged()]);

        if (data[0]) {
          return redirect("/");
        }

        return data;
      },
    },
    {
      path: "/log-in",
      element: (
        <>
          <Header />
          <LogIn />
        </>
      ),
      loader: async () => {
        const data = await Promise.all([userLogged()]);

        if (data[0]) {
          return redirect("/");
        }

        return data;
      },
    },
    {
      path: "/new-post",
      element: (
        <>
          <Header />
          <CreatePost />
        </>
      ),
      loader: async () => {
        const data = await Promise.all([userLogged()]);

        if (data[0].author === false) {
          return redirect("/");
        }

        return data;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}
