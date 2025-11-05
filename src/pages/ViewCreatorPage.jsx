import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ViewCreator from './ViewCreator';

const ViewCreatorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    const handleSuccess = () => {
        // Refresh is handled by the parent component
    };

    return (
        <ViewCreator
            id={id}
            onClose={handleClose}
            onSuccess={handleSuccess}
        />
    );
};

export default ViewCreatorPage;

