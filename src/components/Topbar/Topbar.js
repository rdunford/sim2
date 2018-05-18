import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/header_logo.png'
import './Topbar.css'
import { connect } from 'react-redux';
import { signout } from '../../Redux/Reducer'

class Topbar extends Component {
 
    render() {
        return (
            <div className='topbar'>

                <div className="nav-left"></div>

                <div className='nav-center'>
                    <Link to='/home'><img className='nav-logo' src={logo} alt='' /></Link>
                    <div className='nav-title'>Houser</div>
                </div>

                <div className="nav-right">
                    <Link to='/'><div className='nav-logout' onClick={() => signout()}>Logout</div></Link>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    let { user, userid } = state
    return {
        user,
        userid
    }
}

export default connect(mapStateToProps, { signout })(Topbar)