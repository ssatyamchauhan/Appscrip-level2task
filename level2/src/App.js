import React from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      listOfData: [],
      limit: 20,
      isload: false,
    }
  }

  componentDidMount() {
    console.log('getData')
    axios
      .get("http://localhost:2000/getData")
      .then(data => {
        this.setState({
          listOfData: data.data,
          isload: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadMore = () => {
    console.log('loadMore')
    axios
      .get("http://localhost:2000/getData", { params: { limit: this.state.limit } })
      .then((data) => {
        let newlimit = this.state.limit + 10;
        let newList = this.state.listOfData.concat(data.data)
        this.setState({
          listOfData: newList,
          limit: newlimit
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  sorted = (e) => {
    console.log(e.target.value)

  }




  render() {

    let JSX = (
      console.log(this.state.listOfData),
      this.state.listOfData.map((element, ind) => {
        return (
          <div className="Card" key={ind}>
            <div className="content">
              <div>
                <article>
                  <div className="first-div">
                    <div className="img">
                      <img src={element.logo} alt="Low Internet Connectivity" />
                    </div>
                    <div className="img-details">
                      <div className="details">
                        <div className="elementaurant-name">

                          <h3><a href={element.logo} key={ind}>{element.symbol}</a></h3>
                        </div>
                        <div className="elementaurnat-place">{element.currency}</div>
                      </div>
                      <div className="rank">
                        <span>Rank</span>
                        <div className="rank">{element.rank}</div>
                      </div>
                    </div>
                  </div>
                  <div className="divider div-transparent"></div>
                  <div className="text">
                    <div className="Row">
                      <span>PRICE:</span>
                      <span>{element.price}</span>
                    </div>
                    <div className="Row">
                      <span>PRICE_DATE</span>
                      <span>{element.priceDate}</span>
                    </div>
                    <div className="Row">
                      <span>MARKET_CAP</span>
                      <span>{element.marketCap}</span>
                    </div>
                    <div className="Row">
                      <span>CIRCULATING_SUPPLY</span>
                      <span>{element.circulatingSupply}</span>
                    </div>
                    <div className="Row">
                      <span>HIGH:</span>
                      <span>{element.HIGH}</span>
                    </div>
                  </div>
                </article><hr />
                <div className="Row">
                  <span>HIGH_TIMESTAMP:</span>
                  <span>{element.highTimestamp}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })
    )

    const overallNews = <InfiniteScroll
      loadMore={this.loadMore}
      hasMore={this.state.isload}
      loader={<div className="loader" key={0}> <div>Loading .....</div></div>}
    >
      {JSX}
    </InfiniteScroll>
    return (
      <div>
        <div className="Header">
          <select id="cars" name="Rank" onSelect={this.sorted}>
            <option onMouseLeave ={this.sorted} value="rank" onChange={this.sorted}>Rank</option>
            <option onMouseLeave={this.sorted} value="price" onChange={this.sorted}>Price</option>
            <option onClick={this.sorted} value="price_date" onChange={this.sorted}>Price_date</option>
            <option  onClick={this.sorted} value="market_cap"onChange={this.sorted}>Market_cap</option>
          </select>
        </div>
        {overallNews || "Working ....."}
      </div>
    );
  }
}

export default App;
