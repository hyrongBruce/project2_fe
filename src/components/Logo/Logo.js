import React from 'react';
import JouleLogo from '../../assets/image/logo.png';

const Logo = (props) => (
    // <div style={{height: props.height},{width: props.weight}}>
    <div style={{height: props.height}}>
        <img src={JouleLogo} alt="logo" height={props.height}/>
    </div>
);

export default Logo