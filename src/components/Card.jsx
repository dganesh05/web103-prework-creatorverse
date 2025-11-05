import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, url, description, imageURL, onViewProfile }) => {
  // Generate handle from name (lowercase, no spaces, add @)
  const handle = name ? `@${name.toLowerCase().replace(/\s+/g, '')}` : '';

  // Ensure URL has a protocol (http:// or https://)
  const getAbsoluteUrl = (urlString) => {
    if (!urlString) return '';
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
      return urlString;
    }
    return `https://${urlString}`;
  };

  return (
    <article className="creator-card">
      <header className="card-header">
        <div className="profile-picture">
          {imageURL ? (
            <img src={imageURL} alt={name} />
          ) : (
            <div className="profile-placeholder">
              {name ? name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
        </div>
        <div className="creator-info">
          <h2 className="creator-name">{name}</h2>
          <p className="creator-handle">{handle}</p>
        </div>
      </header>
      {description && (
        <p className="creator-description">{description}</p>
      )}
      <footer className="card-actions">
        {id && (
          <Link to={`/creators/${id}`} className="btn-view-profile">
            View Profile
          </Link>
        )}
        {url && (
          <a
            href={getAbsoluteUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-visit-website"
            role="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14 4M9.5 2.5L13.5 6.5M6 10L2 14M2 10H6V14H2V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Visit Website
          </a>
        )}
      </footer>
    </article>
  );
};

export default Card;