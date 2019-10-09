import React, { Component } from 'react'
import landingImg from '../images/landingImage.jpg';
import tweets from '../tweetData';

export default class LandingComponent extends Component {
    constructor() {
        super();
        this.state = {
            tweetsOnScreen: [],
        }
        this.addTweets = this.addTweets.bind(this);
        this.removeTweets = this.removeTweets.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.tweets = this.shuffleTweets(tweets);
        setTimeout(this.addTweets, 2000);
    }

    componentDidUpdate() {
        if (this.state.tweetsOnScreen.length === 5) {
            this.tweetRemove = setTimeout(this.removeTweets, 5000);
        }
    }


    addTweets() {
        this.setState({ tweetsOnScreen: [] })
        const tweetsToDisplay = (this.tweets.count < 5 && this.tweets % 5 !== 0) ? this.tweets.count % 5 : 5;
        for (let i = 0; i < tweetsToDisplay; i++) {
            const tweetToAdd = this.tweets.pop();
            setTimeout(() => {
                this.setState((prevState) => {
                    return { tweetsOnScreen: [...prevState.tweetsOnScreen, tweetToAdd] };
                });
            }, 400 * i)
        }
        if (this.tweets.length === 0) {
            this.tweets = this.shuffleTweets(tweets);
        }
    }

    removeTweets() {
        let tweets = document.getElementsByClassName('tweet');
        for (let i = 0; i < tweets.length; i++) {
            this.timeout = setTimeout(() => {
                if (tweets[i]) { tweets[i].classList.toggle('remove'); }
            }, 400 * i)
        }
        setTimeout(this.addTweets, 4000);
    }

    componentWillUnmount() {
        this.timeout = null;
    }

    shuffleTweets(arr) {
        arr = arr.slice(0)
        let index = arr.length - 1;
        let temp, randIndex;
        while (index--) {
            randIndex = Math.floor(Math.random() * index);

            temp = arr[index];
            arr[index] = arr[randIndex];
            arr[randIndex] = temp;
        }
        return arr;
    }

    render() {
        return (
            <header className="main-header">
                <div className="phone-image">
                    <img src={landingImg} alt="phone" className="phone" />
                </div>
                <div className="tweets">
                    <ul>
                        {this.state.tweetsOnScreen.map((obj, i) => {
                            return (
                                <li className="tweet" key={i}>
                                    <div className="tweet-content">
                                        {obj.tweet}
                                    </div>
                                    <div className="tweet-user">
                                        {obj.user}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </header>
        )
    }
}
