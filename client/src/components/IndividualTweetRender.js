import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class IndividualTweetRender extends Component {
    constructor(props) {
        super(props);

        this.findLinksInTweet = this.findLinksInTweet.bind(this);
    }

    findLinksInTweet(tweet) {
        // Separates non-links and links into different array elements
        // So that a link tag can be added where needed
        const instances = (tweet.match(/https?:\/\/t.co\/[^\s]+/g));
        if (!instances) { return [tweet] };

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

    render() {
        const profileImage = this.props.tweet.user.profile_image_url;
        const username = this.props.tweet.user.screen_name;
        const tweet = this.findLinksInTweet(this.props.tweet.full_text);
        return (
            <>
                <div className="user-image">
                    <img src={profileImage} alt={`${profileImage}`} />
                </div>
                <div className="content">
                    <div className="tweet-text">
                        {tweet.map((el, i) => {
                            if (el.includes('https://t.co/') || el.includes('http://t.co/')) {
                                return <a href={el} key={i} target='_blank'>{el}</a>
                            }
                            else {
                                return <span key={i}>{el}</span>
                            }
                        })}
                    </div>
                    <div className="tweet-user">
                        - @{username}
                    </div>
                </div>
            </>
        )
    }
}
