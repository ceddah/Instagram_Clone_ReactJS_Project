import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';

const Signup = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === ''
    
    const handleSignUp = async (e) => {
        e.preventDefault();

        const usernameExists = await doesUsernameExist(username);
        if(!usernameExists.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);
                await createdUserResult.user.updateProfile({
                    displayName: username
                })

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName: fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });
                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setUsername('');
                setError(error.message);
            }
        } else {
            setError('That username is already taken.')
        }
        
    }

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5" >
                <img src="/images/iphone-with-profile.jpg" alt="iphone instagram login" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white border p-4 border-gray-primary mb-4 rounded">
                    <h1 className="justify-center flex w-full">
                        <img src="/images/logo.png"  alt="Instagram" className="mt-2 w-6/12 mb-4"/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            value={username}
                            aria-label="Enter your username" 
                            type="text" placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setUsername(target.value)}
                        />
                        <input
                            value={fullName}
                            aria-label="Enter your full name" 
                            type="text" placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setFullName(target.value)}
                        />
                        <input
                            value={emailAddress}
                            aria-label="Enter your email address" 
                            type="text" placeholder="Email Address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setEmailAddress(target.value)}
                        />
                        <input
                            value={password}
                            aria-label="Enter your Password" 
                            type="password" placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({target}) => setPassword(target.value)}
                        />
                        <button 
                            disabled={isInvalid} 
                            type="submit" 
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >Sign Up</button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white py-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Have an account? {``} 
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
