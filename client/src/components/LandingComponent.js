import React, { Component } from 'react'
import landingImg from '../images/landingImage.jpg';
import tweets from '../tweetData';

export default class LandingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetsOnScreen: []
        }
        console.log(tweets)
        this.tweets = this.shuffleTweets(tweets);
        console.log(this.tweets);
        this.populateTweets = this.populateTweets.bind(this);
        this.refreshTweets = this.refreshTweets.bind(this);
        this.refreshTweets();

    }

    refreshTweets() {
        console.log(this.tweets);
        let tweetBox = document.getElementsByClassName('tweets')[0];
        let tweetCollector = [];
        for (let i = 0; i < 5; i++) {
            tweetCollector.push(this.tweets.pop());
        }

    }

    shuffleTweets(arr) {
        console.log(arr)
        let index = arr.length - 1;
        let temp, randIndex;
        while (index !== 0) {
            randIndex = Math.floor(Math.random() * index);

            temp = arr[index];
            arr[index] = arr[randIndex];
            arr[randIndex] = temp;
            index--;
        }
        console.log(arr)
        return arr
    }

    populateTweets() {
        let tweetBox = document.getElementsByClassName('tweets')[0];
        let imageHeight = document.getElementsByClassName('phone')[0].clientHeight;
        let tweetsToShow = 5;
        let individualTweetHeight = imageHeight / tweetsToShow;


    }

    render() {
        return (
            <header className="main-header">
                <span className="landing-image">
                    <span className="image-container"><img src={landingImg} alt="phone" className="phone" /></span>
                </span>
                <span className="tweets">
                    {this.state.tweetsOnScreen.map((val, i) => {
                        return <div key={i}>
                            <div className="user">
                                {val.user}
                            </div>
                            <div className="tweet-content">
                                {val.tweet}
                            </div>
                        </div>

                    })}
                </span>
            </header>
        )
    }
}

