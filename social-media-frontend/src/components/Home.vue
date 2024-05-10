<template class="main-container">
  <div class="home-page">
    <header class="header text-bg-warning p-3">
      <nav class="nav ">
        <router-link to="/">Home</router-link>
        <!-- Add a button to toggle new post form -->
        <button @click="toggleNewPostForm">Create</button>
        <!-- Replace router-link with a button to trigger search -->
        <button @click="toggleSearchUser">Search</button>
      </nav>
    </header>

    <!-- Search input field -->
 <div v-if="showSearchUser" class="search">
      <input type="text" v-model="userSearchQuery" placeholder="Search users..." @input="searchUsers">
    </div>

 <!-- Display user search results -->
 <div class="list-group search-result"  v-if="showUserSearchResults">
      <h3 class="list-group-item active">User Search Results</h3>
      <ul>
        <li class="list-group-item" v-for="user in userSearchResults" :key="user._id">
          <div>{{ user.username }}</div>
          <button class="btn btn-primary" @click="followUser(user._id)">Follow</button>
        </li>
      </ul>
    </div>

    <!-- New post form -->
    <div class="new-post-form container bg-white " v-if="showNewPostForm">
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
        <div v-for="post in postsToShow" :key="post.id" class="post">
          <div class="card mb-3 shadow">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.description }}</p>
              <div class="card-footer bg-transparent border-success">Posted by {{ post.userId.username }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-posts">
        <p>No posts available</p>
      </div>
    </main>
  </div>
</template>

<script>

import { jwtDecode } from "jwt-decode"; // Correct import statement

export default {
  data() {
    return {
      posts: [], // Array to store all posts
      searchQuery: "", // Search query
      showSearch: false, // Boolean to toggle search visibility
      showNewPostForm: false, // Boolean to toggle new post form visibility
      newPost: { title: "", description: "" },// Object to store new post data
      userId : null ,
      userSearchQuery: "", // Search query for users
      showSearchUser: false, // Boolean to toggle user search visibility
      showUserSearchResults: false, // Boolean to toggle user search results visibility
      userSearchResults: [] // Array to store user search results
    };
  },

  mounted() {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    this.userId = this.extractUserIdFromToken(token);

    if (this.userId) {

    } else {
      this.$router.push('/login');
    }
    this.fetchPosts();
  },
  methods: {
    
    followUser(followingId) {
      fetch(`http://localhost:3000/follow/${this.userId}/${followingId}`, {
  method: 'POST',
})

      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to follow user.');
        }
      })
      .then(data => {
        console.log(data.message); // Log success message 
        // Handle any additional logic after following a user if needed
      })
      .catch(error => {
        console.error('Error following user:', error);
      });
    },
    // Function to unfollow a user
    unfollowUser(followingId) {
      fetch(`http://localhost:3000/follow/${this.userId}/${followingId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to unfollow user.');
        }
      })
      .then(data => {
        console.log(data.message); // Log success message
        // Handle any additional logic after unfollowing a user if needed
      })
      .catch(error => {
        console.error('Error unfollowing user:', error);
      });
    },

    extractUserIdFromToken(token) {
      if (token) {
        const decodedToken = jwtDecode(token); // Correct usage of jwt_decode
        return decodedToken.sub; // Assuming userId is stored in the token
      }
      return null;
    },
    searchUsers() {
      // Check if the search query is not empty
      if (this.userSearchQuery.trim() !== "") {
        // Perform the user search by making an API request to your backend
        fetch(`http://localhost:3000/register/search?query=${this.userSearchQuery}`, {

          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch user search results');
            }
          })
          .then(data => {
            this.userSearchResults = data;
            this.showUserSearchResults = true;
          })
          .catch(error => {
            console.error("Error searching for users:", error);
          });
      } else {
        this.showUserSearchResults = false;
      }
    },
    fetchPosts() {
    fetch(`http://localhost:3000/posts/followed/${this.userId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch followed posts.');
            }
        })
        .then(posts => {
            this.posts = posts; // Update the posts data with the fetched posts
        })
        .catch(error => {
            console.error('Error fetching followed posts:', error);
        });
},
    toggleSearchUser() {
  this.showSearchUser = !this.showSearchUser;
  this.userSearchQuery = ""; // Clear user search query when toggling search
  this.showUserSearchResults = false; // Hide user search results when toggling search
}
,
    toggleNewPostForm() {
      this.showNewPostForm = !this.showNewPostForm;
      // Clear new post form fields when toggling form visibility
      if (!this.showNewPostForm) {
        this.newPost = { title: "", description: "" };
      }
    },
    submitNewPost() {

      fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: this.userId,
          title: this.newPost.title,
          description: this.newPost.description,
        })
      })
      .then(response => {
        if (response.ok) {
          // Parse the JSON response to get the access token
        this.newPost = { title: '', description: '' };

          return response.json();
        } else {
          throw new Error('Post Creation failed');
        }
      })
      .then(data => {
        // Store the access token securely in localStorage
        console.log('Suceesfuly created post!')
        // Redirect the user to the home page
        this.$router.push('/home');
        
      })
      .catch(error => {
        console.error('Error making post:', error);
        // Handle login failure (e.g., show error message to user)
      });
    },
    
  },
  computed: {
    postsToShow() {
      // Filter posts based on search query
      return this.posts.filter(post => {
        return (
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }
};
</script>
<style  src = 'public\css\home.css'>
 @import 'src/assets/home.css';
</style>
