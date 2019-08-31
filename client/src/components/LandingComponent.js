import React, { Component } from 'react'
import landingImg from '../images/landingImage.jpg';
import tweets from '../tweetData';

export default class LandingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRender: true,
            allTweets: tweets.slice(0),
            tweetsOnScreen: []
        }
        this.moveImage = this.moveImage.bind(this)
        setTimeout(this.moveImage, 2000);
    }


    moveImage = () => {
        let imageTransition = document.getElementsByClassName('landing-image');
        imageTransition[0].addEventListener('transitionend', () => {
            this.addTweetSection();
        })
        this.setState(prevState => {
            return { initialRender: !prevState, }
        })
    }

    addTweetSection() {
        const tweetsPerView = 5;
        const tweetContainerHeight = document.getElementsByClassName('move-image')[0].offsetHeight;
        const individualTweetHeight = Math.floor(tweetContainerHeight / tweetsPerView);
        let data = document.getElementsByClassName('test');
        let tweetSection = document.createElement('span');

        tweetSection.classList.add('tweets')
        data[0].appendChild(tweetSection);

        this.populateTweets(tweetSection, individualTweetHeight);
    }

    populateTweets(tweetSection, individualTweetHeight) {
        addIndividualTweet = addIndividualTweet.bind(this)

        let d = setInterval(addIndividualTweet, 1000, tweetSection, individualTweetHeight);

        function addIndividualTweet(tweetWindow, height) {
            let tweet = document.createElement('div');
            tweet.classList.add('tweet')
            tweet.style.height = height + 'px'
            tweet.innerHTML = 'lsdjflksdjflkjskldfjlksdjklf';

            tweetWindow.appendChild(tweet);

            if (tweetWindow.childElementCount === 5) {
                clearInterval(d);
                this.destroyTweets();
            }
            console.log(tweetWindow.childElementCount) //works
        }

    }

    destroyTweets() {
        let destroyInterval = setInterval(destroyIndividualTweet, 1000);

        function destroyIndividualTweet() {

        }
    }


    render() {
        return (
            <div className="landing-container">
                <div className="image-and-messages">
                    <span className={this.state.initialRender ? "landing-image" : "move-image"}>
                        <div className="test">
                            <span><img src={landingImg} alt="twitter-phone" /></span>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

