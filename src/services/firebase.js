import {firebase, FieldValue } from '../lib/firebase';

const doesUsernameExist = async (username) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    return result.docs.map((user) => user.data().length > 0);
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
        following: isFollowingProfile
            ? FieldValue.arrayRemove(loggedInUserDocId)
            : FieldValue.arrayUnion(loggedInUserDocId)
        })
}

export {doesUsernameExist, getUserByUserId, getSuggestedProfiles, updateLoggedInUserFollowing, updateFollowedUserFollowers};
