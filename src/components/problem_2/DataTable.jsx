import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DataTable = ({baseURL}) => {
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage] = useState(1)
  const [search, setSearch] = useState('');

const [data,setData] = useState([])


  useEffect(() => {
    
    axios.get(baseURL,{params:{
      page:page,
      page_size:15,
      search:search,
    }}).then((response) => {
      setTotalPage(response.data.count/15)
      setData(response.data.results)
    })

    
  }, [page, search]);



  return (
    <div className="container my-5">
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
    <table className="table">
      <thead>
        <tr>
          
          <th>Phone</th>
          <th>Country</th>
          {/* Add more table headers here */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            
            <td>{item?.phone}</td>
            <td>{item?.country?.name}</td>
            {/* Add more table cells here */}
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
