import React from 'react';
import { connect } from 'react-redux'

import {OverlayPanel} from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import Useravatar from '../UserAvatar/UserAvatar';
import { Button } from 'primereact/button';
import './ShoppingListHeader.css';
import Logo from '../Logo/Logo';
import { Dropdown } from 'primereact/dropdown';

const ShoppingListHeader = (props) => {

    const searchBlurHandler = (event) => {
        props.searchProduct(event.target.value);
    }

    return (
        <div className="Headercontainer">
            <div className="Logozone">
                <Logo height="80"></Logo>
            </div>
            
            <div id="searchzone" className="Searchzone">
                <div className="input-group">
                    <InputText className="SearchzoneText"
                        placeholder="search..."
                        onBlur={searchBlurHandler}></InputText>
                    <Button icon="pi pi-search" ></Button>
                </div>
            </div>        

            <div id="userzone" className="Userzone">
                <Useravatar height="75"/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({
    searchProduct: (condition) => dispatch({type: 'product_search', searchString: condition}),
})


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListHeader);
