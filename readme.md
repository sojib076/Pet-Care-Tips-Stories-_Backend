Pet Care Tips & Story Sharing Website - Backend
This is the backend for the Pet Care Tips & Story Sharing website. It provides APIs for managing user roles, creating posts, premium content access, user interactions (like upvoting, downvoting, commenting), and admin functionalities. The backend is built with Express.js and manages the two core user roles: Admin and User.


Features
User Roles
Admin: Full access to manage the platform, including user management and post moderation.
User: Can create posts, interact with other users, and access premium content.
Post Creation
Users can create and share their posts about pet care tips and stories.
Posts can be upvoted, downvoted, and commented on by other users.
Premium Content
Users can make payments to unlock access to premium posts.
Premium posts are marked distinctly and provide exclusive content to paid users.
Engagement
Users can upvote and downvote posts.
Comments can be added to posts to encourage discussions.
Users can follow other pet owners to see their posts in a personalized feed.
PDF Generation
Users can generate PDFs based on their pet's name, age, and calorie requirements, which is useful for tracking pet nutrition needs.
Admin Capabilities
Admins can:
View all users and their posts.
Manage user accounts: block/unblock users.
Unpublish posts that violate guidelines or are inappropriate.
Track payments related to premium content access.
Payment Tracking
Admins have access to view and manage payment transactions for premium content.
Password Management
Both users and admins can:
Reset forgotten passwords via email.
Update their current passwords for account security.
API Endpoints
Post Routes
GET posts/getfollwingposts - Get posts from users that the current user follows.
GET posts/search - Search for posts based on query.
GET posts/category - Retrieve posts filtered by category.
GET posts/get - Get all posts.
GET posts/:postId - Get a specific post by ID.
POST posts/createpost - Create a new post.
POST posts/upvotepost - Upvote a post.
POST posts/downvotepost - Downvote a post.
POST posts/addcomment - Add a comment to a post.
PUT posts/editcomment - Edit a comment on a post.
PUT posts/editpost - Edit an existing post.
DELETE posts/deletecomment - Delete a comment.
DELETE posts/deletepost - Delete a post.
User Routes
GET users/me - Get the current user's profile.
PUT /api/users/me - Update the current user's profile.
POST /api/users/followuser - Follow another user.
GET /api/users/getfollowedUsers - Get the list of users the current user is following.
GET /api/users/getuserposts - Get posts created by the current user.
Authentication Routes
POST /api/auth/login - Log in a user.
POST /api/auth/register - Register a new user (with profile image upload).
POST /api/auth/google-login - Log in with Google.
POST /api/auth/forget-password - Initiate password reset process.
POST /api/auth/reset-password - Reset password after receiving reset token.
Payment Routes
POST /api/payments/confirmation - Confirm a payment.
POST /api/payments/initiate - Initiate a payment process for premium content.