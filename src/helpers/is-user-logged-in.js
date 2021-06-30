import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const isUserLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
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