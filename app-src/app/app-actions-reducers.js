import 'whatwg-fetch';

import Fetch from 'utils/fetch';
import extend from 'lodash/object/extend';
import clone from 'lodash/lang/clone';

import { APP_CONSTANTS } from './app-constants';

/*******************************************************************************
 *
 *   1. Default State
 *   2. Action Types
 *   3. ACtion Creators
 *   4. Reducers
 *
 */

/*******************************************************************************
 *  1. Default State
 */

const appState = {
    viewportWidth: 0,
    viewportHeight: 0,

    fetching: {},
    fetched: {},
    fetchingErrors: [],

    data: {}
};

/*******************************************************************************
 *  2. Action Types
 */

export const TYPEs = {
    DATA_FETCHING: 'dataFetching',
    DATA_FETCHED: 'dataFetched',
    DATA_RESET_FETCHED: 'dataResetFetched',
    DATA_FETCHING_ERROR: 'dataFetchingError',

    APP_DATA: 'appData',
    FETCHED_APP_DATA: 'fetchedAppData',

    GET_VIEWPORT_SIZE: 'getViewportSize',
    ERROR_MESSAGE: 'SERVER FAILED TO RESPONSE, PLEASE TRY AGAIN LATER...'
}

/*******************************************************************************
 *  3. Action Creators
 */

export function getAppData(){
    return ( dispatch ) => {
        let type = TYPEs.APP_DATA;
        //let error = TYPEs.ERROR_MESSAGE;

        /*** FETCH ****/

        return Fetch( {
            url: FEEDS.APP,
            dispatch: dispatch,
            type: type,
            fullJSON: true,
            onFetchingError: ( response ) => {
               // debugger;
            }

        }).then( ( results ) => {

            if ( !results ) {
                dispatch( {
                    type: TYPEs.FETCHED_APP_DATA,
                    results: [],
                    message: APP_CONSTANTS.SERVER_FAILED,
                    error: true
                } );
            }
            const catalogInfo = results.data;
            if ( catalogInfo && catalogInfo.CatalogEntryView && catalogInfo.CatalogEntryView.length > 0 ) {
                dispatch( {
                    type: TYPEs.FETCHED_APP_DATA,
                    results: catalogInfo.CatalogEntryView[ 0 ],
                    message: APP_CONSTANTS.SUCCESS,
                    error: false
                } );
            } else {
                dispatch( {
                    type: TYPEs.FETCHED_APP_DATA,
                    results: [],
                    message: APP_CONSTANTS.NO_DATA_AVAILABLE,
                    error: true
                } );
            }
            dispatch( results.fetched );
        } );

    }
}

export function getViewportSize(){
    return {
        type: TYPEs.GET_VIEWPORT_SIZE,
        width: window.innerWidth,
        height: window.innerHeight
    }
}


export function clearFetchingErros() {
    return {
        type: TYPEs.CLEAR_FETCHING_ERROS
    }
}

/*******************************************************************************
 *  4. Reducers
 */

export default ( state = appState, action ) => {

    /*
     * helper function that updates the fetching object 
     */
    const fetching = ( bool ) => {
        return extend( {}, state.fetching, { [ action.fetching || action.fetched || action.fetchingError ]: bool } );
    }
    const fetched = ( bool ) => {
        return extend( {}, state.fetched, { [ action.fetched ]: bool } );
    }

    switch( action.type ) {

        case TYPEs.GET_VIEWPORT_SIZE:
             return {
                ...state,
                viewportWidth: action.width,
                viewportHeight: action.height
             }

         case TYPEs.DATA_FETCHING:
            return {
                ...state,
                fetching: fetching( true )
            }
            
        case TYPEs.DATA_FETCHED:
            return {
                ...state,
                fetched: fetched( true ),
                fetching: fetching( false )
            }

        case TYPEs.DATA_FETCHING_ERROR:
            const errors = clone( state.fetchingErrors );
            errors.push( {
                error: action.error,
                message: action.message
            });
            return {
                ...state,
                fetchingErrors: errors,
                fetched: fetched( false ),
                fetching: fetching( false )
            }

         case TYPEs.FETCHED_APP_DATA:
             return {
                ...state,
                data: {
                    ...state.data,
                    ...action.results,
                    message: action.message,
                    error: action.error
                }
            }

         case TYPEs.CLEAR_FETCHING_ERROS:
            return {
                ...state,
                fetchingErros: []
            }

        default:
            return state;
    }
}
