// Main JavaScript for Tech Hub website
document.addEventListener('DOMContentLoaded', () => {
  // Load blog posts on homepage
  loadRecentPosts();
});

// Load recent blog posts for homepage
function loadRecentPosts() {
  const postGrid = document.querySelector('.post-grid');
  if (!postGrid) return;
  
  // Sample blog post data (would come from API/database in real app)
  const posts = [
    {
      id: 1,
      title: "Getting Started with GitHub Pages",
      excerpt: "Learn how to deploy your website using GitHub Pages in just a few steps.",
      date: "March 10, 2025",
      author: "Jane Developer",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Authentication Best Practices for Static Sites",
      excerpt: "Implement secure client-side authentication for static websites.",
      date: "March 5, 2025",
      author: "Alex Security",
      category: "Security"
    },
    {
      id: 3,
      title: "Optimizing Your Website Performance",
      excerpt: "Tips and tricks to make your website load faster and perform better.",
      date: "February 28, 2025",
      author: "Sam Optimizer",
      category: "Performance"
    }
  ];
  
  // Clear loading skeletons
  postGrid.innerHTML = '';
  
  // Create and append post cards
  posts.forEach(post => {
    const postCard = createPostCard(post);
    postGrid.appendChild(postCard);
  });
}

// Create a blog post card element
function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';
  
  const postImage = document.createElement('div');
  postImage.className = 'post-image';
  
  const postContent = document.createElement('div');
  postContent.className = 'post-content';
  
  const title = document.createElement('h3');
  title.textContent = post.title;
  
  const excerpt = document.createElement('p');
  excerpt.textContent = post.excerpt;
  
  const meta = document.createElement('div');
  meta.className = 'post-meta';
  
  const date = document.createElement('span');
  date.textContent = post.date;
  
  const author = document.createElement('span');
  author.textContent = `By ${post.author}`;
  
  meta.appendChild(date);
  meta.appendChild(author);
  
  postContent.appendChild(title);
  postContent.appendChild(excerpt);
  postContent.appendChild(meta);
  
  card.appendChild(postImage);
  card.appendChild(postContent);
  
  // Add event listener
  card.addEventListener('click', () => {
    window.location.href = `blog-post.html?id=${post.id}`;
  });
  
  return card;
}
