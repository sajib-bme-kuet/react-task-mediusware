import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SecondaryDataTable = ({ baseURL,page }) => {

  const [data, setData] = useState([])


  useEffect(() => {
    axios.get(baseURL, {
      params: {
        page: page,
        page_size: 5,
      }
    }).then((response) => {
      setData(response.data.results)
    }).catch((error) =>
      console.error(error))

  }, [page,baseURL])



  return (
    <div className="container my-5">
      
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
      
    </div>
  );
};

export default SecondaryDataTable;
