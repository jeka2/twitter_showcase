import React, { Component } from 'react';

export default class TweetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName: this.props.userInfo.screenName,
            bannerImage: this.props.userInfo.bannerImage,
            profilePicture: this.props.userInfo.profileImage,
            tweet: "blah"
        }
        this.showTweet = this.showTweet.bind(this);
    }

    showTweet() {
        const cardNumber = `.card-${this.props.number}`
        let card = document.querySelector(cardNumber);
        card.classList.toggle('flip');
        card.classList.add('animation');
        card.addEventListener('transitionend', () => {
            card.classList.remove('animation');
        }
        );
    }

    render() {
        const cardNumber = `card card-${this.props.number}`;
        return (
            <div className="container">
                <div className={cardNumber}>
                    <div className="front">
                        <img onError={this.addDefaultImage} src={this.state.bannerImage} alt="banner" className="background" />
                        <img src={this.state.profilePicture} alt="profile-picture" className="profile-picture" />
                        <button onClick={this.showTweet} className="show-tweet-button">Show Tweet</button>
                    </div>
                    <div className="back">{this.state.tweet}</div>
                </div>
            </div>
        )
    }
}

