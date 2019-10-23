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
        this.makeQuery = this.makeQuery.bind(this);

        this.keyPressTimeOut = null;
    }

    makeApiRequest() {
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

    handleChange(e) {
        e.persist();
        const index = e.target.selectedIndex;
        this.getTypeFromDom(index);
    }

    getTweetsFromSearchField(e) {
        e.persist();
        const queryValue = e.target.value;
        this.setState({ value: queryValue }, this.makeApiRequest)
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
