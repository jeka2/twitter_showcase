import React, { Component } from 'react'

export default class IndividualTweetRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: this.props.tweet.user.profile_image_url,
            username: this.props.tweet.user.screen_name,
            tweet: this.findLinksInTweet(this.props.tweet.full_text),
        }
        this.findLinksInTweet = this.findLinksInTweet.bind(this);
    }

    findLinksInTweet(tweet) {
        const instances = (tweet.match(/https:\/\/t.co\/[^\s]+/g));
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
        return (
            <>
                <div className="user-image">
                    <img src={this.state.profileImage} alt={`${this.state.profileImage}`} />
                </div>
                <div className="content">
                    <div className="tweet-text">
                        {this.state.tweet.map((el, i) => {
                            if (el.includes('https://t.co/')) {
                                return <a href={el} key={i} target='_blank'>{el}</a>
                            }
                            else {
                                return <span className='tweet-message' key={i}>{el}</span>
                            }
                        })}
                    </div>
                    <div className="tweet-user">
                        - @{this.state.username}
                    </div>
                </div>
            </>
        )
    }
}
