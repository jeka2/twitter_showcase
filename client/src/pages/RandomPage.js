import React, { Component } from 'react';
import FaveTweet from '../components/FaveTweet';

export default class RandomPage extends Component {
    constructor() {
        super();
        this.state = {
            userData: [],
        }
    }
    componentDidMount() {
        let promiseList = [];
        const userArray = ['dog_feelings', 'DRUNKHULK', 'FirstWorldPains', 'Queen_UK', 'elonmusk'];
        userArray.forEach(val => {
            promiseList.push(fetch(`http://localhost:5000/testAPI/getUserInfo?name=${val}`).then(res => { return (res.json()) })
            )
        })
        Promise.all(promiseList).then(val => {
            let infoArray = [];
            for (let i = 0; i < val.length; i++) {
                const profileImage = val[i].user.profile_image_url;
                const bannerImage = val[i].user.profile_banner_url;
                const screenName = val[i].user.screen_name;
                infoArray.push({ screenName, profileImage, bannerImage });
            }

            this.setState(() => {
                return { userData: infoArray }
            })
        })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        let userData = this.state.userData.length > 0 ? this.state.userData : '';
        return (
            <>
                <FaveTweet userInfo={userData} />
            </>
        )
    }
}
