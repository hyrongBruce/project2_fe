import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/Index';
import './LayoutSearch.css';
import Topside from '../Topside/Topside';
import { SearchIndex } from '../../containers/SearchIndex/SearchIndex';
import UserAvatar from '../UserAvatar/UserAvatar';
// import {TabMenu} from 'primereact/tabmenu';

const LayoutSearch = (props) => (
    <div style={{backgroundImage: 'linear-gradient(#7DB6FA,white)'}}>
        <header className="LayoutSearch-header">
            <div>
                <UserAvatar height="75px"></UserAvatar>
            </div>
        </header>
        <div className="LayoutSearch-total">
            <Topside></Topside>
            <SearchIndex></SearchIndex>
            <div style={{height: 300}}></div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSearch)
