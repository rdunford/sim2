import React, { Component } from 'react';
import './Home.css';
import Topbar from '../Topbar/Topbar';
import { Link } from 'react-router-dom';
import { getProperties, getPropertiesByRent, removeProperty } from '../../Redux/Reducer';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rentFilter: 0,
            hasProperties: false
        }
    }

    componentDidMount() {
        this.props.getProperties()
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({
            rentFilter: value
        })
    }

    resetProperties(){
        this.props.getProperties()
        this.setState({
            rentFilter: 0
        })
    }

    render() {
        console.log('properties in the home.js: ', this.props.properties)
        if (!this.props.properties) {
            this.setState({
                hasProperties: true
            })
        }
        let userProperties = this.props.properties.map((prop, index) => {
            return (
                <div className="propertyContainer" key={index}>
                    <img className="propImg" src={prop.img} alt="property" />
                    <div className="propertyInfo">
                        <div className="propinfo">Property Name: {prop.name}</div>
                        <div className="propinfo">Address: {prop.address}</div>
                        <div className="propinfo">City: {prop.city}</div>
                        <div className="propinfo">State: {prop.state}</div>
                        <div className="propinfo">Zip: {prop.zip}</div>
                        <div className="propinfo">Desired Rent: ${prop.desiredrent}</div>
                        <div className="propinfo">Monthly Cost: ${prop.monthly}</div>
                    </div>
                    <div className="removeProp" onClick={() => this.props.removeProperty(prop.propid)}>X</div>
                </div>
            )
        })
        console.log('userId: ', this.props.userId)
        return (
            <div>
                <Topbar />
                <div className='home'>
                    <div className='home-left'></div>

                    <div className='home-middle'>

                        <div className="middle-top">
                            <div className='middle-title'>Dashboard</div>
                            <Link to="/wizardOne"><div className="addNew" onClick={() => console.log('To wizardOne')} >Add New Property</div></Link>
                        </div>
                            <div className='reset-btn' onClick={() => this.resetProperties()}>reset</div>

                        <div className="content-title">
                        <div className='listings-title'>Home Listings</div>
                        <input name='rentFilter' className='rentInput' value={this.state.rentFilter || ''} onChange={(e) => this.handleChange(e)}/>
                        <div className='filter' onClick={() => this.props.getPropertiesByRent(this.state.rentFilter)} >Filter by Rent</div>
                        </div>

                        {this.state.hasProperties ?
                            <div className="content-listings">No properties listed yet.</div>
                            :
                            userProperties
                        }

                    </div>

                    <div className='home-right'></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { properties, userId } = state;
    return {
        properties,
        userId
    }
}

// export default Home;
export default connect(mapStateToProps, { getProperties, removeProperty, getPropertiesByRent })(Home)