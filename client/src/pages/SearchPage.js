import React, { Component } from 'react';
import TweetRender from '../components/TweetRender';

export default class SearchPage extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            type: '',
            tweets: []
        }
        this.getTweetsFromSearchField = this.getTweetsFromSearchField.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTypeFromDom = this.getTypeFromDom.bind(this);
        this.makeQuery = this.makeQuery.bind(this); this.containerHeightEventListen.bind(this);

        this.keyPressTimeOut = null;
    }

    setRequestDelay() {
        if (this.keyPressTimeOut) { clearTimeout(this.keyPressTimeOut); }

        // the request will be made if no keystroke has been made in the 
        // last half of a second
        this.keyPressTimeOut = setTimeout(this.makeQuery, 500)
    }

    makeQuery() {
        this.keyPressTimeOut = null;
        let type = this.state.type;
        let value = this.state.value;
        fetch(`http://localhost:5000/testAPI/?type=${type}&value=${value}`)
            .then(res => res.json()).then(tweetsCollection => {
                this.setState({ tweets: [tweetsCollection] })
            });
    }

    getTypeFromDom(typeIndex = 0) {
        const searchType = document.getElementsByClassName('search-type')[0][typeIndex].innerHTML;
        this.setState({ type: searchType });
    }

    componentDidMount() {
        this.getTypeFromDom();
    }

    containerHeightEventListen() {
        let tweetNodes = this.tweetNodes;

        // preliminary size check
        resizeOnOverflow();
        window.onresize = function () {
            resizeOnOverflow();
        }

        function resizeOnOverflow() {
            let heights = [];
            for (let i = 0; i < tweetNodes.length; i++) {
                const imageHeight = tweetNodes[i].childNodes[0].clientHeight;
                const textHeight = (tweetNodes[i].childNodes[1].childNodes[0].clientHeight);
                const contentHeight = imageHeight + textHeight;

                heights.push(contentHeight);
            }
            heights.forEach((num, i) => {
                if (num <= 120) {
                    tweetNodes[i].style.height = '120px';
                }
                else {
                    tweetNodes[i].style.height = (num + 10) + 'px';
                }
            })
        }
    }

    componentDidUpdate() {
        this.tweetNodes = document.getElementsByClassName('display-tweet');
        this.containerHeightEventListen();
    }

    handleChange(e) {
        e.persist();
        const index = e.target.selectedIndex;
        this.getTypeFromDom(index);
    }

    getTweetsFromSearchField(e) {
        e.persist();
        const queryValue = e.target.value;
        this.setState({ value: queryValue }, this.setRequestDelay)
    }


    render() {
        return (
            <div className="search-page">
                <ul className="tweet-box">
                    <TweetRender tweets={this.state.tweets[0]} />
                </ul>
                <div className="search-form">
                    <input onChange={this.getTweetsFromSearchField} className="search-field" type="text" />
                    <select selected="selected" name="type" id="type" className="search-type" onChange={this.handleChange}>
                        <option value="User">User</option>
                        <option value="Tweet">Tweet</option>
                    </select>
                </div>
            </div>
        )
    }
}
