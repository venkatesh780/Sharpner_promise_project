const posts = [
  {
    title: "Post One",
    bodyBlock: "This is post one",
  },
  {
    title: "Post Two",
    bodyBlock: "This is post two",
  },
];

function getPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let output = "";
      posts.forEach((post, index) => {
        output += `<li>${post.title} ${post.bodyBlock} ${post.activityTime}</li>`;
      });
      document.body.innerHTML = output;
      resolve();
    }, 1000);
  });
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      let error = false;
      if (!error) {
        resolve(post);
      } else {
        reject("ERROR: Something went wrong");
      }
    }, 2000);
  });
}

function updateLastUserActivityTime(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      post.activityTime = new Date().toLocaleTimeString();
      resolve();
    }, 1000);
  });
}

function deletePost(posts) {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      let lastPost = posts.pop();
      resolve(lastPost);
    } else {
      reject("posts array is empty ");
    }
  });
}
let newPost = { title: "Post Three", bodyBlock: "This is post Three" };

createPost(newPost)
  .then((post) => {
    return updateLastUserActivityTime(post);
  })
  .then(() => {
    return getPosts(posts);
  })
  .then(() => {
    return deletePost(posts);
  })
  .then(() => {
    return getPosts(posts);
  });
