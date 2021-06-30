import {useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Header = ({photosCount,profile,followerCount,setFollowerCount}) => {
    const [isFollowingProfile, setisFollowingProfile] = useState(false)
    return (
        <div>
           Profile Header 
        </div>
    )
}

export default Header

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired
}