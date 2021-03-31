* @route   POST /api/posts
* @desc    Create a post
* @access  Private
*  
* @route   GET /api/posts
* @desc    Get all posts
* @access  Private
*  
* @route   GET /api/posts/:id
* @desc    Get post by id
* @access  Private
*  
* @route   DELETE /api/posts/:id
* @desc    Delete post by id
* @access  Private
*  
* @route   PUT /api/posts/like/:id
* @desc    Like a post
* @access  Private
*  
* @route   PUT /api/posts/unlike/:id
* @desc    Unlike a post
* @access  Private
*  
* @route   POST /api/posts/comment/:id
* @desc    Comment on a post
* @access  Private
*  
* @route   DELETE /api/posts/comment/:id/:comment_id
* @desc    Delete comment
* @access  Private
*  
* @route   GET /api/profile/me
* @desc    Get current users profile
* @access  Private
*  
* @route   POST /api/profile
* @desc    Create or update user profile
* @access  Private
*  
* @route   GET /api/profile
* @desc    Get all profiles
* @access  Public
*  
* @route   GET /api/profile/user/:user_id
* @desc    Get profile by user ID
* @access  Public
*   
* @route   DELETE /api/profile
* @desc    Delete profile, user & posts
* @access  Private
*  
* @route   PUT /api/profile/experience
* @desc    Add profile experience
* @access  Private
*  
* @route   DELETE /api/profile/experience/:exp_id
* @desc    Delete experience from profile
* @access  Private
*  
* @route   PUT /api/profile/education
* @desc    Add profile education
* @access  Private
*  
* @route   DELETE /api/profile/education/:edu_id
* @desc    Delete education from profile
* @access  Private
*  
* @route   GET /api/profile/github/:username
* @desc    Get user repos from GitHub
* @access  Public
*  
* @route   POST /api/users
* @desc    Register user
* @access  Public
*  
* @route   GET /api/auth
* @desc    Test route
* @access  Public
*  
* @route   POST /api/auth
* @desc    Authenticate user & get token
* @access  Public
*  