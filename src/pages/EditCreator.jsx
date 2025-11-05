{/* This page should allow editing of a content creator's information. You can use the Card component to display the creator's information and a form to edit it. Make sure to import the Card component at the top of this file, with the help of the Card.jsx component. */}
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const EditCreator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });
    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
            if (error) {
                console.error('Error fetching creator:', error);
                setLoading(false);
                return;
            }
            setCreator(data);
            setFormData({
                name: data.name,
                url: data.url,
                description: data.description,
                imageURL: data.imageURL
            });
            setLoading(false);
        };

        fetchCreator();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('creators').update(formData).eq('id', id);
        if (error) {
            console.error('Error updating creator:', error);
            return;
        }
        navigate(`/creators/${id}`, { replace: true });
    };

    const handleDelete = async () => {
        const { error } = await supabase.from('creators').delete().eq('id', id);
        if (error) {
            console.error('Error deleting creator:', error);
            return;
        }
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!creator) {
        return <div>Creator not found</div>;
    }

    return (
        <div>
            <Card
                key={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageURL={creator.imageURL}
            />
            <form onSubmit={handleSubmit}>
                <label htmlFor="edit-name">Name</label>
                <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="edit-url">URL</label>
                <input
                    type="text"
                    id="edit-url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="edit-description">Description</label>
                <textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />
                <label htmlFor="edit-imageURL">Image URL</label>
                <input
                    type="text"
                    id="edit-imageURL"
                    name="imageURL"
                    value={formData.imageURL}
                    onChange={handleChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleDelete} className="secondary">Delete</button>
            </form>
        </div>
    );
};

export default EditCreator;