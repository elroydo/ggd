import React, { Component } from 'react';
import { getClimateArticles, getDisasterArticles, getWaterArticles, getLandArticles } from '../Components/Article/NewsAPI';
import { getUserBookmarks } from '../Components/UserProfile/UserAPI';
import ArticleList from '../Components/Article/ArticleList';
import '../Components/Article/news.css';
import Carousel from 'react-bootstrap/Carousel';
import Auth from '../Auth';

class News extends Component {
    //declare states
    state = {
        articlesClimate: [],
        articlesDisaster: [],
        articlesWater: [],
        articlesLand: [],
        userBookmarks: [],
        newsnewsAPIError: "",
        bookmarkAPIError: ""
    };
    //upon loading the component, fetch various articles from the NewsAPI
    async componentDidMount() {
        try {
            const responseClimate = await getClimateArticles();
            const responseDisaster = await getDisasterArticles();
            const responseWater = await getWaterArticles();
            const responseLand = await getLandArticles();
            //set responses to states
            this.setState({
                articlesClimate: responseClimate.articles,
                articlesDisaster: responseDisaster.articles,
                articlesWater: responseWater.articles,
                articlesLand: responseLand.articles,
            });
        } catch (error) {
            this.setState({ newsAPIError: "Could not find any articles" });
        }
        try {
            const responseUserBookmarks = await getUserBookmarks();
            //set response to state
            this.setState({
                userBookmarks: responseUserBookmarks
            });
        } catch (error) {
            this.setState({ bookmarkAPIError: "bookmark fetch error" });
        }
    }

    render() {
        //initialise specific variables based on the states
        const { articlesClimate, articlesDisaster, articlesWater, articlesLand, newsAPIError, userBookmarks } = this.state;
        return (
            <div className="main">
                <h2 className="page-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', paddingTop: 30 }}> What is happening around the world? </h2>
                {!Auth.isAuthenticated() &&
                    <div className="bookmark-login">
                        <p>
                            Bookmark articles using your GGD account.
                            <a href="/sign-in" className='news-auth-link'> Sign-in </a>
                            or
                            <a href="/sign-up" className='news-auth-link'> register </a>
                            today!
                        </p>
                    </div>
                }
                <Carousel
                    nextIcon={""}
                    prevIcon={""}
                    nextLabel={<button className="btn btn-outline-success news-button news-button-right" style={{ position: 'absolute', top: 30, left: 0, borderRadius: '50%' }} type="button">&#10148;</button>}
                    prevLabel={<button className="btn btn-outline-success news-button news-button-left" style={{ position: 'absolute', top: 30, right: 0, borderRadius: '50%' }} type="button">&#10148;</button>}
                    indicators={true}
                    pause={'hover'}
                    fade={true}
                >
                    <Carousel.Item>
                        <h3 className="page-heading" style={{ fontSize: '2rem', fontWeight: 'bold', paddingTop: 30 }}>Climate Change</h3>
                        {newsAPIError && <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch any articles. Please try again.</p>}
                        <div className="news">
                            <ul className="latest-news">
                                <div>{articlesClimate.length > 1 && <ArticleList articles={articlesClimate} bookmarks={userBookmarks} />}</div>
                            </ul>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h3 className="page-heading" style={{ fontSize: '2rem', fontWeight: 'bold', paddingTop: 30 }}>Natural Disasters</h3>
                        {newsAPIError && <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch any articles. Please try again.</p>}
                        <div className="news">
                            <ul className="latest-news">
                                <div>{articlesDisaster.length > 1 && <ArticleList articles={articlesDisaster} bookmarks={userBookmarks} />}</div>
                            </ul>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h3 className="page-heading" style={{ fontSize: '2rem', fontWeight: 'bold', paddingTop: 30 }}>Life Below Water</h3>
                        {newsAPIError && <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch any articles. Please try again.</p>}
                        <div className="news">
                            <ul className="latest-news">
                                <div>{articlesWater.length > 1 && <ArticleList articles={articlesWater} bookmarks={userBookmarks} />}</div>
                            </ul>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h3 className="page-heading" style={{ fontSize: '2rem', fontWeight: 'bold', paddingTop: 30 }}>Life On Land</h3>
                        {newsAPIError && <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch any articles. Please try again.</p>}
                        <div className="news">
                            <ul className="latest-news">
                                <div>{articlesLand.length > 1 && <ArticleList articles={articlesLand} bookmarks={userBookmarks} />}</div>
                            </ul>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}


export default News;
