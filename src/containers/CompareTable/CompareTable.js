import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ScrollPanel} from 'primereact/scrollpanel'

import './CompareTable.css';
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '500px',   
        height: '555px'
    },
    TableBox: {
        display:'flex',
        flexDirection: 'column',
        marginLeft: '20px'
    },
    PropsCol_Main: {

    },
    Props_p: {
        margin: 0,
        marginLeft: '10px',
        height: '20px',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    PropsCol_Img: {
        minHeight:120,
        width: '220px',
        minWidth: '220px',
        textAlign: 'center',
        border: '1px solid #a6a6a6',
        borderBottom: '0',
        borderLeft: '0',
        // margin: '-1px -1px -1px 0'
    },
    PropsCol_Spec: {
        fontSize: '14px',
        fontWeight: 'bold',
        width: '220px',
        minWidth: '220px',
        borderBottom: '1px solid #a6a6a6',
        borderTop: '1px solid #a6a6a6',
        borderRight: '1px solid #a6a6a6',
        display: 'flex',
        alignItems: 'center',
    },
    PropsCol_Norm: {
        fontSize: '13px',
        minWidth: '220px',
        backgroundColor: '#f2f2f2',
        fontWeight: '500',
        borderRight: '1px solid #a6a6a6',
        alignItems: 'center',
        display: 'flex'
        // margin: '-1px -1px -1px 0'
    },
    Row_Img:{
        display: 'flex',
        flexDirection: 'row',
    },
    Row_Norm:{
        display: 'flex',
        flexDirection: 'row',
        height:'24px',
        fontSize: '13px',
        fontWeight: '500',
    }, 
    Row_Spec:{
        display: 'flex',
        flexDirection: 'row',
        height: '30px',
    },
    ValsCol_xs4: {
        display: 'flex',
        alignItems: 'center',
        // textAlign: 'center',
        width: '220px',
        minWidth: '220px',
        border: '1px solid #a6a6a6',
        borderBottom: '0',
        borderTop: '1px solid #f2f2f2',
        borderLeft: '0',
        // margin: '-1px -1px 0 0'
    },
    ValsCol_xs4_p: {
        margin:'auto',
    },
    ValsCol_xs4dived: {
        width: '220px',
        borderRight: '1px solid #a6a6a6',
    },
    ValsCol_xs1_label: {
        backgroundColor: '#f2f2f2',
        width: '55px',
        alignItems: 'center',
        textAlign: 'center',
    },
    ValsCol_xs1_value: {
        width: '55px',
        alignItems: 'center',
        textAlign: 'center',
    },
    ValsCol_xs1_p: {
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '13px',
        height: '20px',
        margin: 'auto',
    },
  }));

const CompareTable = (props) => {
    console.log(props.productList);
    // cant get productList yet
    const base_url='http://localhost:8080/res/product?productlocation=';
    const classes = useStyles();

    
    if(!props.productList || props.productList.length<1)
        return (
            <Redirect to='/shopping'></Redirect>
        );


    let properties = [];
    let products_main=[];
    let img_row=[];
    let comparedProductId = props.comparedProductId;

    // for reuse
    if(props.detailPid)
        comparedProductId=[props.detailPid];

    // img start ========================
    img_row.push(
        <div style={{minWidth: '220px', borderRight:'1px solid #a6a6a6'}}>
            {}    
        </div>
    );
    console.log(comparedProductId)
    for(let pid of comparedProductId){
        let cur_product = props.productList.find(prod => prod.productid === pid);
        
        img_row.push(
            <div className={classes.PropsCol_Img}>
                <img src={base_url+cur_product.imagelocation} height='120' width='140'/>    
            </div>
        );
    }
    properties.push(
        <div className={classes.Row_Img}>
            {img_row}
        </div>
    )
    // image end ============

    // product
    for(let key in props.productCompareProp){
        let cur_row = props.productCompareProp[key];
        let cur_row_page = [];
        let cur_row_spec = [];

        cur_row_spec.push(
            <div className={classes.PropsCol_Spec}>
                <p className={classes.Props_p}>
                    {key}
                </p>
            </div>
        );

        for(let pid of comparedProductId){
            cur_row_spec.push(
                <div className={classes.PropsCol_Spec}>
                    {' '}
                </div>
            );
        }
        properties.push(
            <div className={classes.Row_Spec}>
                {cur_row_spec}
            </div>
        );

        // items in value
        for(let key_item in cur_row){
            cur_row_page=[];
            cur_row_page.push(
                <div className={classes.PropsCol_Norm}>
                    <p className={classes.Props_p}>
                        {cur_row[key_item].display}
                    </p>
                </div>
            );

            for(let pid of comparedProductId){
                let cur_product = props.productList.find(prod => prod.productid === pid);

                if(!cur_product) {console.log('product not found error!!!'); continue;}

                if(!cur_row[key_item].range){
                    cur_row_page.push(
                        <div className={classes.ValsCol_xs4}>
                            <p className={classes.ValsCol_xs4_p}>{cur_product[cur_row[key_item].id]}</p>
                        </div>
                    ); 
                } else {
                    let cur_row_page_tmp = [];
                    cur_row_page_tmp.push(
                        <div className={classes.ValsCol_xs1_label +' '+ classes.Row_Norm}>
                            <p className={classes.ValsCol_xs1_p}>min</p>    
                        </div>);
                    cur_row_page_tmp.push(
                        <div className={classes.ValsCol_xs1_value +' '+ classes.Row_Norm}>
                            <p className={classes.ValsCol_xs1_p}>{cur_product[cur_row[key_item].id+'min']}</p>
                        </div>);
                    cur_row_page_tmp.push(
                        <div className={classes.ValsCol_xs1_label +' '+ classes.Row_Norm}>
                            <p className={classes.ValsCol_xs1_p}>max</p>
                        </div>);
                    cur_row_page_tmp.push(
                        <div className={classes.ValsCol_xs1_value +' '+ classes.Row_Norm}>
                            <p className={classes.ValsCol_xs1_p}>{cur_product[cur_row[key_item].id+'max']}</p>    
                        </div>
                    );
                    cur_row_page.push(
                        <div className={classes.ValsCol_xs4dived +' '+ classes.Row_Norm}>
                            {cur_row_page_tmp}
                        </div>
                    )
                }
            }

            properties.push(
                <div className={classes.Row_Norm}>
                    {cur_row_page}
                </div>
            );
        }
    }


    return (
        <ScrollPanel className={classes.root}>
            <div className={classes.TableBox}>
                {properties}
            </div>
        </ScrollPanel>
    );
}

const mapStateToProps = (state) => ({
    productCompareProp: state.product.productCompareProp,
    comparedProductId: state.product.comparedProductId,
    productList: state.product.productList,

})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareTable)
