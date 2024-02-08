import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import {config} from '../config';

const List = () => {
    const navigate = useNavigate();
    const [tableData, setTabledata] = useState([]);
    const fetch_data = async () => {
        const res = await axios.get(config.path + "/api/employe");
        if(res.status == 200){
            setTabledata(res.data.result);
        }
    }
    
    useEffect(() => {
        fetch_data();
    }, [])

    const addUser = () => {
        navigate('/addemploye');
    }

    const deleteUser = async (id) => {
        window.confirm('Are you sure? Delete this record?');
        const res = await axios.delete(config.path + `/api/deleteemp/${id}`);
        if(res.status == 200){
            fetch_data();
        }
    }
    
    return <>
    <center>
        <div className="container">
            <div className='heading'>
                <h3>User Details</h3>
                <div className='addbtn'>
                    <button onClick={() => addUser()}>Create</button>
                </div>
            </div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Job Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((user, i) => {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.birth_date}</td>
                                    <td>{(user.gender && user.gender === '1' ? 'Female' : 'Male')}</td>
                                    <td>{user.job_title}</td>
                                    <td>
                                        <a className='edit_btn' href={`/addemploye/${user.id}`}>Edit</a>&nbsp;
                                        <button type='button' onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </center>
    </>;
}
export default List;