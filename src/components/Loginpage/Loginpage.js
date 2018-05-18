import React, { Component } from 'react';
import './Loginpage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUserId } from '../../Redux/Reducer';

class Loginpage extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    login() {

        let user = {
            username: this.refs.username.value,
            password: this.refs.password.value
        }

        axios.post(`/api/auth/login`, user).then(resp => {
            this.props.updateUserId(resp.data.userid);
        }).catch(err => {
            console.log('failed login:', err);
        });
    }

    register() {

        let newUser = {
            username: this.refs.username.value,
            password: this.refs.password.value
        }

        axios.post(`/api/auth/register`, newUser).then(res => {
            this.props.updateUser(res.data[0].username);
            this.props.updateUserId(res.data[0].userid);
            console.log('successfull added new user');
        })
            .catch(err => {
                console.log('failed register attempt:', err);
            });
    }

    render() {
        return (
            <div className='login'>

                <div className='login-left'></div>

                <div className='login-content'>

                    <div className='content-top'>
                        <div className='login-logo'></div>
                    </div>


                    <div className='content-bottom'>

                        <header className='input-header'>Username</header>
                        <input ref='username' className='login-input' placeholder='type username here..' />

                        <header className='input-header'>Password</header>
                        <input ref='password' className='login-input' type='password' placeholder='type password here..' />

                        <div className='btn-container'>
                            <Link to='/home'><div className='login-btn' onClick={() => this.login()}>Login</div></Link>
                            <Link to='/home'><div className='register-btn' onClick={() => this.register()} >Register</div></Link>
                        </div>

                    </div>


                </div>

                <div className='login-right'></div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { userId } = state;
    return {
        userId
    }
}


export default connect(mapStateToProps, { updateUserId })(Loginpage)