import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <> 
        <Link to="/hooks">Hooks</Link> &nbsp;
        <Link to="/classes">Classes</Link>
        </>
    )
}

export default Header;
