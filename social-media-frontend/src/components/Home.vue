<template>
  <div class="main-container">
    <div class="home-page">
      <header class="header text-bg-warning p-3">
        <nav class="nav">
          <router-link to="/">Home</router-link>
          <button class="btn btn-primary" @click="toggleNewPostForm">Create</button>
          <button class="btn btn-info" @click="toggleSearchUser">Search</button>
        </nav>
      </header>
      <SearchUser v-if="showSearchUser"  @follow-success="onFollowSuccess" />
      <!-- New post form -->
      <div class="new-post-form container bg-white" v-if="showNewPostForm">
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

      <main class="main">
        <div v-if="postsToShow.length > 0" class="posts">
          <div v-for="post in postsToShow.slice().reverse()" :key="post.id" class="post">
            <div class="card mb-3 shadow">
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.description }}</p>
                <div class="row">
                  <div v-if="post.userId._id != this.userId" class=" col card-footer bg-transparent border-success">Posted by {{ post.userId.username }}</div>
                  <div v-else class=" col card-footer bg-transparent border-success">Posted by You</div>
                  <button v-if="post.userId._id != this.userId" style="margin-top: 10px; font-size: 12px; width: 20%;" class="unfollow-btn btn btn-outline-danger btn-sm" @click="unfollowUser(post.userId._id)">Unfollow</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-posts">
          <p>No posts available</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SearchUser from "@/components/SearchUser.vue";
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    SearchUser,
  },
  data() {
    return {
      showSearchUser: false,
      posts: [],
      searchQuery: "",
      showNewPostForm: false,
      newPost: { title: "", description: "" },
      userId: null,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.userId = this.extractUserIdFromToken(token);

    if (this.userId) {
      this.fetchPosts();
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    toggleNewPostForm() {
      this.showNewPostForm = !this.showNewPostForm;
      if (!this.showNewPostForm) {
        this.newPost = { title: "", description: "" };
      }
    },
    toggleSearchUser() {
  this.showSearchUser = !this.showSearchUser;
  this.userSearchQuery = ""; // Clear user search query when toggling search
  this.showUserSearchResults = false; // Hide user search results when toggling search
},
    submitNewPost() {
      fetch("http://localhost:3000/posts", {
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
            this.fetchPosts();
            return response.json();
          } else {
            throw new Error("Post Creation failed");
          }
        })
        .then((data) => {
          console.log("Successfully created post!");
          this.$router.push("/home");
        })
        .catch((error) => {
          console.error("Error making post:", error);
        });
    },
    unfollowUser(followingId) {
      fetch(`http://localhost:3000/follow/${this.userId}/${followingId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            this.fetchPosts();
            return response.json();
          } else {
            throw new Error("Failed to unfollow user.");
          }
        })
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error unfollowing user:", error);
        });
    },
    extractUserIdFromToken(token) {
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
      }
      return null;
    },
    fetchPosts() {
      fetch(`http://localhost:3000/posts/followed/${this.userId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch followed posts.");
          }
        })
        .then((posts) => {
          this.posts = posts;
        })
        .catch((error) => {
          console.error("Error fetching followed posts:", error);
        });
    },
    onFollowSuccess() {
      this.fetchPosts(); // Call fetchPosts when a user is successfully followed
    }
  },
  computed: {
    postsToShow() {
      return this.posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
};
</script>

<style  src = 'public\css\home.css'>
/* Add your styles here */
</style>
