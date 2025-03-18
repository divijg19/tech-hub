// Authentication handling for Tech Hub website
// Handles user registration, login, logout, and session management

// Initialize auth state from localStorage
let currentUser = null;
const localUser = localStorage.getItem('techHubUser');
if (localUser) {
  try {
    currentUser = JSON.parse(localUser);
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('techHubUser');
  }
}

// DOM elements
document.addEventListener('DOMContentLoaded', () => {
  // Auth buttons
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userGreeting = document.getElementById('user-greeting');
  const usernameDisplay = document.getElementById('username-display');
  
  // Modal elements
  const authModal = document.getElementById('auth-modal');
  const closeModal = document.querySelector('.close-modal');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const showLoginLink = document.getElementById('show-login');
  const showSignupLink = document.getElementById('show-signup');
  
  // Form elements
  const loginFormElement = document.getElementById('login-form-element');
  const signupFormElement = document.getElementById('signup-form-element');
  
  // Additional login prompts that may exist on some pages
  const loginPrompt = document.getElementById('login-prompt');
  const signupPrompt = document.getElementById('signup-prompt');
  
  // Update UI based on auth state
  updateAuthUI();
  
  // Event listeners for auth buttons
  if (loginBtn) loginBtn.addEventListener('click', showLoginModal);
  if (signupBtn) signupBtn.addEventListener('click', showSignupModal);
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  
  // Event listeners for modal
  if (closeModal) closeModal.addEventListener('click', hideModal);
  if (showLoginLink) showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
  });
  if (showSignupLink) showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSignupForm();
  });
  
  // Additional login prompts
  if (loginPrompt) loginPrompt.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginModal();
  });
  if (signupPrompt) signupPrompt.addEventListener('click', (e) => {
    e.preventDefault();
    showSignupModal();
  });
  
  // Event listeners for form submission
  if (loginFormElement) {
    loginFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin();
    });
  }
  
  if (signupFormElement) {
    signupFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSignup();
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (authModal && e.target === authModal) {
      hideModal();
    }
  });
});

// Show login modal
function showLoginModal() {
  const authModal = document.getElementById('auth-modal');
  showLoginForm();
  authModal.classList.remove('hidden');
}

// Show signup modal
function showSignupModal() {
  const authModal = document.getElementById('auth-modal');
  showSignupForm();
  authModal.classList.remove('hidden');
}

// Hide modal
function hideModal() {
  const authModal = document.getElementById('auth-modal');
  authModal.classList.add('hidden');
}

// Show login form
function showLoginForm() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
}

// Show signup form
function showSignupForm() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
}

// Handle login
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('techHubUsers') || '[]');
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Create session (omit password from session data)
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    
    localStorage.setItem('techHubUser', JSON.stringify(sessionUser));
    currentUser = sessionUser;
    
    // Update UI
    updateAuthUI();
    hideModal();
    
    // Show success message
    showNotification('Logged in successfully!', 'success');
    
    // Unlock authenticated content
    unlockAuthenticatedContent();
    
    // Hide authentication notice if exists
    const authNotice = document.getElementById('authentication-notice');
    if (authNotice) {
      authNotice.classList.add('hidden');
    }
  } else {
    showNotification('Invalid email or password', 'error');
  }
}

// Handle signup
function handleSignup() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  
  // Validate passwords match
  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('techHubUsers') || '[]');
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    showNotification('Email already in use', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    bookmarks: []
  };
  
  // Add to users array
  users.push(newUser);
  localStorage.setItem('techHubUsers', JSON.stringify(users));
  
  // Create session (omit password from session data)
  const sessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  };
  
  localStorage.setItem('techHubUser', JSON.stringify(sessionUser));
  currentUser = sessionUser;
  
  // Update UI
  updateAuthUI();
  hideModal();
  
  // Show success message
  showNotification('Account created successfully!', 'success');
  
  // Unlock authenticated content
  unlockAuthenticatedContent();
  
  // Hide authentication notice if exists
  const authNotice = document.getElementById('authentication-notice');
  if (authNotice) {
    authNotice.classList.add('hidden');
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('techHubUser');
  currentUser = null;
  
  // Update UI
  updateAuthUI();
  
  // Show success message
  showNotification('Logged out successfully!', 'success');
  
  // Lock authenticated content
  lockAuthenticatedContent();
  
  // Show authentication notice if exists
  const authNotice = document.getElementById('authentication-notice');
  if (authNotice) {
    authNotice.classList.remove('hidden');
  }
}

// Update auth UI based on current state
function updateAuthUI() {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userGreeting = document.getElementById('user-greeting');
  const usernameDisplay = document.getElementById('username-display');
  
  if (currentUser) {
    // User is logged in
    if (loginBtn) loginBtn.classList.add('hidden');
    if (signupBtn) signupBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    if (userGreeting) userGreeting.classList.remove('hidden');
    if (usernameDisplay) usernameDisplay.textContent = currentUser.name;
    
    // Unlock authenticated content
    unlockAuthenticatedContent();
    
    // Hide authentication notice if exists
    const authNotice = document.getElementById('authentication-notice');
    if (authNotice) {
      authNotice.classList.add('hidden');
    }
  } else {
    // User is logged out
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (signupBtn) signupBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (userGreeting) userGreeting.classList.add('hidden');
    
    // Lock authenticated content
    lockAuthenticatedContent();
    
    // Show authentication notice if exists
    const authNotice = document.getElementById('authentication-notice');
    if (authNotice) {
      authNotice.classList.remove('hidden');
    }
  }
}

// Unlock authenticated content
function unlockAuthenticatedContent() {
  const authenticatedElements = document.querySelectorAll('.authenticated-content');
  authenticatedElements.forEach(element => {
    element.classList.add('unlocked');
  });
}

// Lock authenticated content
function lockAuthenticatedContent() {
  const authenticatedElements = document.querySelectorAll('.authenticated-content');
  authenticatedElements.forEach(element => {
    element.classList.remove('unlocked');
  });
}

// Show notification
function showNotification(message, type = 'info') {
  // Check if notification container exists, create if not
  let notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.top = '20px';
    notificationContainer.style.right = '20px';
    notificationContainer.style.zIndex = '1000';
    document.body.appendChild(notificationContainer);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
  notification.style.color = type === 'error' ? '#721c24' : '#155724';
  notification.style.padding = '15px 20px';
  notification.style.marginBottom = '10px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}

// Check if user is authenticated (for external use)
function isAuthenticated() {
  return currentUser !== null;
}

// Get current user (for external use)
function getCurrentUser() {
  return currentUser;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isAuthenticated,
    getCurrentUser
  };
}
