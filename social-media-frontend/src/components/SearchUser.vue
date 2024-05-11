<template>
    <div class=" pt-10z search search-user d-flex justify-content-center">
      <div class="col-md-6 mt-20"> <!-- Adjust the column size as needed -->
        <input type="text"  v-model="userSearchQuery" @input="searchUsers" placeholder="Search users...">
      </div>
      <div v-if="showUserSearchResults" class="list-group search-result">
        <h3 class="list-group-item active">User Search Results</h3>
        <ul>
          <li class="list-group-item" v-for="user in userSearchResults" :key="user._id">
            <div class="d-flex justify-content-between align-items-center">
              <div>{{ user.username }}</div>
              <button class="btn btn-primary" @click="followUser(user._id, $event.target)">Follow</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { jwtDecode } from "jwt-decode";
  
  export default {
    data() {
      return {
        userSearchQuery: "",
        showUserSearchResults: false,
        userSearchResults: []
      };
    },
    methods: {
      followUser(followingId, button) {
        fetch(`https://social-media-backend-gmki.onrender.com/follow/${this.userId}/${followingId}`, {
          method: "POST"
        })
          .then(response => {
            if (response.ok) {
              button.classList.remove("btn-primary");
              button.classList.add("btn-success");
              this.$emit("follow-success");
              return response.json();
            } else {
              throw new Error("Failed to follow user.");
            }
          })
          .then(data => {
            console.log(data.message);
          })
          .catch(error => {
            console.error("Error following user:", error);
          });
      },
      searchUsers() {
        if (this.userSearchQuery.trim() !== "") {
          fetch(`https://social-media-backend-gmki.onrender.com/register/search?query=${this.userSearchQuery}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Failed to fetch user search results");
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
      extractUserIdFromToken(token) {
        if (token) {
          const decodedToken = jwtDecode(token);
          return decodedToken.sub;
        }
        return null;
      }
    },
    computed: {
      userId() {
        const token = localStorage.getItem("token");
        return this.extractUserIdFromToken(token);
      }
    }
  };
  </script>
  
  <style src = 'public\css\home.css'>
  

  </style>
  