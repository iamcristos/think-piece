import React from 'react'

import { UserContext } from '../provider/userProvider';

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withUser(Component) {
    const WrappedComponent = props => {
        return (
            <UserContext.Consumer>
                {user => <Component user={user} {...props}/>}
            </UserContext.Consumer>
        )
    }

    WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`

    return WrappedComponent
}
