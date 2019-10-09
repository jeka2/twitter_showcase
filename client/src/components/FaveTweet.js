import React, { Component } from 'react';
import TweetCard from './TweetCard';
import TweetRender from './TweetRender';

export default class FaveTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: []
        }
    }

    componentDidUpdate() {
        // The state will only update once to avoid a feedback loop
        if (this.props.userInfo.length > 0) {
            this.setState((prevState) => {
                if (prevState.userInfo.length === 0) {
                    return {
                        userInfo: this.props.userInfo
                    }
                }
            });
        }
    }

    render() {

        return (
            <>
                {this.state.userInfo.length > 0 ? (
                    <div className="fave-twitters">

                        <TweetCard number={1} userInfo={this.state.userInfo[0]} />
                        <TweetCard number={2} userInfo={this.state.userInfo[1]} />


                        <TweetCard number={3} userInfo={this.state.userInfo[2]} />
                        <TweetCard number={4} userInfo={this.state.userInfo[3]} />

                        <TweetCard number={5} userInfo={this.state.userInfo[4]} />

                    </div>) : 'loading'}
            </>
        )
    }
}

