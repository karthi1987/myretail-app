//libs and utilities
import React from 'react';
import { render } from 'react-dom';

//scss
import './header.scss';

class Header extends React.Component{
    render(){
        return(
            <HeaderComponent />
        )
    }
}


/* Header Componets */
class HeaderComponent extends React.Component{

    render(){
        return(
            <header>
				<div className="header"></div>
			</header>
        )
    }
}

module.exports = Header;