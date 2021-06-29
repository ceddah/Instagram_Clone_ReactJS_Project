import {useState,useEffect,useContext} from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

const usePhotos = () => {
    const [photos, setPhotos] = useState(null);
    const { user: { uid: userId = ''} } = useContext(UserContext);

    useEffect(() => {
        const getTimelinePhotos = async () => {
            //Following of the currently Logged In User
            const [{following}] = await getUserByUserId(userId);
            let followedUserPhotos = []

            // check if user is actually following anyone
            if(following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }
            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }
        getTimelinePhotos()
    }, [userId]);

    return { photos };
}

export default usePhotos;