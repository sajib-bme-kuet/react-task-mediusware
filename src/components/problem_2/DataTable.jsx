import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SecondaryModal from './SecondaryModal';
import SecondaryDataTable from './SecondaryDataTable';
import InfiniteScroll from 'react-infinite-scroll-component';
const DataTable = ({ baseURL,showOnlyEven }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([])
const [nextURL,setNextURL] = useState("")
const [totalLength,setTotalLength] = useState(0)
  const [filteredData, setFilteredData] = useState([])

  useEffect(()=>{

    if(data.length > 0){
      if(showOnlyEven){
        setFilteredData(data.filter((item)=>item.id % 2 === 0))
      }else{
        setFilteredData(data)
      }
    }
  },[data,showOnlyEven])

  const [showSecondaryModal, setShowSecondaryModal] = useState(false);
  const handleSecondaryModalClose = () => setShowSecondaryModal(false);

  const handleInstantDataSearch = (event) => {
    if(event){
      event.preventDefault();
    }
    setPage(1)
    axios.get(baseURL, {
      params: {
        page: 1,
        page_size: 15,
        search: searchTerm,
      }
    }).then((response) => {
      const totalPageCount = Math.ceil(response.data.count / 15)
      setTotalPage(totalPageCount > 0 ? totalPageCount : 1)
      setNextURL(response.data.next)
      setData(response.data.results)
      if(response.data.next !== null){
        setHasMore(true)
      }else{
        setHasMore(false)
      }
    }).catch((error) =>
      console.error(error))
  }

  const handleOnTypeDataSearch = () => {
    let timer
    if(timer){
      console.log("Timer Found")
      clearTimeout(timer)
    }
    
    timer = setTimeout(()=> handleInstantDataSearch(), 300) //debounce function to limit api calls in short interval
  }

  const handleLoadMore = () => {
    console.log("Triggered")
    if(hasMore){
      axios.get(nextURL).then((response) => {
        setNextURL(response.data.next)
        setTotalLength(response.data.count)
        setData([...data,...response.data.results])
        if(response.data.next !== null){
          setHasMore(true)
        }else{
          setHasMore(false)
        }
      })
    }
  }


  useEffect(() => {
    axios.get(baseURL, {
      params: {
        page: page,
        page_size: 15,
        search: searchTerm,
      }
    }).then((response) => {
      console.log("nextURL",response.data.next)
      const totalPageCount = Math.ceil(response.data.count / 15)
      setTotalPage(totalPageCount > 0 ? totalPageCount : 1)
      setNextURL(response.data.next)
      setTotalLength(response.data.count)
      setData(response.data.results)
      if(response.data.next !== null){
        setHasMore(true)
      }else{
        setHasMore(false)
      }
    }).catch((error) =>
      console.error(error))

  }, [page,baseURL])



  return (
    <div className="container my-5">
      <div className="mb-3">
        <form onSubmit={handleInstantDataSearch}>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              handleOnTypeDataSearch()}}
            placeholder="Search..."
          />
        </form>
      </div>
      <div
      style={{
        height: '500px',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        dataLength={totalLength}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load.</p>}
      >
      <table className="table">
        <thead>
          <tr>

            <th>Phone</th>
            <th>Country</th>

          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} onClick={()=> setShowSecondaryModal(true)}>

              <td>{item?.phone}</td>
              <td>{item?.country?.name}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </InfiniteScroll>
    </div>
      
      {/* <div className='d-flex justify-content-center align-items-center gap-3 my-3'>
        <button className="btn btn-primary btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span className="mx-2">Page {page} of {totalPage}</span>
        <button className="btn btn-primary btn-sm" disabled={page === totalPage} onClick={() => setPage(page + 1)}>Next</button>
      </div> */}
      <SecondaryModal title={"Fewer Contacts"} show={showSecondaryModal} handleClose={handleSecondaryModalClose}>
      <SecondaryDataTable baseURL={baseURL} page={page} />
      </SecondaryModal>
    </div>
  );
};

export default DataTable;
