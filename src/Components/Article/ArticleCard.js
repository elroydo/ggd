import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './news.css';

const ArticleCard = (props) => {
    const article = props.articles;
    return (
        <Carousel indicators={false} controls={false} fade={true} interval={5000}>
            {article.map((article, index) => (
                <Carousel.Item key={index + 1}>
                    <a href={article.url} style={{ cursor: "pointer" }}>
                        <div className="col article-card-container" style={{ borderRadius: 30, cursor: "pointer", background: `linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0.8)), url(${article.urlToImage})`, backgroundPosition: "center", backgroundSize: "270%" }}>
                            <div className="row" style={{ position: "absolute", cursor: "pointer", bottom: 0, borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                                <div className="row">
                                    <a style={{ color: '#b4d6ff', cursor: 'pointer', display: "inline-block", fontWeight: 400, paddingBottom: 5, textDecoration: 'none' }} href={article.url}>{article.source.name}</a>
                                </div>
                                <div className="row">
                                    <h5 style={{ position: 'inherit', fontWeight: '400', fontSize: '1.5rem', color: "#ffffff", paddingBottom: 5, cursor: "pointer" }}>{article.title.substring(0, 50)}...</h5>
                                </div>
                                <div className="row">
                                    <div style={{ color: "#e6e6e6", paddingBottom: 10, cursor: "pointer" }}>
                                        <div style={{display: "inline-block", fontWeight: 400, cursor: "pointer" }}>{article.publishedAt.split("T")[0]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ArticleCard;