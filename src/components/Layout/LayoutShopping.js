import React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom';

import './LayoutShopping.css';
import ShoppingListHeader from '../Topside/ShoppingListHeader';
import SideTool from '../SideTool/SideTool';
import ShoppingList from '../../containers/ShoppingList';

// import {TabMenu} from 'primereact/tabmenu';

const LayoutShopping = (props) => (
    <div>        
        <div className="BodyOverlay">
            <div className="LeftBarOverlay">
            <SideTool/>
            </div>
            <div className="RightBoxOverlay">
                <ShoppingList></ShoppingList>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutShopping)
