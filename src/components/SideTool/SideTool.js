import React from 'react';
import {Accordion,AccordionTab} from 'primereact/accordion';
import {Slider} from 'primereact/slider';
import { connect } from 'react-redux'

import './SideTool.css';
// import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import transferImg from '../../assets/image/transfer.png'
import { InputText } from 'primereact/inputtext';
import * as actions from '../../store/actions/Index';
import RangeSlider from './mySliderInput';

class SideTool extends React.Component{
    state={
        items: {},
    }

    accordionBars = [];
    
    render(){
        this.state.items = this.props.items;
        this.setSliderInfo();
        return (
            <div className="SideBarPanel" >
                <div className="mySideBarPanel-ButtonArea">
                    <span className="mySideBarPanel-ButtonArea-Span">
                        Search: 
                    </span>
                    <div>
                        <button className="mySideBarPanel-ButtonArea-Button">
                            save
                        </button>
                    </div>
                    <div>
                        <button className="mySideBarPanel-ButtonArea-Button"
                            onClick={this.filterResetHandler}>
                            clear
                        </button>
                    </div>
                </div>

                <div className="SideBarPanel-Accordion">
                    Product
                    <Accordion multiple={true} >
                        {this.accordionBars}
                    </Accordion>
                </div>
            </div>
        );
    }

    setSliderInfo = () => {
        this.accordionBars=[];

        for(let key in this.state.items){
            
            let sliders= [];
            for(let key_item in this.state.items[key]){
                let min=this.state.items[key][key_item].min;
                let max=this.state.items[key][key_item].max;
                let value=this.state.items[key][key_item].value;
                let step=this.state.items[key][key_item].step;
                

                sliders.push(
                    <div className="mySliderTitles">
                        <span>
                            {/* <i className="pi pi-sort"></i>   */}
                            <img src={transferImg} alt="transfericon" height="15"/>
                        </span>
                        <span className="mySliderTitles">
                            {this.state.items[key][key_item].title+
                                ((this.state.items[key][key_item].unit)?'('+this.state.items[key][key_item].unit+')':'')
                            }
                        </span>
                    </div>
                    
                );  
                sliders.push(
                <div className="mySliderBox">
                    <div className="mySliderValueLeftBox">
                        <InputText keyfilter="num"
                            value={this.state.items[key][key_item].value[0]}
                            onChange={(event) => this.sliderTextChangeHandler(event,key,key_item,0)}
                            className="mySliderTextValues"
                            onBlur={(event)=> this.sliderTextBlurHandler(event.target.value, key, key_item,0)}
                            style={{fontSize: '12px', fontWeight: 'bold'}}
                            />
                        {/* <Input 
                            value={value[0]}
                            margin="dense"
                            onchange={(event) => this.sliderTextChangeHandler(event,key,key_item,0)}
                            inputProps={{
                                min: min,
                                max: max,
                                type: 'number'
                            }}
                        ></Input> */}
                    </div>

                    {/* <div>
                        <Slider 
                            key={key_item}
                            range={true} 
                            value={value}
                            min={(min)?(min):0}
                            max={max}
                            onChange={(event) => this.slideValueChangeHandler(event, key, key_item)}
                            onSlideEnd={event => this.slideEndHandler(event,key,key_item)}
                            className="mySlider"
                        ></Slider>
                    </div> */}
                    <div>
                        <RangeSlider 
                            value={value}
                            min={min}
                            max={max}
                            step={step}
                            handleChange={(value, newvalue) => this.slideValueChangeHandler(value,newvalue,key, key_item)}
                            handleBlur={() => this.slideEndHandler(key, key_item)}
                        ></RangeSlider>
                    </div>
                    <div className="mySliderValueRightBox">
                        <InputText keyfilter="num" 
                            value={this.state.items[key][key_item].value[1]}
                            onChange={(event) => this.sliderTextChangeHandler(event,key,key_item,1)}
                            className="mySliderTextValues"
                            onBlur={(event)=> this.sliderTextBlurHandler(event.target.value, key, key_item,1)}
                            style={{fontSize:'12px', fontWeight: 'bold'}}
                            />
                    </div>

                </div>);
            }
            this.accordionBars.push(<AccordionTab header={key.replace('_',' ')} key={key} 
                contentClassName="myAccordionContent" headerClassName="myAccordionHeader">
                {sliders}
                </AccordionTab>);
        }
    }
    
    // slideValueChangeHandler = (event, accid, innerid) => {
    //     let changedItem = this.state.items[accid][innerid];
    //     changedItem.value = event.value;

    //     let newItem = {};  
    //     newItem[accid]={};
    //     newItem[accid][innerid]=changedItem;
    //     console.log(event);
    //     this.setState({items: newItem});
    // }

    slideValueChangeHandler = (value, newvalue, accid, innerid) => {
        let changedItem = this.state.items[accid][innerid];
        changedItem.value = newvalue;

        let newItem = {};  
        newItem[accid]={};
        newItem[accid][innerid]=changedItem;
        console.log(newvalue);
        this.setState({items: newItem});
    }

    slideEndHandler = (accid, innerid) => {
        this.props.filterValueChange(this.state.items, accid, innerid);
    }

    sliderTextChangeHandler = (event, accid, innerid, elementindex) =>{
        console.log('text change:');
        let oldevent = this.state.items[accid][innerid].value;
        let newevent = oldevent;

        newevent[elementindex]=event.target.value;

        let min=this.state.items[accid][innerid].min;
        let max=this.state.items[accid][innerid].max;

        if(newevent[0]<min) newevent[0]=min;
        if(newevent[1]>max) newevent[1]=max;
        if(newevent[0]>newevent[1]) 
            if(newevent[1]<=max)newevent[0]=newevent[1];
        else
            if(newevent[0]>=min)newevent[1]=newevent[0];

        this.slideValueChangeHandler(oldevent,newevent, accid, innerid);
    }

    sliderTextBlurHandler = (newvalue, accid, innerid, index) =>{
        let items = this.state.items;
        items[accid][innerid].value[index] = parseFloat(newvalue);
        
        console.log('text blur');
        console.log(items[accid][innerid].value);
        this.props.filterValueChange(items, accid, innerid);    
    }

    filterResetHandler = () => {
        let items = this.state.items;

        for(let key in items){
            for(let key_item in items[key]){
                let curitem = items[key][key_item];
                items[key][key_item].value=[curitem.min,curitem.max];
            }
        }
        
        this.props.filterClear(items);
        this.setState({items: items});
    }
    
}

const mapStateToProps = (state) => ({
    items: state.filter.sideitems
})

const mapDispatchToProps = dispatch => ({
    filterValueChange: (items, accid, innerid) => actions.filterValueChange(items, accid, innerid)(dispatch),
    filterClear: (items) => actions.filterReset(items)(dispatch),

})

export default connect(mapStateToProps, mapDispatchToProps)(SideTool)

