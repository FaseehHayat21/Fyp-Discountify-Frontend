import React, { useState, useEffect } from 'react';
import './JobListing.css'; // Importing CSS for styling

function JobListing({ userProfile }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(''); // FE-2: Location-based filtering
  const [category, setCategory] = useState(''); // FE-3: Category filtering
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]); // FE-5: Bookmarked jobs
  const [scraping, setScraping] = useState(false); // State for scraping

  // Fetch all job listings
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:1000/api/auth/jobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Scrape jobs button handler
  const scrapeJobs = async () => {
    setScraping(true);
    try {
      const response = await fetch('http://localhost:1000/api/auth/scrape-jobs', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to scrape jobs');
      }
      alert('Job scraping completed successfully!');
      fetchJobs(); // Fetch the newly scraped jobs
    } catch (error) {
      console.error('Error scraping jobs:', error);
      alert('Error scraping jobs.');
    }
    setScraping(false);
  };

  // FE-2: Location-based navigation
  const filterByLocation = (job) => {
    if (location === '') return true; // No location filter
    return job.location.toLowerCase().includes(location.toLowerCase());
  };

  // FE-3: Category Filters for Easy Job Search
  const filterByCategory = (job) => {
    if (category === '') return true; // No category filter
    return job.category.toLowerCase().includes(category.toLowerCase());
  };

  // FE-4: Profile Skills and Preferences Matching with Job Listings
  const matchSkills = (job) => {
    if (!userProfile.skills || userProfile.skills.length === 0) return true;
    return job.skills.some((skill) => userProfile.skills.includes(skill));
  };

  // FE-5: Bookmark a job
  const bookmarkJob = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter((id) => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  return (
    <div className="jobs-container">
      <h2>Part-Time Job Listings</h2>

      {/* Scrape Jobs Button */}
      <button onClick={scrapeJobs} disabled={scraping} className="scrape-button">
        {scraping ? 'Scraping Jobs...' : 'Scrape Jobs'}
      </button>

      {/* FE-2: Location Filter */}
      <div className="filter">
        <label>Filter by Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
      </div>

      {/* FE-3: Category Filter */}
      <div className="filter">
        <label>Filter by Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="Education">Education</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Job Listings */}
      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}

      <ul className="job-list">
        {jobs
          .filter(filterByLocation)
          .filter(filterByCategory)
          .filter(matchSkills)
          .map((job) => (
            <li key={job._id} className="job-item">
              <h3>{job.title}</h3>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Required Skills:</strong> {job.skills.join(', ')}</p>

              {/* FE-5: Bookmarking */}
              <button
                className={`bookmark-button ${bookmarkedJobs.includes(job._id) ? 'bookmarked' : ''}`}
                onClick={() => bookmarkJob(job._id)}
              >
                {bookmarkedJobs.includes(job._id) ? 'Unbookmark' : 'Bookmark'}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default JobListing;
