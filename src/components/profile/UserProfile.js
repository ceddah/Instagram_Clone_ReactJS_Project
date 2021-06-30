import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types';
import Header from './Header';


const UserProfile = () => {
    const reducer = (state, newState) => ({...state, ...newState});
    const initialState = {
        profile: {}, 
        photosCollection: [], 
        followerCount: 0
    }
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            asdad
        </div>
    )
}

export default UserProfile
