// Higher Order Components (HOC) - A component(HOC) that renders another component
// Advantages of using a higher order component pattern:
// Reuse code
// Render highjacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => { //passing the function to be wrapped as a argument
    return (props) =>  (//this is actually the HOC
        <div>
            { props.isAdmin && <p>This is private info. Please do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )//to pass down the props, we opened {} to write JS, and then spread out the props object as key value pairs (just like we pass props)
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {
                props.isAuthenticated ? 
                <WrappedComponent {...props} />
                :
                <p>Please login to view the info</p> 
            }
        </div>
    )
};

//withAdminWarnin() and requireAuthentication() are just regular functions that RETURNS HOC
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info); //show component if user is authenticated otherwise show message

// ReactDOM.render(<AdminInfo isAdmin={true} info = "These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'));