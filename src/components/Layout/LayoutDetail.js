import React, { Component } from 'react'

import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Breadcrumbs, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CompareTable from '../../containers/CompareTable/CompareTable';

const  LayoutDetail = (props) => {
    let navigateheader = [];
    

    let pid=props.location.state.pid;

    if(!pid || !props.productList || props.productList.length<1)
        return (
            <div>
                <Redirect to="/shopping"/>
            </div>
             );
    let cur_product=props.productList.find(prod => prod.productid === pid);
    
    navigateheader.push(
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="primary" to="/search">
                Mechanical
            </Link>
            <Link color="primary" to="/shopping">
                HVAC Fans
            </Link>
            <Typography color="textPrimary" >
                {cur_product.model}
            </Typography>
        </Breadcrumbs>
    );

    return (
        <div>
            <header>
                <div style={{
                        marginLeft:'30px', 
                        marginBottom: '5px', 
                        marginTop: '5px',
                        minWidth: '350px'
                    }}>
                    {navigateheader}    
                </div>
            </header>
            <h3 style={{color: '#1f4f7a'}}>Product Summary</h3>
            <CompareTable detailPid={cur_product.productid} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    productList: state.product.productList,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutDetail)
