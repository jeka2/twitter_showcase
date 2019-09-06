import React, { Component } from 'react'

export default class SearchPage extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            type: '',
            inputBoxResults: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTweetsFromSearchField = this.getTweetsFromSearchField.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTypeFromDom = this.getTypeFromDom.bind(this);
    }

    makeApiRequest(redirect = false) {
        let type = this.state.type;
        let value = this.state.value;
        if (redirect) {
            console.log(type);
            console.log(value);
        }
        else {
            fetch(`http://localhost:5000/testAPI/?type=${type}&value=${value}`)
                .then(res => res.json()).then(myJson => console.log(myJson))
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.makeApiRequest(true);
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
                <div className="search-form">
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.getTweetsFromSearchField} className="searchField" type="text" />
                        <select selected="selected" name="type" id="type" className="search-type" onChange={this.handleChange}>
                            <option value="User">User Blah</option>
                            <option value="Tweet">Tweet Blah</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}
