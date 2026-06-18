import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

const DiaryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username') || 'User';

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await api.get(`/api/entries/${id}`);
        setEntry(response.data);
      } catch (err) {
        setError('Failed to load the diary entry.');
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this diary entry?')) {
      return;
    }
    try {
      await api.delete(`/api/entries/${id}`);
      navigate('/entries');
    } catch (err) {
      setError('Failed to delete the diary entry.');
    }
  };

  if (loading) {
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
        <main className="detail-page-container">
          <div className="loading-spinner">
            <span className="loading-text">Opening your entry...</span>
          </div>
        </main>
      </div>
    );
  }

  if (error || !entry) {
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
        <main className="detail-page-container">
          <div className="error-message">{error || 'Entry not found.'}</div>
          <Link to="/entries" className="btn btn-primary">Back to Journal</Link>
        </main>
      </div>
    );
  }

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

      <main className="detail-page-container">
        <div className="glass-panel detail-panel">
          <div className="detail-header">
            <Link to="/entries" className="btn btn-secondary btn-sm">&larr; Back</Link>
            <div className="detail-actions">
              <Link to={`/entries/${id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>

          <div className="detail-date">
            {new Date(entry.entryDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          <h1 className="detail-title">{entry.title}</h1>

          <div className="detail-content">
            {entry.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiaryDetail;
