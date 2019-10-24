import React, { Component } from 'react';
import IndividualTweet from './IndividualTweetRender';

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
                        <IndividualTweet index={index} tweet={tweet} />
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
