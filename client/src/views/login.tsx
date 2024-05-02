import { useState } from "react"
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authenticateUser } from "../features/user-authentication";

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const isAuthenticated = useAppSelector(state => state.userAuthentication.isAuthenticated);

    const setFieldValue = (key: string, value: string) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const logIn = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Credentials': true
                }
            })
            if (response.status >= 200) {
                dispatch(authenticateUser(formData));
                navigate('/invoices');
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/invoices" />;
    }

    return (
        <div className="flex flex-col w-full h-full justify-center items-center col-span-12">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input onChange={e => setFieldValue(e.target.name, e.target.value)} name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input onChange={e => setFieldValue(e.target.name, e.target.value)} name="password" type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={logIn}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
