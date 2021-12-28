import React, { useState, useEffect } from "react";
import { List, Image } from "semantic-ui-react";
import 'bootstrap/dist/css/bootstrap.css';
import '../Article/news.css';
import MarkIcon from '../../Images/bookmark.svg';
import MarkedIcon from '../../Images/bookmarked.svg'
import { createUserBookmark, deleteUserBookmark } from '../UserProfile/UserAPI';
import Auth from '../../Auth';

const ArticleItem = (props) => {
  const [bookmarked, setBookmarked] = useState(false);
  const { article, bookmarks } = props; //intialise article variable as data from props
  useEffect(() => {
    for (var i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].title === article.title) {
        setBookmarked(true);
        break;
      }
    }
  }, [bookmarks]);

  //add user bookmark
  const addBookmark = () => {
    if (createUserBookmark(props)) {
      setBookmarked(true);
    } else {
      console.log("failed to bookmark");
    }
  }

  const removeBookmark = () => {
    if (deleteUserBookmark(props.article)) {
      setBookmarked(false);
    } else {
      console.log("failed to delete bookmark");
    }
  }

  return (
    <div className="container article-container" style={{ background: `linear-gradient(rgba(255,255,255,0.99), rgba(255,255,255,0.99)), url(${article.urlToImage})` }}>
      <div className="row article">
        <div className="col-8" style={{ position: 'relative' }}>
          <a href={article.url} className="article-title" style={{ position: 'inherit', fontWeight: 'bold', fontSize: '1.5rem', color: 'black', textDecoration: 'none' }}>{article.title}</a>
          <div className="article-description" style={{ position: 'inherit' }}>{article.description}</div><br />
          <div style={{ position: 'absolute', bottom: 0 }}>
            <a className="news-link" style={{ color: 'blue', cursor: 'pointer' }} href={article.url}>{article.source.name}</a>
            <span style={{ marginLeft: 10, marginRight: 10 }}> &#8226; </span>
            {article.publishedAt.split("T")[0]}
          </div>
        </div>
        <div className="col">
          <Image className="article-image" src={article.urlToImage} style={{ width: "40vh", borderRadius: 5 }} />
        </div>
        {Auth.isAuthenticated() &&
          <div className="col-1 bookmark-button-container">
            {!bookmarked ?
              <button class="btn btn-light bookmark-button" type="button" articles={article} onClick={() => addBookmark()}><img src={MarkIcon} type="submit" title="Add to bookmarks" alt={article.title} width="15vh" /></button>
              :
              <button class="btn btn-light bookmark-button" type="button" articles={article} onClick={() => removeBookmark()}><img src={MarkedIcon} type="submit" title="Remove from bookmarks" alt={article.title} width="15vh" /></button>
            }
          </div>
        }
      </div>
    </div>
  );
};

const ArticleList = (props) => {
  return (
    <List divided>
      {props.articles.map((article, index) => ( //iterate through each article
        <ArticleItem article={article} key={article.title + index} bookmarks={props.bookmarks} />
      ))}
    </List>
  );
};

export default ArticleList;