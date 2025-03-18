# Tech Hub Website

A fully-featured static website with client-side authentication for GitHub Pages deployment. Built with pure HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all device sizes
- Client-side authentication system using localStorage
- Protected content accessible only to authenticated users
- Resource filtering and bookmarking system
- Blog section with dynamic content loading
- Fully deployable to GitHub Pages

## Project Structure

```
tech-hub/
├── index.html                # Homepage
├── resources.html            # Resources page
├── blog.html                 # Blog listing page
├── contact.html              # Contact page
├── css/
│   └── styles.css            # Main stylesheet
├── js/
│   ├── auth.js               # Authentication logic
│   ├── main.js               # Main JavaScript for the site
│   └── resources.js          # Resources page specific logic
├── img/                      # Image assets (not included)
└── README.md                 # This file
```

## Authentication System

The website uses a client-side authentication system that works entirely in the browser using localStorage:

- User accounts are stored in `localStorage` under the key `techHubUsers`
- Current user session is stored in `localStorage` under the key `techHubUser`
- Password security is minimal as this is for demonstration purposes
- Protected resources are marked with the `authenticated-content` class

## Deployment Instructions

### Setting Up GitHub Pages

1. Create a new GitHub repository
2. Clone this repository to your local machine
3. Push the code to your GitHub repository
4. Go to your repository settings on GitHub
5. In the "Pages" section, select the branch you want to deploy (usually `main` or `master`)
6. Click "Save" and your site will be published

### Local Development

To develop locally:

1. Clone the repository
2. Open the project in your code editor
3. Use a local development server like Live Server in VS Code or Python's `http.server` module
4. Make your changes and test locally before pushing to GitHub

## Customization

### Changing the Theme

You can modify the color scheme by editing the CSS variables at the top of the `styles.css` file:

```css
:root {
  --primary-color: #3498db;
  --primary-dark: #2980b9;
  --secondary-color: #2ecc71;
  --secondary-dark: #27ae60;
  /* other variables */
}
```

### Adding Content

To add new resources or blog posts, modify the JavaScript arrays in the respective files:

- For blog posts: Edit the `posts` array in `main.js`
- For resources: Edit the resources in `resources.js`

### Enhancing Authentication

For a production environment, you should:

1. Implement server-side authentication
2. Use HTTPS to secure data transmission
3. Hash passwords server-side
4. Implement proper session management

## License

This project is open source and available under the MIT License.
