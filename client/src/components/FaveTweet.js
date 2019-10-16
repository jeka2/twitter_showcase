import React, { Component } from 'react';
import TweetCard from './TweetCard';
import TweetRender from './TweetRender';

export default class FaveTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            cardEngaged: false
        }
        this.cardToInitialState = this.cardToInitialState.bind(this);
    }

    cardToInitialState() {
        const cardEngaged = true;
        this.setState({ cardEngaged })
    }

    componentDidUpdate() {
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

    componentDidMount() {
        fetch(`http://localhost:5000/testAPI/randomTweetReset`);
    }



    render() {

        return (
            <>
                {this.state.userInfo.length > 0 ? (
                    <div className="fave-twitters">

                        <TweetCard cardToInitialState={this.cardToInitialState} number={1} userInfo={this.state.userInfo[0]} />
                        <TweetCard cardToInitialState={this.cardToInitialState} number={2} userInfo={this.state.userInfo[1]} />


                        <TweetCard cardToInitialState={this.cardToInitialState} number={3} userInfo={this.state.userInfo[2]} />
                        <TweetCard cardToInitialState={this.cardToInitialState} number={4} userInfo={this.state.userInfo[3]} />

                        <TweetCard cardToInitialState={this.cardToInitialState} number={5} userInfo={this.state.userInfo[4]} />

                    </div>) : 'loading'}
            </>
        )
    }
}

