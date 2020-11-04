import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/Index'
import { updateObject } from '../../store/utility';
import './Auth.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

class Auth extends Component{

    state = {
        controls:{
            username: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'User Name',
                    icon: 'pi pi-user',
                    class: 'inputArea'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                type: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password',
                    icon: 'pi pi-lock',
                    class: 'inputArea'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Email: xxx@xxx.com',
                    icon: 'pi pi-envelope',
                    class: 'inputArea'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            }
        },
        logmodelist: ['login','signup'],
        authmodeinputs: {
            login: ['username','password'],
            signup: ['username','password','email']
        },
        authmodehandler: {
            login: this.loginHandler,
            signup: this.signupHandler
        },
        authmode:'login'
    }

    render() {
        // console.log(this.props.token);

        const formElementsArray=[];
        for(let key of this.state.authmodeinputs[this.state.authmode]){
            formElementsArray.push({
                key:key,
                property: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(element => (
            <div className="input-group inputDiv" key={element.key}>
                <InputText
                    key={element.key}
                    type={element.property.config.type}
                    value={element.property.value}
                    placeholder={element.property.config.placeholder}
                    onChange={(event)=>this.inputChangeHandler(event,element.key)}
                    required={element.property.validation.required}
                    className={element.property.config.class}
                />
                {/* <span className="input-group-addon">
                    <i className={element.property.config.icon+" Inputicon"}></i>
                </span>  */}
                <i className={element.property.config.icon+" Inputicon"}></i>
            </div>
        ));

        let note='';
        console.log(this.props.logStatus);
        switch (this.props.logStatus) {
            case 'init':
                if(this.state.authmode === 'login')
                    note = (<div>
                        <span>please input username and password</span>
                    </div>);
                else
                    note = (<div>
                        <span>please fill the information below to create a new account</span>
                    </div>);
                break;
            case 'process':
                note = (<div>
                    <i className="pi pi-spin pi-spinner"></i>
                    <span>verifying...</span> 
                </div>);
                break;
            case 'fail':
                note = (<div>
                    <span style={{color: 'red'}}>wrong username or password, please input again...</span>
                </div>);
                break;
            case 'fail_signup':
                note = (
                    <div>
                        <span style={{color: 'red'}}>user name already in use, please input again...</span>
                    </div>
                );
                break;
            default:
                break;
        }
        
        return (
            <div className="Auth">
                <div style={{color: 'lightslategray',marginBottom: '10px'}}>
                    {note}
                    {/* {this.state.notemode} */}
                </div>
                <div className="form">{form}</div>
                <div className="ButtonArea">    
                    <Button label={this.state.authmode} 
                        onClick={this.loginHandler} 
                        className="p-button-raised p-button-rounded"/>
                    <p></p>
                    <Button label={'to '+((this.state.authmode === 'login')?'sign up':'log in')} 
                        onClick={this.authModeChangeHandler} />
                </div>
            </div>
        );
    }

    inputChangeHandler = (event, elementId) => {        
        let updatedstate = this.state;
        updatedstate.controls[elementId].value=event.target.value;
        
        this.setState(updatedstate);
    }
    // inputChangedHandler = ( event, controlName ) => {
    //     // console.log(...this.state.controls);
    //       const updatedControls = {
    //           ...this.state.controls,
    //           [controlName]: {
    //               ...this.state.controls[controlName],
    //               value: event.target.value,
    //               valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
    //               touched: true
    //           }
    //       };
    //       console.log(updatedControls);
    //       console.log(this.state);
    //       this.setState( { controls: updatedControls } );
  
    //   }
    
    loginHandler = (event) => {
        event.preventDefault();
        console.log('submit: '+this.state.controls.username.value+ ', '+this.state.controls.password.value);
        this.props.login(this.state.controls.username.value,this.state.controls.password.value,this.state.authmode);
    }
    
    authModeChangeHandler = (event) => {
        event.preventDefault();
        console.log('switch authmode');

        this.props.logout();
        this.setState(updateObject(this.state,
            {authmode: this.state.authmode==='login'? 'signup': 'login'}
        ));
    }

}


const mapStateToProps = (state) => ({
    logStatus: state.auth.logStatus,
    userId: state.auth.userId,
    token: state.auth.token,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    // login: (uname,pwd)=> dispatch({type:'auth_login_start', uname, pwd}),
    login: (uname,pwd,authmode)=> actions.authLogin(uname,pwd,authmode)(dispatch),
    logout: () => dispatch({type: 'auth_logout'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
