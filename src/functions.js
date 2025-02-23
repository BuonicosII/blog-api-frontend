export async function retrievePostAndComments(pathname) {
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

export async function retrievePosts() {
  const postsJson = await fetch("http://localhost:3000/posts");
  const retrievedPosts = await postsJson.json();

  return retrievedPosts;
}

export async function retrieveUserPosts(userid) {
  const postsJson = await fetch("http://localhost:3000/posts");
  const retrievedPosts = await postsJson.json();

  const retrievedUserPosts = retrievedPosts.filter(
    (post) => post.userId === userid
  );

  return retrievedUserPosts;
}

export async function retrieveUserComments(userid) {
  const commentsJson = await fetch("http://localhost:3000/comments");
  const retrievedComments = await commentsJson.json();

  const retrievedUserComments = retrievedComments.filter(
    (comment) => comment.user.id === userid
  );

  return retrievedUserComments;
}

export async function userLogged() {
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
