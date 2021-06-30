import React from 'react'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Photos = ({ photos }) => {
    return (
        <div>
           Photos Component
        </div>
    )
}

export default Photos

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}