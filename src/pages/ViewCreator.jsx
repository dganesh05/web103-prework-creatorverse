import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const ViewCreator = ({ id, onClose, onSuccess }) => {
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
            if (error) {
                console.error('Error fetching creator:', error);
                setLoading(false);
                return;
            }
            setCreator(data);
            setLoading(false);
        };

        if (id) {
            fetchCreator();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this creator?')) {
            const { error } = await supabase.from('creators').delete().eq('id', id);
            if (error) {
                console.error('Error deleting creator:', error);
                return;
            }
            // Call onSuccess to refresh the list, then close modal or navigate
            if (onSuccess) {
                onSuccess();
            }
            if (onClose) {
                onClose();
            } else {
                navigate('/');
            }
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            if (onClose) {
                onClose();
            } else {
                navigate('/');
            }
        }
    };

    if (loading) {
        return (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <header className="modal-header">
                        <h2>View Creator</h2>
                        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                    </header>
                    <div className="modal-body">
                        <div>Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!creator) {
        return (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <header className="modal-header">
                        <h2>View Creator</h2>
                        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                    </header>
                    <div className="modal-body">
                        <div>Creator not found</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content view-creator-modal" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>View Creator</h2>
                    <button
                        className="modal-close"
                        onClick={onClose || (() => navigate('/'))}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </header>
                <div className="modal-body">
                    <Card
                        key={creator.id}
                        id={creator.id}
                        name={creator.name}
                        url={creator.url}
                        description={creator.description}
                        imageURL={creator.imageURL}
                    />
                    <footer className="creator-actions">
                        <Link to={`/edit-creator/${id}`} onClick={onClose || (() => { })}>
                            <button>Edit Creator</button>
                        </Link>
                        <button onClick={handleDelete} className="btn-delete-creator" role="button">
                            Delete Creator
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ViewCreator;