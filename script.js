document.addEventListener("DOMContentLoaded", function() {
  // Get modal elements
  const accountModal = document.getElementById("accountModal");
  const sellModal = document.getElementById("sellForm");
  const signInBtn = document.getElementById("signInBtn");
  const signUpBtn = document.getElementById("signUpBtn"); 
  const sellBtn = document.getElementById("sellBtn");
  const closeButtons = document.querySelectorAll(".close");
  
  // Account form elements
  const modalTitle = document.getElementById("modalTitle");
  const accountForm = document.getElementById("accountForm");
  const accountSubmit = document.getElementById("accountSubmit");
  const toggleFormText = document.getElementById("toggleForm");
  const confirmPasswordField = document.getElementById("confirmPasswordField");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  let isSignUp = false; // Track mode (Sign In or Sign Up)

  // Open Sign In modal
  signInBtn.addEventListener("click", function() {
    isSignUp = false;
    updateModal();
    accountModal.style.display = "block";
  });

  // Open Sign Up modal directly
  signUpBtn.addEventListener("click", function() {
    isSignUp = true;
    updateModal();
    accountModal.style.display = "block";
  });

  // Open Sell modal
  sellBtn.addEventListener("click", function() {
    sellModal.style.display = "block";
  });

  // Close modals when clicking the close button
  closeButtons.forEach(button => {
    button.addEventListener("click", function() {
      accountModal.style.display = "none";
      sellModal.style.display = "none";
    });
  });

  // Toggle between Sign In and Sign Up
  toggleFormText.addEventListener("click", function(event) {
    event.preventDefault();
    isSignUp = !isSignUp;
    updateModal();
  });

  function updateModal() {
    if (isSignUp) {
      modalTitle.innerText = "Sign Up";
      accountSubmit.innerText = "Sign Up";
      confirmPasswordField.style.display = "block";
      toggleFormText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Sign In</a>`;
    } else {
      modalTitle.innerText = "Sign In";
      accountSubmit.innerText = "Sign In";
      confirmPasswordField.style.display = "none";
      toggleFormText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign Up</a>`;
    }

    // Reattach event listener to new toggle link
    document.getElementById("toggleLink").addEventListener("click", function(event) {
      event.preventDefault();
      isSignUp = !isSignUp;
      updateModal();
    });
  }

  // Handle form submission (Sign In / Sign Up)
  accountForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (isSignUp) {
      // Sign Up Logic
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (localStorage.getItem(email)) {
        alert("Account already exists! Try signing in.");
        return;
      }

      // Save user data
      localStorage.setItem(email, JSON.stringify({ email, password }));
      alert("Account created successfully! You can now sign in.");
      accountModal.style.display = "none";

    } else {
      // Sign In Logic
      const storedUser = JSON.parse(localStorage.getItem(email));

      if (!storedUser || storedUser.password !== password) {
        alert("Invalid email or password. Try again.");
        return;
      }

      alert("Signed in successfully!");
      accountModal.style.display = "none";
    }

    // Clear form
    accountForm.reset();
  });
});
