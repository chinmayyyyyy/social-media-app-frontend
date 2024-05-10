<template>
  <div class="signup-container">
    <div class="card">
      <h2 style="text-align: center;">Sign Up</h2>
      <form @submit.prevent="signup" class="form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signup() {
      // Send signup data to backend
      fetch('http://localhost:3000/register', {
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
          console.log('Signup successful!');
          this.$router.push('/login');
        } else {
          console.error('Signup failed:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
    }
  }
}
</script>

<style scoped>

  .signup-container{
    background-color: #f5f5f5;
background-image: url("https://www.transparenttextures.com/patterns/always-grey.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  }
  .signup-container {
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
  