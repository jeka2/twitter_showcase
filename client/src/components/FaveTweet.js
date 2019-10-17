import React, { Component } from 'react';
import TweetCard from './TweetCard';
import TweetRender from './TweetRender';

export default class FaveTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            cardFlipped: null,
            cardEngaged: null
        }
        this.cardFlip = this.cardFlip.bind(this);
        this.cardFlipOnUrl = this.cardFlipOnUrl.bind(this);
        this.resetCardFlip = this.resetCardFlip.bind(this);
    }

    cardFlip(cardNumber) {
        this.setState({ cardEngaged: cardNumber });
    }

    cardFlipOnUrl() {
        this.setState({ cardFlipped: this.state.cardEngaged })
    }

    resetCardFlip() {
        this.setState({ cardFlipped: null, cardEngaged: null })
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
        const cards = [0, 1, 2, 3, 4];
        return (
            <>
                {this.state.userInfo.length > 0 ? (
                    <div className="fave-twitters">
                        {cards.map(num => {
                            return (
                                <TweetCard key={num}
                                    cardFlipOnUrl={this.cardFlipOnUrl}
                                    cardFlip={this.cardFlip}
                                    resetCardFlip={this.resetCardFlip}
                                    cardEngaged={this.state.cardEngaged}
                                    cardFlipped={this.state.cardFlipped}
                                    userInfo={this.state.userInfo[num]}
                                    number={num} />
                            )
                        })}
                    </div>) : 'loading'}
            </>
        )
    }
}

