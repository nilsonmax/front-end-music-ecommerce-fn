import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import imgAside from "./imgSide.jpg"
import { ImgContainer} from "./style";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/action'
import { showLogin } from "../../redux/action/index";
import "./styleCss.css"
import Swal from 'sweetalert2'

const SingForm = () => {
    const dispatch = useDispatch();
    const goBack = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
      
    return (
        <div className="h-screen w-screen relative">
            <ImgContainer>
                <img src={imgAside} className="object-cover w-screen h-screen"/>
            </ImgContainer>
            <div className="w-screen h-screen absolute flex items-center justify-center">
                <div className="px-16 py-10 rounded divFormRegister">
                    <div className="mb-7 text-center">
                        <Link to="/"><h1 className="titleLogo">LOGO</h1></Link>
                        <h1 className="">¡Singn up now!</h1>
                    </div>
                    <div className="flex flex-col">
                        <Formik
                            initialValues={{ userName:"", email: '', password: '', confirmpassword:"" }}
                            validate={values => {
                                const errors = {};
                                if(!values.userName || values.userName.length<4){
                                    errors.userName = 'Required';
                                }else if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }else if (!values.password) {
                                    errors.password = 'Required';
                                } else if (
                                    !/^(?=.*\d)(?=.*[a-z])\w{8,}$/.test(values.password)
                                ) {
                                    errors.password = 'Invalid Password';
                                }else if (!values.confirmpassword) {
                                    errors.confirmpassword = 'Required';
                                }else if (values.confirmpassword!==values.password) {
                                    errors.confirmpassword = 'different Password';
                                }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                dispatch(registerUser(values)).
                                then((data)=>{
                                    Toast.fire({
                                        icon: 'success',
                                        title: data.ok
                                    }).then((result) => {
                                        goBack('/')
                                    })
                                })
                                .catch((error)=>{
                                    Toast.fire({
                                        icon: 'error',
                                        title: error.message
                                    })
                                })
                                setSubmitting(false);
                            }, 400);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col">
                                <Field type="text" name="userName" placeholder="username" 
                                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                                />
                                <ErrorMessage name="username" component="div" className="error text-red-500 text-center"/>

                                <Field type="email" name="email" placeholder="email" 
                                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                                />
                                <ErrorMessage name="email" component="div" className="error text-red-500 text-center"/>

                                <Field type="password" name="password" placeholder="password" 
                                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                                />
                                <ErrorMessage name="password" component="div" className="error text-red-500 text-center"/>

                                <Field type="password" name="confirmpassword" placeholder="confirm password" 
                                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                                />
                                <ErrorMessage name="confirmpassword" component="div" className="error text-red-500 text-center"/>

                                <button type="submit" disabled={isSubmitting} 
                                    className=" border rounded-md my-5 p-1.5 buttonSingup">
                                    Sign up
                                </button>
                            </Form>
                            
                        )}    
                    </Formik>
                    
                    <div className="flex justify-center">
                        <p className="mr-3">Have an account?</p>
                        <p className="logInNow" onClick={() => dispatch(showLogin(true))}>Log in now</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SingForm