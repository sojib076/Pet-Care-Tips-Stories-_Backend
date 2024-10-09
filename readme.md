
# Pet Care Tips & Story Sharing Website - Backend

This is the backend service for the **Pet Care Tips & Story Sharing** platform, which powers key functionalities such as user management, post creation, premium content access, user interactions, and administrative tools. Built with **Express.js**, it handles two main roles: **Admin** and **User**.

## 🚀 Features

### 👥 User Roles
- **Admin**: Full control over the platform, including user management and post moderation.
- **User**: Can create posts, interact with content, and access premium posts through payments.

### 📝 Post Creation
- Users can share **pet care tips** and **stories**.
- Posts support **upvotes, downvotes**, and **comments** for interaction.

### 💎 Premium Content
- Premium posts offer exclusive content accessible via payment.
- Paid users get marked, premium posts for additional insights.

### 💬 Engagement
- Users can **upvote**, **downvote**, and **comment** on posts.
- Follow other users to build a personalized feed of pet care posts.

### 📄 PDF Generation
- Create **PDFs** based on your pet’s name, age, and calorie needs, perfect for tracking nutrition.

### 🛠️ Admin Capabilities
- **User management**: Block/unblock users, view user activities.
- **Post moderation**: Unpublish posts that violate the guidelines.
- **Payment tracking**: Manage and review premium content transactions.

### 💸 Payment Tracking
- Admins can monitor all **payment transactions** related to premium content.

### 🔐 Password Management
- Both users and admins can:
  - **Reset passwords** via email.
  - **Update passwords** for account security.

## 📡 API Endpoints

### 📝 Post Routes
- `GET /posts/getfollwingposts`: Retrieve posts from followed users.
- `GET /posts/search`: Search posts by keywords.
- `GET /posts/category`: Filter posts by category.
- `GET /posts/get`: Get all posts.
- `GET /posts/:postId`: Get a specific post by ID.
- `POST /posts/createpost`: Create a new post.
- `POST /posts/upvotepost`: Upvote a post.
- `POST /posts/downvotepost`: Downvote a post.
- `POST /posts/addcomment`: Add a comment to a post.
- `PUT /posts/editcomment`: Edit a comment on a post.
- `PUT /posts/editpost`: Edit an existing post.
- `DELETE /posts/deletecomment`: Delete a comment.
- `DELETE /posts/deletepost`: Delete a post.

### 👤 User Routes
- `GET /users/me`: Retrieve the current user's profile.
- `PUT /users/me`: Update the current user's profile.
- `POST /users/followuser`: Follow another user.
- `GET /users/getfollowedUsers`: Get the list of users the current user follows.
- `GET /users/getuserposts`: Retrieve posts created by the current user.

### 🔐 Authentication Routes
- `POST /auth/login`: Log in a user.
- `POST /auth/register`: Register a new user (with profile image upload).
- `POST /auth/google-login`: Log in with Google.
- `POST /auth/forget-password`: Start the password reset process.
- `POST /auth/reset-password`: Reset a password with a token.

### 💳 Payment Routes
- `POST /payments/confirmation`: Confirm a payment.
- `POST /payments/initiate`: Initiate the payment process for premium content.

