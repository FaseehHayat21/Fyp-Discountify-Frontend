// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Community.css'; // Ensure this is the correct path to your CSS file

// export default function Community() {
//   const [posts, setPosts] = useState([]); // Initialize as an empty array
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]); // Initialize as an empty array

//   // Fetch posts from the backend
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/auth/allposts');
//         const postData = Array.isArray(response.data) ? response.data : []; // Ensure the data is an array
//         setPosts(postData);
//         setFilteredPosts(postData);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setPosts([]); // Ensure posts is set to an array if there's an error
//         setFilteredPosts([]);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Filter posts based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = posts.filter(post =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredPosts(filtered);
//     } else {
//       setFilteredPosts(posts);
//     }
//   }, [searchTerm, posts]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handle liking a post
//   const handleLike = async (postId) => {
//     const currentUserId =  localStorage.getItem('userid'); // Replace with the actual logged-in user's ID
//     try {
//       await axios.put(`http://localhost:1000/api/auth/like/${postId}`, { userId: currentUserId }); // Backend route to like a post
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post._id === postId ? { ...post, likes: [...post.likes, currentUserId] } : post
//         )
//       );
//     } catch (error) {
//       console.error('Error liking the post:', error);
//     }
//   };

//   // Handle commenting on a post
//   const handleComment = async (postId, commentText) => {
//     try {
//       const response = await axios.post(`http://localhost:1000/api/auth/comment/${postId}`, { text: commentText }); // Backend route for comments
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
//       <div>
//         <input
//           type="text"
//           placeholder="Search posts"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <div>
//         {filteredPosts.map((post) => (
//           <div key={post._id} className="post">
//             {/* Display the post author's name */}
//             <h3 className='post-username'>Posted by: {post.user?.name || 'Anonymous'}</h3>

//             {/* Post title */}
//             <h2 className='post-title'>{post.title}</h2>

//             {/* Post image */}
//             {post.images.length > 0 && (
//               <img 
//                 src={`http://localhost:1000${post.images[0]}`} 
//                 alt={post.title} 
//                 className="post-image"
//               />
//             )}

//             {/* Post description */}
//             <p className='post-des'>{post.description}</p>

//             {/* Like button */}
//             <div>
//               <button onClick={() => handleLike(post._id)}>
//                 Like ({post.likes.length > 0 ? post.likes.length : 0})
//               </button>
//             </div>

//             {/* Comments section */}
//             <div className="comment-section">
//               <h4>Comments</h4>
//               {post.comments.map((comment) => (
//                 <div key={comment._id} className="comment">
//                   <strong>{comment.user?.name || 'Anonymous'}: </strong>
//                   <span>{comment.text}</span>
//                 </div>
//               ))}
//               <input
//                 type="text"
//                 placeholder="Add a comment"
//                 className="comment-input input-c-box "
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleComment(post._id, e.target.value);
//                     e.target.value = ''; // Clear the input after commenting
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
import './Community.css'; // Ensure this is the correct path to your CSS file

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/auth/allposts');
        const postData = Array.isArray(response.data) ? response.data : [];
        setPosts(postData);
        setFilteredPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      // Send a PUT request to toggle like/unlike
      const response = await axios.put(
        `http://localhost:1000/api/auth/posts/like/${postId}`,
        {},
        {
          headers: {
            'auth-token': token, // Include the token in the request header
          },
        }
      );
  
      // Update the posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: response.data.likes } // Update likes array
            : post
        )
      );
    } catch (error) {
      console.error('Error toggling like/unlike:', error);
    }
  };



  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return; // Prevent empty comments
  
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:1000/api/auth/post/comment/${postId}`,
        { text: commentText },
        {
          headers: {
            'auth-token': token, // Include the token in the request header
          },
        }
      );
  
      // Update the state to include the new comment
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post._id} className="post">
            <h3 className="post-username">Posted by: {post.user?.name || 'Anonymous'}</h3>
            <h2 className="post-title">{post.title}</h2>
            {post.images.length > 0 && (
              <img
                src={`http://localhost:1000${post.images[0]}`}
                alt={post.title}
                className="post-image"
              />
            )}
            <p className="post-description">{post.description}</p>
            <div className="post-actionss">
              <button onClick={() => handleLike(post._id)} className="like-button">
                👍 Like ({post.likes.length})
              </button>
            </div>
            <div className="comment-section">
              <h4>Comments</h4>
              {post.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
                </div>
              ))}
              <input
                type="text"
                placeholder="Write a comment..."
                className="comment-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post._id, e.target.value);
                    e.target.value = '';
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
