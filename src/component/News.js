import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults:0


        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
    }

    async updatenews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=78f9ddc35b8446188be9f47f0f1a81c6&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({
        //     loading:true
        // })
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // this.setState({articles:parsedData.articles,
        //     totalResults:parsedData.totalResults,
        //     loading:false})
        this.updatenews();



    }

    // handlePrevClick = async () => {

    //     // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=78f9ddc35b8446188be9f47f0f1a81c6&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    //     // this.setState({
    //     //     loading:true
    //     // })
    //     // let data=await fetch(url);
    //     // let parsedData=await data.json();
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     page:this.state.page - 1,
    //     //     articles:parsedData.articles,
    //     //     loading:false
    //     // })
    //     this.setState({ page: this.state.page - 1 });
    //     this.updatenews();
    // }
    // handleNextClick = async () => {
    //     //     if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    //     //     }else{

    //     //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=78f9ddc35b8446188be9f47f0f1a81c6&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //     //     this.setState({
    //     //         loading:true
    //     //     })
    //     //     let data=await fetch(url);
    //     //     let parsedData=await data.json();
    //     //     console.log(parsedData);
    //     //     this.setState({
    //     //         page:this.state.page + 1,
    //     //         articles:parsedData.articles,
    //     //         loading:false
    //     //     })
    //     // }
    //     this.setState({ page: this.state.page + 1 })

    //     this.updatenews();


    // }
    fetchMoreData = async () => {
        this.setState({page:this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            

        })

         
      };

    render() {


        return (
        
            <>
                <h2 className="container text-center" style={{ margin: "35px 0px" }}>News-Monkey Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

                {this.state.loading && <Spinner />}
                <div>
                    
                    <hr />
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!==this.state.totalResults}
                        loader={<Spinner/>}
                    >
                    <div className="container my-3">  
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem   key={element.url} title={element.title} description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}  />
                            </div>
                        
                        })}

                    </div>
                    </div>
                    </InfiniteScroll>
                      
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&laquo; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                    </div> */}

                </div>
                </>
                
                
                )

    }
}
