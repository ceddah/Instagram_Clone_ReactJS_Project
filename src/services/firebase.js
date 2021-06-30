import {firebase, FieldValue } from '../lib/firebase';

const doesUsernameExist = async (username) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    return result.docs.map((user) => user.data().length > 0);
}

const getUserByUsername = async (username) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
    return user;
}

const getUserByUserId = async (userId) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get()

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return user;
}

const getSuggestedProfiles = async (userId, following) => {
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get()

    // We are filtering out OUR Profile,
    // and we are filtering out profiles that we are already following 
    // (following is being passed in from activeUser)
    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

const updateLoggedInUserFollowing = async (loggedInUserDocId, profileId, isFollowingProfile) => {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
            })
}

const updateFollowedUserFollowers = async (profileDocId, loggedInUserDocId, isFollowingProfile) => {
    return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
        followers: isFollowingProfile
            ? FieldValue.arrayRemove(loggedInUserDocId)
            : FieldValue.arrayUnion(loggedInUserDocId)
        })
}
//Get Photos/Posts for all userId-s in following
const getPhotos = async (userId, following) => {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get()

    const userFollowingPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowingPhotos.map( async (photo) => {
            //Check to see if photos are liked by currnet user and return true or false
            //for each photo of the people we are following
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            //Get the user that posted Photo so we can display it in post header
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto}
        })
    )

    return photosWithUserDetails;
}


const getUserPhotosByUsername = async (username) => {
    const [user] = await getUserByUsername(username);
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', user.userId)
        .get()

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}

//Doing a check to see if we are following the currently opened profile
const isUserFollowingProfile = async (loggedInUserUsername, profileUserId) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUserUsername)
        .where('following', 'array-contains', profileUserId)
        .get();
    
        const [response = {}] = result.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }));

        return response.userId;
}

export {
    doesUsernameExist, 
    getUserByUserId, 
    getSuggestedProfiles, 
    updateLoggedInUserFollowing, 
    updateFollowedUserFollowers,
    getPhotos,
    getUserByUsername,
    getUserPhotosByUsername,
    isUserFollowingProfile
};
