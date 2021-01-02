import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import MyPets from './pages/MyPets';

// import Header from './components/Header';

const Routes = () => {
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register-user" component={RegisterUser} />
                <Route exact path="/my-pets" component={MyPets} />
                {/* <Route path="*" component={Erro} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
