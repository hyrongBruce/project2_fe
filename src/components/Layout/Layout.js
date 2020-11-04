
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Topside from '../Topside/Topside'
import './Layout.css';

export class Layout extends Component {

    render() {
        return (
            <header className="HeaderTopside">
                <Topside></Topside>    
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
