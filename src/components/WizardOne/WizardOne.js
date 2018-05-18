import React, { Component } from 'react';
import './WizardOne.css';
import { connect } from 'react-redux';
import Topbar from '../Topbar/Topbar';
import { Link } from 'react-router-dom';
import { updateName, updateAddress, updateCity, updateState, updateZip, cancel } from '../../Redux/Reducer';

class WizardOne extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            description: this.props.description,
            address: this.props.address,
            city: this.props.city,
            state: this.props.state,
            zip: this.props.zip
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }

    render() {
        const { updateName, updateAddress, updateCity, updateState, updateZip, cancel } = this.props
        return (
            <div>
                <Topbar />
                <div className='wizOne'>
                    <div className='wizOne-left'></div>

                    <div className='wizOne-middle'>

                        <div className="wizOne-top">
                            <div className='wizOne-title'>Add New Listing</div>
                            <Link to="/home"><div className="cancel" onClick={() => {
                                cancel()
                                this.props.history.push('/home')
                            }}>Cancel</div></Link>
                        </div>

                        <div className="name-location">

                            <div className="name-info">
                                <div>Property Name</div>
                                <input type="text"  name='name' className="name-input" value={this.state.name} onChange={e => this.handleChange(e)} />
                            </div>
                            <div className="address-info">
                                <div>Address</div>
                                <input className="address-input" name='address' type="text" value={this.state.address} onChange={e => this.handleChange(e)} />
                            </div>

                            <div className="state-info">

                                <div className="part1">
                                    <div>City</div>
                                    <input className="city-input" name='city' type="text" value={this.state.city} onChange={e => this.handleChange(e)} />
                                </div>

                                <div className="part2">
                                    <div>State</div>
                                    <input className="state-input" name='state' type="text" value={this.state.state} onChange={e => this.handleChange(e)} />
                                </div>
                                <div className="part3">
                                    <div>Zip</div>
                                    <input className="zip-input" name='zip' type="text" value={this.state.zip} maxLength="5" onChange={e => this.handleChange(e)} />
                                </div>

                            </div>

                            <div className="wizOne-bottom">
                                <Link to='/wizardTwo'><div className="nextBtn" onClick={() => {
                                    updateName(this.state.name)
                                    updateAddress(this.state.address)
                                    updateCity(this.state.city)
                                    updateState(this.state.state)
                                    updateZip(this.state.zip)
                                    console.log('To wizardTwo')

                                }}>Next Step</div></Link>
                            </div>
                        </div>

                    </div>

                    <div className='wizOne-right'></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        name: state.name,
        address: state.address,
        city: state.city,
        state: state.state,
        zip: state.zip
    }
}

export default connect(mapStateToProps, { updateName, updateAddress, updateCity, updateState, updateZip, cancel })(WizardOne)