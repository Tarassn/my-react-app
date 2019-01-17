import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
        <header className="top">
            <h1>Lamb
                <span className={'ofThe'}>Of</span>
                God
            </h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>

);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

// class Header extends React.Component{
//     render(){
//         return (
//             <div>
//                 <header className="top">
//                     <h1>Catch
//                         <span className={'ofThe'}>Of</span>
//                         <span className='the'>The</span>s
//                         Day
//                     </h1>
//                 </header>
//                 <h3 className="tagline">
//                     <span>{this.props.tagline}</span>
//                 </h3>
//             </div>
//         )
//     }
// }

export default Header;