import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Community.css'; // Ensure this is the correct path to your CSS file

export default function Community() {
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]); // Initialize as an empty array

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/auth/allposts');
        const postData = Array.isArray(response.data) ? response.data : []; // Ensure the data is an array
        setPosts(postData);
        setFilteredPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Ensure posts is set to an array if there's an error
        setFilteredPosts([]);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle liking a post
  const handleLike = async (postId) => {
    const currentUserId =  localStorage.getItem('userid'); // Replace with the actual logged-in user's ID
    try {
      await axios.put(`http://localhost:1000/api/auth/like/${postId}`, { userId: currentUserId }); // Backend route to like a post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: [...post.likes, currentUserId] } : post
        )
      );
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  // Handle commenting on a post
  const handleComment = async (postId, commentText) => {
    try {
      const response = await axios.post(`http://localhost:1000/api/auth/comment/${postId}`, { text: commentText }); // Backend route for comments
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post
        )
      );
    } catch (error) {
      console.error('Error commenting on the post:', error);
    }
  };

  return (
    <div className="community-container">
      <div>
        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {filteredPosts.map((post) => (
          <div key={post._id} className="post">
            {/* Display the post author's name */}
            <h3 className='post-username'>Posted by: {post.user?.name || 'Anonymous'}</h3>

            {/* Post title */}
            <h2 className='post-title'>{post.title}</h2>

            {/* Post image */}
            {post.images.length > 0 && (
              <img 
                src={`http://localhost:1000${post.images[0]}`} 
                alt={post.title} 
                className="post-image"
              />
            )}

            {/* Post description */}
            <p className='post-des'>{post.description}</p>

            {/* Like button */}
            <div>
              <button onClick={() => handleLike(post._id)}>
                Like ({post.likes.length > 0 ? post.likes.length : 0})
              </button>
            </div>

            {/* Comments section */}
            <div className="comment-section">
              <h4>Comments</h4>
              {post.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <strong>{comment.user?.name || 'Anonymous'}: </strong>
                  <span>{comment.text}</span>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a comment"
                className="comment-input input-c-box "
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post._id, e.target.value);
                    e.target.value = ''; // Clear the input after commenting
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
