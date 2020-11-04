import React from 'react';
import { connect } from 'react-redux';

import './UserAvatar.css';
import * as actions from '../../store/actions/Index';
import { OverlayPanel } from 'primereact/overlaypanel';
import User from '../../containers/User';


class Useravatar extends React.Component {
    
    componentDidMount(){
        this.props.getUserInfo();
    }

    clickDivHandler = () => {
        console.log('avatar clicked...')
    }

    render(){
        let avatarURL = this.props.avatarURL;
        if(!avatarURL) avatarURL='avatar_def.png';
        return (
            
            <div>
                <div className="myAvatarLayout" style={{height: this.props.height}}
                // onClick={this.clickDivHandler}>
                    onClick={e=>this.op.toggle(e)}>
                    <div className="myAvatarName">
                        <p className="myAvatarName">{this.props.avatarName}</p>
                        <i className="pi pi-caret-down"></i>
                    </div>
                    <div>
                        <img src={'http://localhost:8080/res/avatar?avatarlocation='+avatarURL} 
                            alt="useravatar" height={parseInt(this.props.height)-10}
                            style={{borderRadius: "50%"}}></img>
                    </div>

                </div>
                <OverlayPanel ref={(el) => this.op = el}
                    className="myPopupOverlay">
                        <User></User>
                </OverlayPanel>
            </div>
        );
    }
    
}


const mapStateToProps = (state) => ({
    avatarURL: state.user.userInfo.avatarlocation,
    avatarName: state.user.userInfo.username,
    
})

const mapDispatchToProps = dispatch => ({
    getUserInfo: () => actions.getUserInfo()(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Useravatar)
