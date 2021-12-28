import React from "react";
import { List } from "semantic-ui-react";
import MarkedIcon from '../../Images/bookmarked.svg';
import { deleteUserBookmarkByID } from './UserAPI';
import 'bootstrap/dist/css/bootstrap.css';
import '../Article/news.css';

const BookmarkItem = (props) => {
  const { bookmark } = props; //intialise the bookmark variable as data from props

  const removeBookmark = () => {
    if (deleteUserBookmarkByID(bookmark)) {
      window.location.reload(true);
    } else {
      console.log("no");
    }
  }

  return (
    <div className="article-container" style={{ textAlign: 'left' }}>
      <div className="row article">
        <div className="col" style={{ position: 'relative' }}>
          <h5 style={{ position: 'inherit', fontWeight: 'bold', fontSize: '1.5rem' }}>{bookmark.title}</h5>
          <div className="article-description" style={{ position: 'inherit' }}>{bookmark.description}</div><br />
          <div style={{ position: 'absolute', bottom: 0 }}>
            <a className="news-link" style={{ color: 'blue', cursor: 'pointer' }} href={bookmark.url}>{bookmark.sourceName}</a>
          </div>
        </div>
        <div className="col-1 bookmark-button-container">
          <button class="btn btn-light bookmark-button" type="button" articles={bookmark} onClick={() => removeBookmark()}><img src={MarkedIcon} type="submit" title="Remove from bookmarks" alt={bookmark.title} width="15vh"/></button>
        </div> 
      </div>
    </div>
  );
};

const BookmarkList = (props) => {
  return (
    <List divided>
      {props.bookmarks.map((bookmark, index) => ( //iterate through each bookmark
        <BookmarkItem bookmark={bookmark} key={bookmark.title + index} />
      ))}
    </List>
  );
};

export default BookmarkList;