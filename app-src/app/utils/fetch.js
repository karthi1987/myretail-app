import $ from 'jquery';

/*******************************************************************************
 *  1. Fetch Util
 *
 *  IBMRR uses fetch instead of ajax.
 *  requires webpack polyfill and whatwg-fetch to operate in any browser that isn't chrome ( this is included in index.html )
 *  Fetch util also will store `fetching`, `fetched`, and `fetchingError` data in the app object of global app state
 */

export default ( opts ) => {

    let url = opts.url;
    let body = { ...opts.body };

    const{
        type, method, dispatch,
        onFetching, onFetchingError, fullJSON
    } = opts;

    //assigns 'type: true' to fetching object in app object of global app state
    dispatch( fetching( type ) );

    //assign a function as a value to an onFetching key when using Ajax function to execute a callback here
    onFetching && onFetching();

    if(
        method !== 'POST' &&
        method === 'GET' || VZ_AJAX_POST_TYPE === 'GET'
    ) {
        if( body ) {
            const query = $.param( body );
            url = url + '?' + query;
        }
        body = null;
    }else{
        body = JSON.stringify( body );
    }

    return fetch(
            url,
            {
                method: method || VZ_AJAX_POST_TYPE, //VZ_AJAX_POST_TYPE set in config.js
                body: body,
                credentials: 'same-origin',
                mode: 'no-cors',
                noparse: undefined,
                headers: {
                    'Accept': 'application/json, text/javascript, */*',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        )
            .then( ( response ) => {
            if ( process.env.NODE_ENV !== 'test' ) {
        //console.log( response );
    }
    if ( !response.ok ) {
        return Promise.reject( response );
    }

    return response;

} )
.then( response => response.json() )
.then(
        json => {

            const message =  json.message || '';
            const data = fullJSON ? json : json.data;
            if ( !json ) {
                return Promise.reject( json );
            } else {
                return {
                    data: data,
                    message: message,
                    fetched: fetched( type ) //required to set fetched status in global app state app object for specific type
                };
            }
        }
    ).catch(
        response => {
            let error;
            if( response.status && response.statusText ) {
                error = response.status + ': ' + response.statusText;
            }else{
                error = response.message;
            }

    //assign a function as a value to an onFetchingError key when using Ajax function to execute a callback here
    onFetchingError && onFetchingError( error );

    //assigns error data to fetchingError object in global app state app object for specific typ
    dispatch( fetchingError( type, error ) );

            return false;
        }
    );
};

/*******************************************************************************
 *  2. Action Types
 */

export const TYPEs = {
    DATA_FETCHING: 'dataFetching',
    DATA_FETCHED: 'dataFetched',
    DATA_FETCHING_ERROR: 'dataFetchingError',
    DATA_RESET_FETCHED: 'dataResetFetched'
};

/*******************************************************************************
 *  3. Action Creators
 */

export const fetching = ( type ) => {
    return {
        type: TYPEs.DATA_FETCHING,
        fetching: type
    };
};

export const fetched = ( type ) => {
    return {
        type: TYPEs.DATA_FETCHED,
        fetched: type
    };
};

export const fetchingError = ( type, error ) => {
    return {
        type: TYPEs.DATA_FETCHING_ERROR,
        fetchingError: type,
        error: error
    };
};

export const resetFetched = ( type ) => {
    return {
        type: TYPEs.DATA_RESET_FETCHED,
        fetched: type
    };
};
