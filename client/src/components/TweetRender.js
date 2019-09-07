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
        if (this.props.tweets && this.props.tweets[0]) {
            console.log(this.props.tweets[0])
        }
        if (this.props.tweets && !this.props.tweets['error']) {
            arr = this.props.tweets.map((tweet, index) => {
                return (
                    <li key={index} id="tweets">
                        <span className="user-image">
                            {tweet.user.profile_image_url}
                        </span>
                        <span className="tweet-content">
                            <div className="tweet-text">
                                {tweet.full_text}
                            </div>
                            <div className="tweet-user">
                                @{tweet.user.screen_name}
                            </div>
                        </span>
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
