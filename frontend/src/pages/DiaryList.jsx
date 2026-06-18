import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const DiaryList = () => {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [q, setQ] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const fetchEntries = async (currentPage) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/api/entries', {
        params: {
          q: q || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          page: currentPage ?? page,
          limit: 12
        }
      });
      setEntries(response.data.content);
      setTotalPages(response.data.totalPages);
      setPage(response.data.number);
    } catch (err) {
      setError('Could not load diary entries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries(0);
  }, [q, startDate, endDate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this diary entry?')) {
      return;
    }
    try {
      await api.delete(`/api/entries/${id}`);
      const newPage = entries.length === 1 && page > 0 ? page - 1 : page;
      fetchEntries(newPage);
    } catch (err) {
      setError('Failed to delete the diary entry.');
    }
  };

  const handleClearFilters = () => {
    setQ('');
    setStartDate('');
    setEndDate('');
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

      <main className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Journal</h1>
          <Link to="/entries/new" className="btn btn-primary">
            + New Entry
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="filters-bar glass-panel">
          <div className="filter-input-group">
            <label htmlFor="search">Search Keywords</label>
            <input
              type="text"
              id="search"
              placeholder="Search in title or content..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="filter-input-group">
            <label htmlFor="startDate">From Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="filter-input-group">
            <label htmlFor="endDate">To Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button onClick={handleClearFilters} className="btn btn-secondary">
            Reset
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <span className="loading-text">Opening your journal pages...</span>
          </div>
        ) : entries.length === 0 ? (
          <div className="empty-state glass-panel">
            <h2 className="empty-state-title">No Entries Found</h2>
            <p className="empty-state-desc">
              {q || startDate || endDate
                ? "We couldn't find any diary entries matching your filter criteria. Try resetting the filters."
                : "Your digital diary is empty. Start writing down your thoughts, memories, and ideas today!"}
            </p>
            {!q && !startDate && !endDate && (
              <Link to="/entries/new" className="btn btn-primary">
                Write Your First Entry
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="entries-grid">
              {entries.map((entry) => (
                <div key={entry.id} className="entry-card">
                  <Link to={`/entries/${entry.id}`} className="entry-card-link">
                    <div className="entry-date">
                      {new Date(entry.entryDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="entry-title">{entry.title}</h3>
                    <p className="entry-snippet">
                      {entry.content.length > 300
                        ? entry.content.substring(0, 300) + '...'
                        : entry.content}
                    </p>
                  </Link>
                  <div className="entry-actions">
                    <Link to={`/entries/${entry.id}/edit`} className="btn btn-secondary btn-xs">Edit</Link>
                    <button onClick={() => handleDelete(entry.id)} className="btn btn-danger btn-xs">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => fetchEntries(page - 1)}
                  disabled={page === 0}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => fetchEntries(page + 1)}
                  disabled={page >= totalPages - 1}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default DiaryList;
