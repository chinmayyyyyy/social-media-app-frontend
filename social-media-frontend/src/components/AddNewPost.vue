<template>
    <div class="add-new-post">
      <div class=" new-post-form  container bg-white">
        <form @submit.prevent="submitNewPost">
          <div class="form-group">
            <label for="postTitle">Post Title:</label>
            <input type="text" id="postTitle" v-model="newPost.title" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="postDescription">Post Description:</label>
            <textarea id="postDescription" v-model="newPost.description" class="form-control" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { jwtDecode } from "jwt-decode";
  
  export default {
    data() {
      return {
        newPost: { title: "", description: "" },
        userId: null,
      };
    },
    mounted() {
      const token = localStorage.getItem("token");
      this.userId = this.extractUserIdFromToken(token);
    },
    methods: {
      submitNewPost() {
        fetch("https://social-media-backend-gmki.onrender.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: this.userId,
            title: this.newPost.title,
            description: this.newPost.description,
          }),
        })
          .then((response) => {
            if (response.ok) {
              this.newPost = { title: "", description: "" };
              this.$emit("post-created");
              return response.json();
            } else {
              throw new Error("Post Creation failed");
            }
          })
          .then((data) => {
            console.log("Successfully created post!");
            // Optionally, redirect user to home page or update posts list
          })
          .catch((error) => {
            console.error("Error making post:", error);
          });
      },
      extractUserIdFromToken(token) {
        if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken.sub;
        }
        return null;
      },
    },
  };
  </script>
  
  <style src = 'public\css\home.css'>
  .add-new-post {
    margin-top: 20px; /* Adjust margin as needed */
  }
  </style>
  