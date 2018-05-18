import React, { Component } from 'react';
import './WizardThree.css';
import Topbar from '../Topbar/Topbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancel, updateMonthly, updateDesiredRent, complete } from '../../Redux/Reducer';

class WizardThree extends Component {
    constructor(props) {
        super(props)

        this.state = {
            desiredRent: this.props.desiredRent,
            monthly: this.props.monthly,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }


    render() {
        const { cancel, updateMonthly, updateDesiredRent, complete } = this.props
        return (
            <div>
                <Topbar />
                <div className='wizThree'>
                    <div className='wizThree-left'></div>

                    <div className='wizThree-middle'>

                        <div className="wizThree-top">
                            <div className='wizThree-title'>Add New Listing</div>
                            <Link to="/home"><div className="cancel" onClick={() => cancel()}>Cancel</div></Link>
                        </div>
                        <div>Recommended Rent: ${(this.state.monthly * 1.25)}</div>
                        <div className="rent-location">

                            <div className="rent-info">
                                <div>Monthly Mortage Amount</div>
                                <input type="text" className="rent-input" name='monthly' value={this.state.monthly} onChange={e => this.handleChange(e)} />
                            </div>
                            <div className="rent-info">
                                <div>Monthly Desired Rent</div>
                                <input className="rent-input" name='desiredRent' value={this.state.desiredRent} type="text" onChange={e => this.handleChange(e)} />
                            </div>

                            <div className="wizThree-bottom">
                                <Link to='/home'><div className="complete" onClick={() => {
                                    updateMonthly(this.state.monthly)
                                    updateDesiredRent(this.state.desiredRent)
                                    complete({
                                        name: this.props.name,
                                        address: this.props.address,
                                        city: this.props.city,
                                        state: this.props.state,
                                        zip: this.props.zip,
                                        img: this.props.img,
                                        monthly: this.props.monthly,
                                        desiredRent: this.props.desiredRent,
                                        userId: this.props.userId
                                    })
                                }}>Complete</div></Link>
                                <Link to='/wizardTwo'><div className="previousBtn" onClick={() => console.log('completed the things')}>Previous Step</div></Link>
                            </div>
                        </div>

                    </div>

                    <div className='wizThree-right'></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { name, address, city, zip, img, monthly, desiredRent } = state
    return {
        name,
        address,
        city,
        state: state.state,
        zip,
        img,
        monthly,
        desiredRent,
    }
}


export default connect(mapStateToProps, { cancel, updateMonthly, updateDesiredRent, complete })(WizardThree)