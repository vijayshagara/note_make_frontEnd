// import { useEffect } from 'react';
import './LoginForm.css';
import { ChangeEvent, FormEvent, useState,useContext } from 'react';
// import { MyStateContext } from '../../../App';
import { loginUser } from '../../../service/api/Notes';
import { setTokenInStorage} from '../../../service/storage';
import StateContext from '../../contexts/StateContext';
import DispatchContext from '../../contexts/DispatchContext';
import { Navigate } from 'react-router-dom';

interface Payload {
    email: string;
    password: string;
}

const LoginForm = () => {

    const appState= useContext(StateContext);
    const appDispatch: any = useContext(DispatchContext);
    

    

    const [data, setData] = useState<Payload>({
        email:'',
        password:'',
    });
    // useEffect(()=>{
    //     let token:string = ''
    //     setTokenInStorage({token})
    // },[])
    
    const handleChange = ({ e, type }: { e: ChangeEvent<HTMLInputElement>, type: keyof Payload }) => {
        setData((prevData) => {
            return {
                ...prevData,
                [type]: e.target.value,
                data : {...prevData}
            };
        });
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response:any = await loginUser(data);
            const { token } = response;
            setTokenInStorage({ token });
            appDispatch({ type: "login", value: response.token })
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    
    
    return (
        <div>
            {appState.user ? (<Navigate to={'/home'}/>):(<div>
            <section className="vh-100 dark-theme">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{ display: 'flex', flexDirection: 'column', }}>
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        onChange={(e)=>handleChange({e,type:'email'})}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        onChange={(e)=>handleChange({e,type:'password'})}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                    >
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{" "}
                                        <a href="#!" className="link-danger">
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>

                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>)}
        </div>
        
    )
}

export default LoginForm
