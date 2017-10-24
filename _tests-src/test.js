const serverConfig = require( '../server.config' );
const app = require( './server.js' );

const testApi = require('./api.js');
const testUI = require('./ui.js');

/*
 * Start the server and run the tests
 */

const server = app.listen( serverConfig.LOCAL_PATH, ( error ) => {
	if( error ) {
		logger.error( error )
	} else {
		const port = serverConfig.PORT;
		logger.info( `Listening on port ${ port }` );
	}
} );

testUI();

server.close();