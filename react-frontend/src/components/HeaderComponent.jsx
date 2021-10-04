import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
               <header className="header">
                   <nav className="navbar navbar-expand-md navbar-dark bg-dark " >
                       <div>Employee  Management App</div>
                   </nav>
                </header> 
            </div>
        );
    }
}

export default HeaderComponent;