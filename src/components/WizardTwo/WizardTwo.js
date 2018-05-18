import React, { Component } from 'react';
import './WizardTwo.css';
import Topbar from '../Topbar/Topbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancel, updateImg } from '../../Redux/Reducer';

class WizardTwo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            img: this.props.img
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { cancel, updateImg } = this.props
        return (
            <div>
                <Topbar />
                <div className='wizTwo'>
                    <div className='wizTwo-left'></div>

                    <div className='wizTwo-middle'>

                        <div className="wizTwo-top">
                            <div className='wizTwo-title'>Add New Listing</div>
                            <Link to="/home"><div className="cancel" onClick={() => cancel()}>Cancel</div></Link>
                        </div>

                        <div className="img-location">
                            <div className="img-info">
                                <div>Image URL</div>
                                <input className="img-input" name='img' value={this.state.img} type="text" onChange={e => this.handleChange(e)} />
                            </div>

                            <div className="wizTwo-bottom">
                                <Link to='/wizardThree'><div className="nextBtn" onClick={() => {
                                    updateImg(this.state.img)
                                    console.log('to WizardThree')
                                }}>Next Step</div>
                                </Link>

                                <Link to='/wizardOne'><div className="previousBtn" onClick={() => console.log('back to WizardOne')}>Previous Step</div></Link>
                            </div>
                        </div>

                    </div>

                    <div className='wizTwo-right'></div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { img } = state
    return {
        img
    }
}

export default connect(mapStateToProps, { cancel, updateImg })(WizardTwo)