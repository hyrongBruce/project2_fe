import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch, withRouter, Redirect } from 'react-router-dom';

import './LayoutShopping.css';
import ShoppingListHeader from '../Topside/ShoppingListHeader';
import SideTool from '../SideTool/SideTool';
import ShoppingList from '../../containers/ShoppingList';
import LayoutShopping from './LayoutShopping';
import { LayoutCompare } from './LayoutCompare';
import LayoutDetail from './LayoutDetail';

// import {TabMenu} from 'primereact/tabmenu';

const LayoutShoppingMain = (props) => (
    <div>
        <header>
            <ShoppingListHeader/>
        </header>
        
        <Switch>
            <Route path="/shopping/products" component={LayoutShopping}/>
            <Route path="/shopping/compare" component={LayoutCompare}/>
            <Route path="/shopping/details" component={LayoutDetail}/>
            <Redirect to="/shopping/products"></Redirect>
        </Switch>
        
        
    </div>
);

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutShoppingMain)
