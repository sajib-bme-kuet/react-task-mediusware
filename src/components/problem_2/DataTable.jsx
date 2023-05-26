import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DataTable = ({ baseURL }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState([])


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
      setData(response.data.results)
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


  useEffect(() => {
    axios.get(baseURL, {
      params: {
        page: page,
        page_size: 15,
        search: searchTerm,
      }
    }).then((response) => {
      const totalPageCount = Math.ceil(response.data.count / 15)
      setTotalPage(totalPageCount > 0 ? totalPageCount : 1)
      setData(response.data.results)
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
      <table className="table">
        <thead>
          <tr>

            <th>Phone</th>
            <th>Country</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>

              <td>{item?.phone}</td>
              <td>{item?.country?.name}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className='d-flex justify-content-center align-items-center gap-3 my-3'>
        <button className="btn btn-primary btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span className="mx-2">Page {page} of {totalPage}</span>
        <button className="btn btn-primary btn-sm" disabled={page === totalPage} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default DataTable;
