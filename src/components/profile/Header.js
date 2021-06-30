import {useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile } from '../../services/firebase';

const Header = ({
        photosCount,
        followerCount,
        setFollowerCount,
        profile: { docId: profileDocId, userId: profileUserId, fullName, followers = [] , following = [], username: profileUsername }
    }) => {
    const [isFollowingProfile, setisFollowingProfile] = useState(false);
    const { user } = useUser();
    //Checking if we are not visiting our own profile
    const activeBtnFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = ()  => {
        setisFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followers.length - 1 : followers.length + 1
        })
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setisFollowingProfile(!!isFollowing);
        }
        if(user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    },[user.username, profileUserId])

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
           <div className="container flex justify-center">
               {profileUsername ? <img 
                className="rounded-full h-40 w-40" 
                alt={`${fullName} Profile`} 
                src={`/images/avatars/${profileUsername}.jpg`}    
                /> : <Skeleton circle height={150} width={150} count={1} />}
           </div>
           <div className="flex items-center justify-center flex-col col-span-2">
               <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button 
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    handleToggleFollow()
                                }
                            }}
                            >
                                {isFollowingProfile ? 'Unfollow' : 'Follow'}
                            </button>
                    )}
               </div>
               <div className="container flex mt-4">
                   {followers === undefined || following === undefined ? (
                       <Skeleton count={1} width={677} height={24} />
                   ) : (
                       <>
                           <p className="mr-10">
                                <span className="font-bold">{photosCount}</span>
                           </p>
                           <p className="mr-10">
                                <span className="font-bold">
                                    {followers.length} {` `} 
                                    {followers === 1 ? 'follower' : 'followers'}
                                </span>
                           </p>
                           <p className="mr-10">
                                <span className="font-bold">{following.length} following</span>
                           </p>
                       </>
                   )}
               </div>
           </div>
        </div>
    )
}

export default Header

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array
    }).isRequired
};