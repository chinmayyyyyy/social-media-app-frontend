<template>
  <div class="login-container">
    <div class="card">
      <h2 style="text-align: center;">Login</h2>
      <form @submit.prevent="login" class="form">
        <div class="form-group">
          <label for="email">Username:</label>
          <input  type="text" id="name" v-model="name"  required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    login() {
      fetch('https://social-media-backend-gmki.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.name,
          password: this.password
        })
      })
      .then(response => {
        if (response.ok) {
          // Parse the JSON response to get the access token
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        // Store the access token securely in localStorage
        localStorage.setItem('token', data.access_token);
        console.log('Login successful!');
        // Redirect the user to the home page
        this.$router.push('/home');
      })
      .catch(error => {
        console.error('Error logging in:', error);
        // Handle login failure (e.g., show error message to user)
      });
    }
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
