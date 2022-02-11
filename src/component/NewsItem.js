import React, { Component } from 'react';

export default class NewsItem extends Component {
  
  render() {
    let { title, description, imageUrl,newsUrl,publishedAt,author,source} = this.props;
    return (
    <div className='my-3'>
      <div className="card" >
        <div style={ {display:'flex',
          justifyContent:'flex-end',
          position:'absolute',
          right:'0'}

        }>
      <span className=" badge rounded-pill bg-danger" >
    {source}</span>
    </div>
        <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2022/01/Stock-market-data-770x433.jpg":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(publishedAt).toGMTString()}  </small></p>
        </div>
      </div>
    </div>
    )
  }
}
