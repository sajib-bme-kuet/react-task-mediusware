import React, { useEffect, useState } from 'react';



const Problem1 = () => {

    const [data, setData] = useState([])
    const [show, setShow] = useState('all');
    const [inputFieldData, setInputFieldData] = useState({
        name: '',
        status: ''
    })

    //get LocalStorage data
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('data'))

        if (localData) {
            setData(localData)
        }
    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputFieldData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataLength = data.length;
        const newData = {...data, id: dataLength + 1, ...inputFieldData}
        setData([...data, newData])
        localStorage.setItem('data', JSON.stringify([...data, newData]))
        setInputFieldData({
            name: '',
            status: ''
        })
        event.target.reset();

    }
    const handleClick = (val) => {
        setShow(val);
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name"
                            name='name'
                            value={inputFieldData.name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" name='status'
                            value={inputFieldData.status}
                            onChange={handleChange} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;