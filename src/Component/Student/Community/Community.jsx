
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Community.css'; // Ensure this is the correct path to your CSS file

// export default function Community() {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   // Fetch posts from the backend
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/auth/allposts');
//         const postData = Array.isArray(response.data) ? response.data : [];
//         setPosts(postData);
//         setFilteredPosts(postData);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Filter posts based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = posts.filter((post) =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredPosts(filtered);
//     } else {
//       setFilteredPosts(posts);
//     }
//   }, [searchTerm, posts]);

//   const handleLike = async (postId) => {
//     try {
//       const token = localStorage.getItem('token'); // Retrieve token from localStorage
//       if (!token) {
//         console.error('No token found in localStorage');
//         return;
//       }

//       // Send a PUT request to toggle like/unlike
//       const response = await axios.put(
//         `http://localhost:1000/api/auth/posts/like/${postId}`,
//         {},
//         {
//           headers: {
//             'auth-token': token, // Include the token in the request header
//           },
//         }
//       );

//       // Update the posts state
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId
//             ? { ...post, likes: response.data.likes } // Update likes array
//             : post
//         )
//       );
//     } catch (error) {
//       console.error('Error toggling like/unlike:', error);
//     }
//   };



//   const handleComment = async (postId, commentText) => {
//     if (!commentText.trim()) return; // Prevent empty comments

//     try {
//       const token = localStorage.getItem('token'); // Retrieve token from localStorage
//       if (!token) {
//         console.error('No token found in localStorage');
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:1000/api/auth/post/comment/${postId}`,
//         { text: commentText },
//         {
//           headers: {
//             'auth-token': token, // Include the token in the request header
//           },
//         }
//       );

//       // Update the state to include the new comment
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post
//         )
//       );
//     } catch (error) {
//       console.error('Error commenting on the post:', error);
//     }
//   };




//   return (
//     <div className="community-container">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search posts..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>
//       <div className="posts-container">
//         {filteredPosts.map((post) => (
//           <div key={post._id} className="post">
//             <h3 className="post-username">Posted by: {post.user?.name || 'Anonymous'}</h3>
//             <h2 className="post-title">{post.title}</h2>
//             {post.images.length > 0 && (
//               <img
//                 src={`http://localhost:1000${post.images[0]}`}
//                 alt={post.title}
//                 className="post-image"
//               />
//             )}
//             <p className="post-description">{post.description}</p>
//             <div className="post-actionss">
//               <button onClick={() => handleLike(post._id)} className="like-button">
//                 👍 Like ({post.likes.length})
//               </button>
//             </div>
//             <div className="comment-section">
//               <h4>Comments</h4>
//               {post.comments.map((comment) => (
//                 <div key={comment._id} className="comment">
//                   <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
//                 </div>
//               ))}
//               <input
//                 type="text"
//                 placeholder="Write a comment..."
//                 className="comment-input"
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleComment(post._id, e.target.value);
//                     e.target.value = '';
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiHeart, FiMessageSquare, FiSearch, FiX, FiChevronLeft } from 'react-icons/fi';
import './Community.css';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:1000/api/auth/allposts');
        const postData = Array.isArray(response.data) ? response.data : [];
        setPosts(postData);
        setFilteredPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);
  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');

      const response = await axios.put(
        `http://localhost:1000/api/auth/posts/like/${postId}`,
        {},
        { headers: { 'auth-token': token } }
      );

      const updatedLikes = response.data.likes;

      setPosts(prev =>
        prev.map(post =>
          post._id === postId ? { ...post, likes: updatedLikes } : post
        )
      );

      // Also update selectedPost safely
      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(prev => ({
          ...prev,
          likes: updatedLikes || [],
        }));
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post(
        `http://localhost:1000/api/auth/post/comment/${postId}`,
        { text: newComment },
        { headers: { 'auth-token': token } }
      );

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post
        )
      );

      if (selectedPost?._id === postId) {
        setSelectedPost(prev => ({
          ...prev,
          comments: [...prev.comments, response.data]
        }));
      }

      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`community-container ${selectedPost ? 'post-selected' : ''}`}>
      {/* Search Header */}
      <header className="community-header">
        {selectedPost ? (
          <button className="back-button" onClick={() => setSelectedPost(null)}>
            <FiChevronLeft size={24} />
          </button>
        ) : (
          <h1 className="community-title">Community Forum</h1>
        )}
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <FiX className="clear-icon" onClick={() => setSearchTerm('')} />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="community-main">
        {/* Posts Grid */}
        {!selectedPost && (
          <div className="posts-grid">
            {isLoading ? (
              <div className="loading-spinner">Loading posts...</div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="post-card"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.images.length > 0 && (
                    <div className="post-image-container">
                      <img
                        src={`http://localhost:1000${post.images[0]}`}
                        alt={post.title}
                        className="post-image"
                      />
                    </div>
                  )}
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">
                      {post.description.length > 100
                        ? `${post.description.substring(0, 100)}...`
                        : post.description}
                    </p>
                    <div className="post-meta">
                      <span className="post-author">{post.user?.name || 'Anonymous'}</span>
                    </div>
                    <div className="post-stats">
                      <span className="post-likes">
                        <FiHeart /> {post.likes.length}
                      </span>
                      <span className="post-comments">
                        <FiMessageSquare /> {post.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                {searchTerm ? 'No matching posts found' : 'No posts available'}
              </div>
            )}
          </div>
        )}

        {/* Post Detail View */}
        {selectedPost && (
          <div className="post-detail-view">
            <div className="post-detail">
              <div className="post-header">
                <div className="post-user">
                  <div className="user-avatar">
                    {selectedPost.user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="user-info">
                    <h4>{selectedPost.user?.name || 'Anonymous'}</h4>

                  </div>
                </div>
              </div>

              <h2 className="post-title">{selectedPost.title}</h2>

              {selectedPost.images.length > 0 && (
                <div className="post-image-container">
                  <img
                    src={`http://localhost:1000${selectedPost.images[0]}`}
                    alt={selectedPost.title}
                    className="post-image"
                  />
                </div>
              )}

              <p className="post-description">{selectedPost.description}</p>

              <div className="post-actions">
                <button
                  className={`like-button ${Array.isArray(selectedPost.likes) && selectedPost.likes.some(like => like.user === localStorage.getItem('userId')) ? 'liked' : ''}`}
                  onClick={() => handleLike(selectedPost._id)}
                >
                  <FiHeart /> Like ({selectedPost.likes.length})
                </button>
              </div>
            </div>

            <div className="comments-section">
              <h3 className="comments-title">Comments ({selectedPost.comments.length})</h3>

              <div className="comments-list">
                {selectedPost.comments.length > 0 ? (
                  selectedPost.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <div className="comment-user">
                        <div className="user-avatar small">
                          {comment.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="user-info">
                          <h4>{comment.user?.name || 'Anonymous'}</h4>
                        </div>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">No comments yet. Be the first to comment!</div>
                )}
              </div>

              <div className="comment-form">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(selectedPost._id)}
                  className="comment-input"
                />
                <button
                  onClick={() => handleCommentSubmit(selectedPost._id)}
                  className="comment-submit"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}