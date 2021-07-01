import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const isUserLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
    //IF user is logged in do not allow him to go to Sign up and Login Page.
    return (
        <Route
            {...rest}
            render={({location}) => {
                if(!user) {
                    return children
                }

                if(user) {
                    return (
                        <Redirect to={{
                        pathname: loggedInPath,
                        state: { from: location }
                        }} />
                    )
                }

                return null;
            }}
        />
    )
}

export default isUserLoggedIn;

isUserLoggedIn.propTypes = {
    user: PropTypes.object,
    loggedInPath: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
}