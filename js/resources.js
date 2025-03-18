// Resources page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Setup filter functionality
  setupFilters();
  
  // Initialize bookmarks
  initializeBookmarks();
});

// Setup resource filters
function setupFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const typeFilter = document.getElementById('type-filter');
  const levelFilter = document.getElementById('level-filter');
  
  if (!categoryFilter || !typeFilter || !levelFilter) return;
  
  // Add event listeners
  categoryFilter.addEventListener('change', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
  levelFilter.addEventListener('change', applyFilters);
}

// Apply filters to resources
function applyFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const typeFilter = document.getElementById('type-filter');
  const levelFilter = document.getElementById('level-filter');
  
  const categoryValue = categoryFilter.value;
  const typeValue = typeFilter.value;
  const levelValue = levelFilter.value;
  
  const resources = document.querySelectorAll('.resource-card');
  
  resources.forEach(resource => {
    let shouldShow = true;
    
    // Category filter
    if (categoryValue !== 'all') {
      const resourceCategory = resource.querySelector('.category').textContent.toLowerCase();
      if (resourceCategory !== categoryValue) {
        shouldShow = false;
      }
    }
    
    // Type filter
    if (typeValue !== 'all') {
      const resourceType = resource.querySelector('.type').textContent.toLowerCase();
      if (resourceType !== typeValue) {
        shouldShow = false;
      }
    }
    
    // Level filter
    if (levelValue !== 'all') {
      const resourceLevel = resource.querySelector('.level').textContent.toLowerCase();
      if (resourceLevel !== levelValue) {
        shouldShow = false;
      }
    }
    
    // Show/hide resource
    if (shouldShow) {
      resource.style.display = '';
    } else {
      resource.style.display = 'none';
    }
  });
}

// Initialize bookmarks
function initializeBookmarks() {
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  
  bookmarkButtons.forEach(button => {
    const resourceId = button.dataset.id;
    
    // Check if resource is bookmarked
    if (isResourceBookmarked(resourceId)) {
      button.classList.add('active');
      button.textContent = 'Bookmarked';
    }
    
    // Add event listener
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (!isAuthenticated()) {
        showLoginModal();
        return;
      }
      
      toggleBookmark(button, resourceId);
    });
  });
}

// Toggle bookmark status
function toggleBookmark(button, resourceId) {
  if (!isResourceBookmarked(resourceId)) {
    // Add bookmark
    addBookmark(resourceId);
    button.classList.add('active');
    button.textContent = 'Bookmarked';
    showNotification('Resource bookmarked', 'success');
  } else {
    // Remove bookmark
    removeBookmark(resourceId);
    button.classList.remove('active');
    button.textContent = 'Bookmark';
    showNotification('Bookmark removed', 'info');
  }
}

// Check if resource is bookmarked
function isResourceBookmarked(resourceId) {
  // Get current user
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('techHubUsers') || '[]');
  
  // Find user
  const user = users.find(u => u.id === currentUser.id);
  if (!user) return false;
  
  // Check if resource is in bookmarks
  return user.bookmarks && user.bookmarks.includes(resourceId);
}

// Add bookmark
function addBookmark(resourceId) {
  // Get current user
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('techHubUsers') || '[]');
  
  // Find user
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex === -1) return;
  
  // Add bookmark
  if (!users[userIndex].bookmarks) {
    users[userIndex].bookmarks = [];
  }
  
  if (!users[userIndex].bookmarks.includes(resourceId)) {
    users[userIndex].bookmarks.push(resourceId);
  }
  
  // Save to localStorage
  localStorage.setItem('techHubUsers', JSON.stringify(users));
}

// Remove bookmark
function removeBookmark(resourceId) {
  // Get current user
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('techHubUsers') || '[]');
  
  // Find user
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex === -1) return;
  
  // Remove bookmark
  if (users[userIndex].bookmarks) {
    users[userIndex].bookmarks = users[userIndex].bookmarks.filter(id => id !== resourceId);
  }
  
  // Save to localStorage
  localStorage.setItem('techHubUsers', JSON.stringify(users));
}
