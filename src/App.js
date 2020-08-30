import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {
  unHandledRejection = (e) => {
    alert(e);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.unHandledRejection);
  }

  componentWillMount() {
    window.removeEventListener('unhandledrejection', this.unHandledRejection);
  }

  render() {
    if (!this.props.initialized) {
      return <div className='preloaderWrapper'><Preloader /></div>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <main className='app-wrapper-content'>

          <Switch>

            <Route exact path='/'
              render={() => <Redirect to='/profile' />} />

            <Route path='/profile/:userId?'
              render={withSuspense(ProfileContainer)} />

            <Route path='/dialogs'
              render={withSuspense(DialogsContainer)} />

            <Route path='/users'
              render={() => <UsersContainer />} />

            <Route path='/login'
              render={() => <Login />} />

            <Route path='*'
              render={() => <div>404 page not found</div>} />

          </Switch>



        </main>
      </div>
    );

  }

}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);