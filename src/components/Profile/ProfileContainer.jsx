import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    getUserProfile,
    getStatus,
    changeStatus,
    savePhoto,
    saveProfileData
} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }

        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount = () => {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <Profile profile={this.props.profile} status={this.props.status}
            changeStatus={this.props.changeStatus}
            savePhoto={this.props.savePhoto}
            saveProfileData={this.props.saveProfileData}
            isOwner={!this.props.match.params.userId} />
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
})


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, changeStatus, savePhoto, saveProfileData }),
    withRouter
)(ProfileContainer);

