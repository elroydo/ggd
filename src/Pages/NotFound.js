import React from 'react';

const NotFound = () => {
    return (
        <div className="main" >
            <div className="page-heading" style={{paddingTop: 30, paddingBottom: 10}}>
                <h3 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>404 NOT FOUND</h3>
                <h6><i>Much Ado About Nothing.</i></h6>
                <div className="not-found"></div>
            </div>
        </div>
    );
}

export default NotFound;