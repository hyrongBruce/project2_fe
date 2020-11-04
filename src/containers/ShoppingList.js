import React, { Component } from 'react';
import { Route, NavLink, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LayoutShopping from '../components/Layout/LayoutShopping';
import * as actions from '../store/actions/Index';
import './ShoppingList.css';
import Dropdown_Breadcrumb from '../components/Dropdown/breadcrumb-dropdown';

import { Checkbox, Button } from '@material-ui/core';
import {ScrollPanel} from 'primereact/scrollpanel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ClearIcon from '@material-ui/icons/Clear';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

// import {TabMenu} from 'primereact/tabmenu';

class ShoppingList extends Component{

    state = {
        redirectTo: null,
    }

    
    // navigateitems = [
    //     {label: 'HVAC Fans'},
    // ];
    // navigatehome = {
    //     icon: 'pi pi-home', url: '/search'
    // }
    navigateheader = (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            
            <Link color="primary" to="/search">
                Mechanical
            </Link>
            <Typography color="textPrimary" >
                    HVAC Fans 
            </Typography>
        </Breadcrumbs>
    )

    clickonavatar = () => {
        console.log('click on avatar');
    }

    componentDidMount() {
        this.props.getProductList();
    }

    handleRedirect = () => {
        this.setState({redirectTo: '/shopping/compare'});
    }

    handleRedirectToDetail = (pid) => {
        console.log(pid);
        this.setState({redirectTo: {pathname: '/shopping/details', state: {pid: pid}}});
    }

    compareCheckboxHandler = (event, productid) => {
        this.props.changeComparedProduct(productid);
    }

    findIsCompared = (pid) => {
        let result = (this.props.comparedProductId.find(eleid => eleid === pid));
        if(!result)
            return false;
        else
            return true;
    }

    

    render(){
        let productpages = [];
        let displayed = (
            <div>
                Nothing choosed...
            </div>
        );

        if(this.props.receiveState === 'success') 
        {
            
            for(let i=0;i<this.props.products.length;i++)
            {
                let properties = [];
                let key=this.props.generalType[0];
               

                key=this.props.generalType[1];
                let comments=[' CFM',
                    ' W at max speed',
                    ' dBA at max speed',
                    '" fan sweep diameter'
                ];
                let com_index=0;
                let midAreaGray = [];
                for(let key_item in this.props.items[key]){
                    let curitem = this.props.items[key][key_item];
                    midAreaGray.push(
                        <p className="ProductProperties-gray">
                            {this.props.products[i][curitem.id]}
                            {comments[com_index]}    
                        </p>
                    );
                    com_index++;
                }
                properties.push(
                    <div className="ProductProperties-gray">
                        {midAreaGray}
                    </div>
                )

                key=this.props.generalType[2];
                let redAreaDiv = [];
                redAreaDiv.push(
                    <p className="ProductProperties-red">
                        {key.replace('_',' ')+': '}
                    </p>
                );
                let redAreaText = [];
                for(let key_item in this.props.items[key]){
                    let curitem = this.props.items[key][key_item];
                    redAreaText.push(this.props.products[i][curitem.id]+' '+curitem.title);
                }
                redAreaDiv.push(
                    <p className="ProductProperties-red">
                        {redAreaText.join(' / ')}
                    </p>
                )
                properties.push(
                    <div className="ProductProperties-red">
                        {redAreaDiv}
                    </div>
                )

                let producttitle = [];
                let producttitlecontents = [
                    this.props.products[i].manufacturer,
                    this.props.products[i].productname+' '+this.props.products[i].series,
                    this.props.products[i].model
                ]   
                for(let curtitle of producttitlecontents)
                    producttitle.push(
                        <p className="ProductTitle"
                            onClick={(event) => this.handleRedirectToDetail(this.props.products[i].productid)}>
                            {curtitle}
                        </p>  
                    );

                let operateZone=(
                    <div className="operateZone">
                        <div className="operateZone-Text">
                            <input type="checkbox" 
                                id={'checkbox'+this.props.products[i].productid}
                                style={{verticalAlign: 'middle'}}
                                onChange={event => this.compareCheckboxHandler(event, this.props.products[i].productid)}
                                checked={this.findIsCompared(this.props.products[i].productid)}
                                />
                            <span className="operateZoneText">Compare</span>
                        </div>
                        <div className="operateZone-ButtonDiv">
                            <button className="operateZone-Button">Add to</button>
                        </div>
                    </div>
                );


                productpages.push(
                    <div className="ProductListBox" >
                        <img src={'http://localhost:8080/res/product?productlocation='+this.props.products[i].imagelocation} 
                            className = "ProductImage"
                            alt="product" height='110' width='150' style={{marginTop:'2px'}}
                            onClick={(event) => this.handleRedirectToDetail(this.props.products[i].productid)}
                            />
                        <div className="ProductTitle">
                            {producttitle}
                        </div>
                        <div>
                            {properties}
                        </div>
                        <div>
                            {operateZone}
                        </div>
                   </div>
                )
            }
            displayed = (
                <div className="ProductListZoneBox">
                    {productpages}
                </div>
            );
        }
        else
        if(this.props.receiveState === 'process'){
            displayed = (
                <div>
                    <i className="pi pi-spinner pi-spin" style={{fontSize:'5rem'}}></i>
                </div>
            );
        }

        let redirectOption = [];

        if(this.state.redirectTo !== null){
            redirectOption = (
                <Redirect to={this.state.redirectTo}></Redirect>
            );
        }

        return (
            <div>
                {redirectOption}
                <header className="Breadcrumb">
                    {/* <BreadCrumb model={this.navigateitems} home={this.navigatehome}
                        style={{borderColor: 'transparent'}}
                        /> */}
                    <div style={{minWidth: '220px'}}>
                        {this.navigateheader}
                    </div>
                    <div>
                        <Button variant="outlined" color="primary" onClick={this.handleRedirect}>
                            To Compare
                        </Button>
                    </div>
                </header>
                <ScrollPanel style={{width:'100%', height: '600px'}}>
                    {displayed}
                </ScrollPanel>
                
                {/* <div>
                    <RangeSlider></RangeSlider>
                </div> */}
            </div>
        );
    }

}


const mapStateToProps = (state) => ({
    logStatus: state.auth.logStatus,
    userId: state.auth.userId,
    token: state.auth.token,

    items: state.filter.sideitems,
    generalType: state.filter.GeneralTypes,
    products: state.product.displayedProductListAfterSearch,

    receiveState: state.product.receiveState,
    
    comparedProductId: state.product.comparedProductId,
})

const mapDispatchToProps = dispatch => ({
    getProductList: () => actions.getProductList()(dispatch),
    changeComparedProduct: (productid) => dispatch({type: 'product_compare_change', productid: productid}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
