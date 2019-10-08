import React, { Component } from 'react';

export default class TweetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName: this.props.userInfo.screenName,
            bannerImage: this.props.userInfo.bannerImage,
            profilePicture: this.props.userInfo.profileImage
        }
        this.showTweet = this.showTweet.bind(this);
    }

    showTweet() {
        console.log(this.state.screenName);
    }

    render() {
        return (
            <>
                <div className="card">
                    <img onError={this.addDefaultImage} src={this.state.bannerImage} alt="banner" className="background" />
                    <div style={{ position: 'relative' }}>
                        <img src={this.state.profilePicture} alt="profile-picture" className="profile-picture" />
                        <button onClick={this.showTweet} className="show-tweet-button">Show Tweet</button>
                    </div>
                </div>
            </>
        )
    }
}

