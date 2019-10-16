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
        this.flip = this.flip.bind(this);
    }

    flip() {
        const cardEngaged = !this.state.cardEngaged;
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

                        <TweetCard flip={this.flip} number={1} userInfo={this.state.userInfo[0]} />
                        <TweetCard flip={this.flip} number={2} userInfo={this.state.userInfo[1]} />


                        <TweetCard flip={this.flip} number={3} userInfo={this.state.userInfo[2]} />
                        <TweetCard flip={this.flip} number={4} userInfo={this.state.userInfo[3]} />

                        <TweetCard flip={this.flip} number={5} userInfo={this.state.userInfo[4]} />

                    </div>) : 'loading'}
            </>
        )
    }
}

