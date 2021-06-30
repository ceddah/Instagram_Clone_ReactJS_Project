import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header'

const Profile = () => {
    const { username } = useParams();
    const history = useHistory();
    const [userExists, setUserExists] = useState(undefined);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserExists = async () => {
            const getUser = await getUserByUsername(username);
            if(getUser.length > 0) {
                setUserExists(true)
                setUser(getUser[0])
            } else {
                history.push(ROUTES.NOT_FOUND)
            }
        }
        checkUserExists();
    }, [username, history])

    return userExists ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">

            </div>
        </div>
    ) : null;
}

export default Profile
