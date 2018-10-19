import React from "react";
import {Redirect} from "@reach/router";


const withAuth = WrappedComponent => (
    class WithAuto extends React.Component {




        componentDidCatch(error, errorInfo) {
            super.componentDidCatch(error, errorInfo);
        }

        render() {
            
            return this.props.isAuth ? <WrappedComponent {...this.props} /> : <Redirect to={'/'} default noThrow/>;
        }
    }
)

export default withAuth;