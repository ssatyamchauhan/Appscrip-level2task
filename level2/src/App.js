import React from 'react';
import './App.css';
import axios from 'axios';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroller';
import DataTable from 'react-data-table-component';
import FilterListIcon from '@material-ui/icons/FilterList';
import _ from 'underscore'
// import Daytable from './daytable';


const options = [
  { value: 'rank', label: 'rank' },
  { value: 'price', label: 'price' },
  { value: 'priceDate', label: 'price_date' },
  { value: 'marketCap', label: 'market_cap' }

];
const columns = [
  {
    name: 'price_change',
    selector: 'price_change',
    sortable: true,
  },
  {
    name: 'price_change_pct',
    selector: 'price_change_pct',
    sortable: true,
  },
  {
    name: "volume",
    selector: 'volume',
    sortable: true,
  },
  {
    name: "volume_change",
    selector: 'volume_change',
    sortable: true,
  },
  {
    name: "volume_change_pct",
    selector: 'volume_change_pct',
    sortable: true,
  },
  {
    name: "market_cap_change",
    selector: 'market_cap_change',
    sortable: true,
  },
  {
    name: "market_cap_change_pct",
    selector: 'market_cap_change_pct',
    sortable: true,
  }

];

const optionDay = [
  { value: 'd1', label: 'day1' },
  { value: 'd7', label: 'day7' },
  { value: 'd30', label: 'day30' },
  { value: 'd365', label: 'day365' }
];

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      listOfData: [],
      limit: 20,
      isload: false,
      selectedOption: '',
      sortby: 'rank',
      day: []
    }
  }


  componentDidMount() {
    axios
      .get("http://localhost:2000/getData")
      .then(data => {
        this.setState({
          listOfData: data.data,
          isload: true,
          day: [data.data[0]['d1']]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  loadMore = () => {
    axios
      .get("http://localhost:2000/getSort", { params: { limit: this.state.limit, sortby: this.state.sortby } })
      .then((data) => {
        let newlimit = this.state.limit + 10;
        let newList = this.state.listOfData.concat(data.data.data)
        this.setState({
          listOfData: newList,
          limit: newlimit
        })
        if (this.state.sortby) {
          var sortedData = _.sortBy(this.state.listOfData, this.state.sortby)
          this.setState({ listOfData: sortedData })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleDayChange = (index, value) => {

    let dict = this.state.listOfData[index];
    dict['day'] = value.value;
    let updatedList = this.state.listOfData;
    updatedList[index] = dict;
    this.setState({
      listOfData: updatedList
    })

  }

  sorted = (e) => {
    console.log(e.target.value)

  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({sortby: selectedOption.value})
    if (selectedOption.value === 'rank' || selectedOption.value === 'price' || selectedOption.value === 'priceDate' || selectedOption.value === 'marketCap') {
      axios
        .get("http://localhost:2000/getSort", { params: { sortby: selectedOption.value, limit: this.state.newlimit } })
        .then(data => {
          if(data){
            this.setState({
              listOfData: data.data.data,
              limit: this.state.limit +10
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      // circulating_supply/max_supply/high/high_timestamp
      if (selectedOption.value === 'circulatingSupply' || selectedOption.value === 'maxSupply' || selectedOption.value === 'high' || selectedOption.value === 'highTimestamp') {
        this.setState({ sortby: selectedOption.value })
        var sortedData = _.sortBy(this.state.listOfData, selectedOption.value)
        this.setState({ listOfData: sortedData })
      }
    }
  };





  render() {
    const { selectedOption } = this.state;


    let JSX = (
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
                        <div className="elementaurnat-place">
                          <Select
                            id={ind}
                            width='50px'
                            value={element.day || 'day1'}
                            onChange={(selectedOption) => this.handleDayChange(ind, selectedOption)}
                            options={optionDay}
                          />
                          <DataTable
                            style={{ width: '100%' }}
                            columns={columns}
                            data={[element[element.day] || element['d1']]}
                          />
                        </div>
                      </div>
                      {/* <div className="rank">
                        <span>Rank</span>
                        <div className="rank">{element.rank}</div>
                      </div> */}
                    </div>
                  </div>
                  <div className="divider div-transparent"></div>
                  <div className="text">
                    <div className="Row">
                      <span>RANK:</span>
                    <span>{element.rank}</span>
                  </div>
                  <div className="Row">
                    <span>PRICE:</span>
                    <span>{element.price}</span>
                  </div>
                  <div className="Row">
                    <span>MAX_SUPPLY:</span>
                    <span>{element.maxSupply || 0}</span>
                  </div>
                  <div className="Row">
                    <span>PRICE_DATE</span>
                    <span>{element.priceDate}</span>
                  </div>
                  <div className="Row">
                    <span>MARKET_CAP</span>
                    <span>{element.marketCap || 0}</span>
                  </div>
                  <div className="Row">
                    <span>CIRCULATING_SUPPLY</span>
                    <span>{element.circulatingSupply || 0}</span>
                  </div>
                  <div className="Row">
                    <span>HIGH:</span>
                    <span>{element.high}</span>
                  </div>
                  </div>
                </article><hr />
              <div className="Row">
                <span>HIGH_TIMESTAMP:</span>
                <span>{element.highTimestamp}</span>
              </div>
            </div>
          </div>
          </div >
        )
  })
    )

  const overallNews = <InfiniteScroll
    loadMore={this.loadMore}
    hasMore={true}
    loader={<div className="loader" key={0}> <div>Loading .....</div></div>}
  >
    {JSX}
  </InfiniteScroll>
  return(
      <div>
  <div>
    <Select
      value={selectedOption}
      onChange={this.handleChange}
      options={options}
    />
  </div>
{ overallNews || "Working ....." }
      </div >
    );
  }
}

export default App;