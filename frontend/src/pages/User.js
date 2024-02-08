import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import {config} from '../config';

const User = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [gen, setGen] = useState(0);

    const init = {
        name: '',
        email: '',
        address: '',
        phone: '',
        birth_date: '',
        gender: '',
        job_title: ''
    }

    const Schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('Invalid email').required(),
        address: Yup.string().required(),
        phone: Yup.string().required(),
        birth_date: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: init,
        validationSchema: Schema,
        onSubmit: (values) => {
            add_user(values);
        }
    });

    const add_user = async (value) => {
        if(id){
            const res = await axios.put(config.path + `/api/updateUser/${id}`, value);
            if(res.status == 200){
                navigate('/');
            }
        }else{
            const res = await axios.post(config.path + "/api/addemp", value);
            if(res.status == 200){
                navigate('/');
            }
        }
    }

    const getUser = async (id) => {
        if(id){
            const res = await axios.get(config.path + `/api/getEmploye/${id}`);
            if(res.status == 200){
                formik.setFieldValue('name', res.data.data.name);
                formik.setFieldValue('email', res.data.data.email);
                formik.setFieldValue('address', res.data.data.address);
                formik.setFieldValue('phone', res.data.data.phone);
                formik.setFieldValue('birth_date', res.data.data.birth_date);
                formik.setFieldValue('gender', res.data.data.gender);
                setGen(res.data.data.gender);
                formik.setFieldValue('job_title', res.data.data.job_title);
            }
        }
    }

    useEffect(() => {
        getUser(id);
    }, [id]);

    return <>
        <center>
        <div className="container">
            <div className='row'>
                <div className='col-md-4'>
                    <h3>Add Your Detail</h3>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label"> Full Name:</label>
                            <input type="text" value={formik.values.name} onChange={formik.handleChange} className="form-control" id="name" placeholder="Enter Your Full Name" name="name" />
                            <div className='error'>{formik.errors.name}</div>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Email:</label>
                            <input type="email" value={formik.values.email} onChange={formik.handleChange} className="form-control" id="email" placeholder="Enter email" name="email" />
                            <div className='error'>{formik.errors.email}</div>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Address:</label>
                            <textarea value={formik.values.address} onChange={formik.handleChange} className="form-control" id="address" placeholder="Enter address" name="address" />
                            <div className='error'>{formik.errors.address}</div>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Phone:</label>
                            <input type="text" value={formik.values.phone} onChange={formik.handleChange} className="form-control" id="phone" placeholder="Enter phone" name="phone" />
                            <div className='error'>{formik.errors.phone}</div>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Birth Date:</label>
                            <input type="date" value={formik.values.birth_date} onChange={formik.handleChange} className="form-control" id="birth_date" name="birth_date" />
                            <div className='error'>{formik.errors.birth_date}</div>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Gender: </label>
                            <input type="radio" value="0" checked={gen == '0' ? true : ''} onChange={formik.handleChange} id="gender" name="gender" />
                            <label>Male</label>
                            <input type="radio" value="1" checked={gen == '1' ? true : ''} onChange={formik.handleChange} id="gender" name="gender" />
                            <label>Female</label>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Job Title:</label>
                            <select name='job_title' onChange={formik.handleChange}>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Customer Care Associate">Customer Care Associate</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Web Developer">Web Developer</option>
                                <option value="Application Developer">Application Developer</option>
                            </select>
                        </div>
                        {id ? <button type="button" className="btn btn-primary" onClick={formik.handleSubmit}>Update</button> : <button type="button" className="btn btn-primary" onClick={formik.handleSubmit}>Add</button>}
                    </form>
                </div>
            </div>
        </div>
        </center>
    </>;
}
export default User;