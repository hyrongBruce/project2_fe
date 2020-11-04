import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Button } from '@material-ui/core';
import {ScrollPanel} from 'primereact/scrollpanel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ClearIcon from '@material-ui/icons/Clear';

import './LayoutCompare.css';
import ShoppingListHeader from '../Topside/ShoppingListHeader'
import CompareTable from '../../containers/CompareTable/CompareTable';

export class LayoutCompare extends Component {

    navigateheader = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="primary" to="/search">
                Mechanical
            </Link>
            <Link color="primary" to="/shopping">
                HVAC Fans
            </Link>
            <Typography color="textPrimary" >
                Compare
            </Typography>
        </Breadcrumbs>
    )


    render() {
        return (
            <div>
                <header>
                    <div 
                        style={{
                            marginLeft:'30px', 
                            marginBottom: '15px', 
                            marginTop: '5px',
                            minWidth: '350px'
                        }}>
                        {this.navigateheader}    
                    </div>
                </header>

                <div className="CompareTableBox">  
                    <CompareTable></CompareTable>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutCompare)
