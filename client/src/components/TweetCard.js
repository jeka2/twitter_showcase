import React, { Component } from 'react';

export default class TweetCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName: this.props.userInfo.screenName,
            bannerImage: this.props.userInfo.bannerImage,
            profilePicture: this.props.userInfo.profileImage,
            tweet: [],
        }
        this.showTweet = this.showTweet.bind(this);
        this.flipCardToInitialState = this.flipCardToInitialState.bind(this);
        this.linkEngaged = this.linkEngaged.bind(this);
        this.flipCardOnUrlClick = this.flipCardOnUrlClick.bind(this);
    }

    showTweet() {
        fetch(`http://localhost:5000/testAPI/getRandomTweet?name=${this.state.screenName}`).then(res => res.json()).then(tweetInfo => {
            let tweet = tweetInfo.full_text;
            const imageUrl = 'https://t.co/';
            if (tweet.includes(imageUrl)) {
                tweet = this.findLinksInTweet(tweet);
            }
            else { tweet = [tweet] }
            this.setState({ tweet })
        });
        if (!this.card.classList.contains('flip')) {
            this.card.classList.add('flip');
            this.card.classList.add('animation');
            this.card.addEventListener('mouseleave', this.flipCardToInitialState);
        }
    }

    findLinksInTweet(tweet) {
        const instances = (tweet.match(/https:\/\/t.co\/[^\s]+/g));
        let tweetArr = [];
        instances.forEach((el, i) => {
            if (i === instances.length - 1) {
                const arr = tweet.split(el);
                arr[1] ? tweetArr.push(arr[0], el, arr[1]) : tweetArr.push(arr[0], el);
            }
            else if (tweetArr.length !== 0) {
                const arr = tweet.split(el);
                tweetArr.push(arr[0], el);
                tweet = arr[1];
            }
            else {
                tweetArr.push(tweet.split(el)[0], el);
                tweet = tweet.split(el)[1];
            }
        })
        return tweetArr;
    }

    flipCardToInitialState() {
        this.card.classList.add('animation');
        this.card.classList.remove('flip');

        this.card.removeEventListener('mouseleave', this.flipCardToInitialState);
        this.card.addEventListener('transitionend', () => {
            this.card.classList.remove('animation');
        });
    }

    flipCardOnUrlClick() {
        this.props.cardFlipOnUrl();
    }

    componentDidMount() {
        const cardNumber = `.card-${this.props.number}`
        this.card = document.querySelector(cardNumber);
    }

    linkEngaged() {
        this.props.cardFlip(this.props.number);
        this.card.removeEventListener('mouseleave', this.flipCardToInitialState);
        this.card.addEventListener('mouseenter', () => {
            this.card.addEventListener('mouseleave', this.flipCardToInitialState);
        })
    }

    componentDidUpdate() {
        // If the hovered-on card is not the one currently flipped
        if (this.props.cardFlipped) {
            if (this.props.number === this.props.cardFlipped) {
                this.flipCardToInitialState();
                this.props.resetCardFlip();
            }
        }
        else if (this.props.cardEngaged) {
            if (this.props.number !== this.props.cardEngaged) {
                this.card.addEventListener('mouseenter', this.flipCardOnUrlClick)
            }
        }
    }



    render() {
        const cardNumber = `card card-${this.props.number}`;
        return (
            <div className="container">
                <div className={cardNumber}>
                    <div className="front">
                        <img onError={this.addDefaultImage} src={this.state.bannerImage} alt="banner" className="background" />
                        <img src={this.state.profilePicture} alt="profile-picture" className="profile-picture" />
                        <button onClick={this.showTweet} className="show-tweet-button">
                            Show Tweet
                        </button>
                    </div>
                    <div className="back">
                        <div className="reveal-content">
                            {this.state.tweet.map((el, i) => {
                                if (el.includes('https://t.co/')) {
                                    return <a href={el} key={i} target='_blank' onClick={this.linkEngaged}>{el}</a>
                                }
                                else {
                                    return <span className='tweet-message' key={i}>{el}</span>
                                }
                            })}
                        </div>
                        <button onClick={this.showTweet} className="show-tweet-button">
                            Update Tweet
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

