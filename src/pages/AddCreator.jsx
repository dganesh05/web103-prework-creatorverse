import React, { useState } from 'react';
import { supabase } from '../client';

const AddCreator = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('creators').insert(formData);
        if (error) {
            console.error('Error adding creator:', error);
            return;
        }
        // Reset form
        setFormData({
            name: '',
            url: '',
            description: '',
            imageURL: ''
        });
        // Call onSuccess to refresh the list, then close modal
        if (onSuccess) {
            onSuccess();
        }
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>Add New Creator</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                </header>
                <form onSubmit={handleSubmit} className="add-creator-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            placeholder="URL"
                            value={formData.url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group form-group-large">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageURL">Image URL</label>
                        <input
                            type="text"
                            id="imageURL"
                            name="imageURL"
                            placeholder="Image URL"
                            value={formData.imageURL}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn-submit">Add Creator</button>
                </form>
            </div>
        </div>
    );
};

export default AddCreator;