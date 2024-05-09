<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-warning bg-warning">
      <div class="container">
        <a class="navbar-brand p-1 m-0"  href="#">Social Media App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2 text-center">
            <h1 class="hero-title">Welcome to Our Social Media App</h1>
            <p class="hero-subtitle">Join millions of users worldwide.</p>
            <div class="cta-buttons">
              <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
              <router-link to="/login" class="btn btn-secondary">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
}
</script>

<style scoped>
/* Navbar */
.navbar-brand {
  font-size: 2rem;
}

/* Hero Section */
.hero {
  background-color: #f8f9fa; /* Light background color */
  padding: 100px 0; /* Increased padding for better spacing */
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: #343a40; /* Dark text color */
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #6c757d; /* Medium text color */
}

.cta-buttons .btn {
  margin-right: 20px;
  font-size: 1.2rem;
  padding: 12px 30px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}
</style>
