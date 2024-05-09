<template class="main-container">
  <div class="home-page">
    <header class="header text-bg-warning p-3">
      <nav class="nav ">
        <router-link to="/">Home</router-link>
        <!-- Add a button to toggle new post form -->
        <button @click="toggleNewPostForm">Create</button>
        <!-- Replace router-link with a button to trigger search -->
        <button @click="toggleSearch">Search</button>
      </nav>
    </header>

    <!-- Search input field -->
    <div v-if="showSearch" class="search">
      <input type="text" v-model="searchQuery" placeholder="Search posts...">
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
              <div class="card-footer bg-transparent border-success">Posted by {{ post.username }}</div>
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
export default {
  data() {
    return {
      posts: [], // Array to store all posts
      searchQuery: '', // Search query
      showSearch: false, // Boolean to toggle search visibility
      showNewPostForm: false, // Boolean to toggle new post form visibility
      newPost: { title: '', description: '' } // Object to store new post data
    };
  },
  // Fetch posts from backend when component is mounted
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      // Call backend API to fetch posts
      // Assign fetched posts to this.posts
      this.posts = [
        { id: 1, username: "Mark Usher", title: "Flames and Fire", description: "It seems like the code snippet got mistakenly included in the comments section of your Vue component. Let's remove it and keep only the relevant code. Here's how your fetchPosts method should look like:" },
        { id: 2, username: "Douglas Stamper", title: "Blood in veins", description: "To make your cards look more modern and visually appealing, you can use Bootstrap classes and add some custom styling. Here's an updated version of your code with improved card design:" },
        { id: 3, username: "Michale Huuse", title: "Rain down", description: "I've added the shadow class to the cards to give them a subtle shadow effect .Removed the card-header since it seemed unnecessary for your design.Adjusted the card structure to simplify it.Updated the text colors for better readability." },
        // Add more posts as needed
      ]; // Sample data for demonstration
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      this.searchQuery = ''; // Clear search query when toggling search
    },
    toggleNewPostForm() {
      this.showNewPostForm = !this.showNewPostForm;
      // Clear new post form fields when toggling form visibility
      if (!this.showNewPostForm) {
        this.newPost = { title: '', description: '' };
      }
    },
    submitNewPost() {
      // Simulate posting data to backend
      // In a real application, this would be replaced with actual API call
      const newPost = { 
        id: this.posts.length + 1, 
        username: "Current User", // Assuming the user is already logged in
        title: this.newPost.title, 
        description: this.newPost.description 
      };
      this.posts.unshift(newPost); // Add new post to beginning of posts array
      this.toggleNewPostForm(); // Hide new post form after submission
    }
  },
  computed: {
    postsToShow() {
      // Filter posts based on search query
      return this.posts.filter(post => {
        return post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               post.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }
}
</script>

<style scoped>
.home-page {
  width: 100%; /* Ensure the component takes up the full width */
  height: 100vh; /* Ensure the component takes up the full height */
  background-color: #ffffff;
  background-image: url("https://www.transparenttextures.com/patterns/always-grey.png");
}
.header {
  background-color: #007bff;
  padding: 10px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
}

.main {
  padding: 20px;
}

.posts {
  display: flex;
  flex-wrap: wrap; /* Allow posts to wrap to the next line */
  gap: 20px;
  justify-content: space-between; /* Distribute posts evenly */
}

.post {
  width: calc(33.33% - 20px); /* Adjust width to fit three posts in one line */
}

.card {
  width: 100%; /* Ensure cards take up full width */
}

.no-posts {
  text-align: center;
  color: #999;
}

.main-container {
  height: 100%; /* Ensure the main container takes up the full height of the viewport */
  width: 100%; /* Ensure the main container takes up the full width of the viewport */
}

.search {
  padding: 20px 0;
}

.search input[type="text"] {
  margin-left: 240px;
  width: 40%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
}
.new-post-form {
  margin-top: 20px;
  height : 300px;
  width: 50%;  
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
