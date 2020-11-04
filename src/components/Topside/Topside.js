import React from 'react';
import Logo from '../Logo/Logo';
import './Topside.css';

const Topside = (props) => (
    <div className="Topside">
        <div>
            <Logo height="150"></Logo>
        </div>
        <h2 style={{color:"grey"}}>Building Product Selection Platform</h2>
    </div>
);

export default Topside;