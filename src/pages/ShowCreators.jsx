{/* This page should display a list of content creators. You can use the Card component to display each creator's information. Make sure to import the Card component at the top of this file. */ }

import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import AddCreator from './AddCreator';

const ShowCreators = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchCreators = async () => {
        const { data, error } = await supabase.from('creators').select('*');
        if (error) {
            console.error('Error fetching creators:', error);
        } else {
            setCreators(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCreators();
    }, []);

    const handleAddSuccess = () => {
        fetchCreators();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="show-creators-container">
            <div className="header-actions">
                <button onClick={() => setShowAddModal(true)} className="btn-add-creator">
                    Add New Creator
                </button>
            </div>
            {creators.length === 0 ? (
                <article>
                    <p className="no-creators">No content creators found. Add some creators to get started!</p>
                </article>
            ) : (
                <div className="creators-grid">
                    {creators.map((creator) => (
                        <Card
                            key={creator.id}
                            id={creator.id}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                        />
                    ))}
                </div>
            )}
            {showAddModal && (
                <AddCreator
                    onClose={() => setShowAddModal(false)}
                    onSuccess={handleAddSuccess}
                />
            )}
        </div>
    );
};

export default ShowCreators;