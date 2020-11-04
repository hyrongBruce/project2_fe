import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AutoComplete} from 'primereact/autocomplete';
import './SearchIndex.css';
import {Dropdown} from 'primereact/dropdown';
import { Redirect } from 'react-router-dom';

export class SearchIndex extends Component {
    state = {
        ProductCategory: [
            'Mechanical'
        ],
        ProductType: [
            'HVAC Fans'
        ],
        ProductTypeSuggestion: [
            null
        ]
        ,
        inputContent: '',
        inputCategory: 'Mechanical',
        pageStatus: 'init'
    }  

    render() {
        let displayed = [];   
        
        let inputCategoryItems = [];

        for(let ele of this.state.ProductCategory){
            inputCategoryItems.push({label: ele, value: ele});
        }

        displayed= (
            <div>
                <div className="SearchIndex-Area">
                    <AutoComplete 
                        value={this.state.inputContent} 
                        onChange={(event) => this.setState({inputContent: event.value})}
                        completeMethod={(event) => this.suggestionHandler(event)}
                        suggestions={this.state.ProductTypeSuggestion}
                        ></AutoComplete>                        
                    <i className="pi pi-search SearchButton" onClick={this.clickHandler}></i>
                    <div>
                        <Dropdown value={this.state.inputCategory}
                            options= {inputCategoryItems}
                            // className="Dropdown"
                        
                        ></Dropdown>
                    </div>
                    
                </div>
            </div>
            
        );

        if(this.state.pageStatus === 'HVAC_Fans' )
            displayed = (
                <Redirect to="/shopping"></Redirect>
            );

        // localStorage.setItem('urlstatus', this.state.pageStatus);
        
        return (
            <div>
                {displayed}
            </div>
        );
    }

    suggestionHandler = (event) => {
        let results = this.state.ProductType.filter((producttype) => {
            return producttype.toLowerCase().startsWith(event.query.toLowerCase());
       });

       this.setState({ ProductTypeSuggestion: results });
    }

    clickHandler = (event) => {
        if(this.state.ProductType[0].toLowerCase().
            startsWith(this.state.inputContent.toLowerCase()))
            this.setState({pageStatus: 'HVAC_Fans'});
            // console.log('match');
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIndex)
