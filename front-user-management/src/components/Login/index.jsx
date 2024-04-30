import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {}, []);

  return (
    <div className="login row justify-content-center align-content-center vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="col-xl-8 col-sm-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            defaultValue="marcos5"
            aria-describedby="emailHelp"
            {...register("email")}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            defaultValue="cruzeiro9090"
            {...register("password", { required: true })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
