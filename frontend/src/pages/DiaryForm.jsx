import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';

const DiaryForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    if (isEditMode) {
      const fetchEntry = async () => {
        try {
          const response = await api.get(`/api/entries/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
          setEntryDate(response.data.entryDate);
        } catch (err) {
          setError('Failed to fetch the diary entry.');
        } finally {
          setFetching(false);
        }
      };
      fetchEntry();
    }
  }, [id, isEditMode, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const entryData = {
      title,
      content,
      entryDate
    };

    try {
      if (isEditMode) {
        await api.put(`/api/entries/${id}`, entryData);
      } else {
        await api.post('/api/entries', entryData);
      }
      navigate('/entries');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save diary entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <header>
        <div className="nav-container">
          <Link to="/entries" className="logo">Antigravity Diary</Link>
          <div className="user-nav">
            <span className="username-display">Hello, <strong>{username}</strong></span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">Log Out</button>
          </div>
        </div>
      </header>

      <main className="form-page-container">
        <div className="glass-panel">
          <h1 className="form-title">
            {isEditMode ? 'Edit Diary Entry' : 'Write New Entry'}
          </h1>

          {error && <div className="error-message">{error}</div>}

          {fetching ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <span>Loading entry details...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Entry Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Capture this moment in a title..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="entryDate">Date</label>
                <input
                  type="date"
                  id="entryDate"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Your Thoughts</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What is on your mind today? Write it down..."
                  required
                />
              </div>

              <div className="form-actions">
                <Link to="/entries" className="btn btn-secondary">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving Entry...' : 'Save Entry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default DiaryForm;
