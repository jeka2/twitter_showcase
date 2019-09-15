import React, { Component } from 'react'

export default class TweetRender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: this.props.tweets,
        }
    }
    render() {
        let arr = "";
        if (this.props.tweets && !this.props.tweets['error']) {
            arr = this.props.tweets.map((tweet, index) => {
                return (
                    <li key={index} className="display-tweet">
                        <div className="user-image">
                            <img src={tweet.user.profile_image_url} alt={`${tweet.user.screen_name}`} />
                        </div>
                        <div className="tweet-content">
                            <div className="tweet-text">
                                {tweet.full_text}
                            </div>
                            <div className="tweet-user">
                                @{tweet.user.screen_name}
                            </div>
                        </div>
                    </li>
                )
            })
        }
        return (
            <>
                {arr}
            </>
        )
    }
}
