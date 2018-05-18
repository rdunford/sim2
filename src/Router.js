import React from 'react';
import {Route, Switch} from 'react-router-dom';

import WizardOne from './components/WizardOne/WizardOne'
import WizardTwo from './components/WizardTwo/WizardTwo'
import WizardThree from './components/WizardThree/WizardThree'
import WizardFour from './components/WizardFour/WizardFour'
import WizardFive from './components/WizardFive/WizardFive'
import Loginpage from './components/Loginpage/Loginpage'
import Home from './components/Home/Home'

export default(
    <Switch>
        <Route component={Loginpage} exact path='/'/>
        <Route component={Home}  path='/home'/>
        <Route component={WizardOne}  path='/wizardOne'/>
        <Route component={WizardTwo}  path='/wizardtwo'/>
        <Route component={WizardThree}  path='/wizardthree'/>
        <Route component={WizardFour}  path='/wizardfour'/>
        <Route component={WizardFive}  path='/wizardfive'/>
        {/* <Route component={}  path=''/> */}
    </Switch>
)