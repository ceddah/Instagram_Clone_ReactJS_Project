import {useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Header = () => {
    const [isFollowingProfile, setisFollowingProfile] = useState(false)
    return (
        <div>
           Profile Header 
        </div>
    )
}

export default Header
