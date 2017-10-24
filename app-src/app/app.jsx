//lib and utils
import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import isEqual from 'lodash/lang/isEqual';
import isEmpty from 'lodash/lang/isEmpty';
import findIndex from 'lodash/array/findIndex';
import filter from 'lodash/collection/filter';
import map from 'lodash/collection/map';

import classnames from 'classnames';
//Store
import { AppStore } from './app-store';
//utils
import 'utils/mock-feeds.js';
//action-creators
import { getAppData, getViewportSize } from './app-actions-reducers';
//Global Components
import Header from './header/header';
import Nav from './nav/nav';
import Footer from './footer/footer';

import { ErrorMessage } from './shared/static-component';

import { APP_CONSTANTS } from './app-constants';

//Scss
import './common.scss';

/*
 * AppProvider assigns the AppStore
*/
class AppProvider extends React.Component{
    render () {
        return (
            <Provider store={ AppStore }>
                <TargetApp />
            </Provider>
        )
    }
}

/*
*  TargetApp is the main container for the app
*/

class TargetApp extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            //To do:
        };

        this.renderComponent = this.renderComponent.bind( this );
    }

    componentWillMount(){
        this.props.getViewportSize();
        this.props.getAppData();
    }

    renderComponent() {

        const {
            app: { 
                viewportWidth, viewportHeight, fetching, data,
                fetched: { appData, appDataLoaded = appData }
            }
        } = this.props;

        if ( !appDataLoaded ) {
            return (
                <div className="app-loader"> { APP_CONSTANTS.DATA_LOADING } </div>
            );
        }

        if ( appDataLoaded && data ) {
            if ( data.error ) {
                return (
                    <ErrorMessage { ...data }/>
                );
            } else {
                return(
                    <div>
                        <Header />
                        <Nav { ...data }/>
                        <Footer />
                    </div>
                );
            }
        }

    }

    render() {

        return(
            <div className="app-wrapper">
                {
                    this.renderComponent()
                }
            </div>
        );
    }
}

/*
 * TargetApp component connection
 */

TargetApp = connect(
    ( state ) => {
        return {
            app: state.app
        }
    }, 
    ( dispatch ) => bindActionCreators( {
        getAppData,
        getViewportSize
    }, dispatch )
)( TargetApp );


const TargetAppRoot = document.getElementById( 'app-root' );
render(
    <AppProvider />,
    TargetAppRoot
);
