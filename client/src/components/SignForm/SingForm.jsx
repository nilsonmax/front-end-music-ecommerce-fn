import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import imgAside from "./imgSide.jpg"
import { ImgContainer} from "./style";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/action'
import "./styleCss.css"

const SingForm = () => {
    const dispatch = useDispatch();
    const goBack = useNavigate();

    return (
        <div className="h-screen md:flex flex-row items-center">
            <ImgContainer>
                <img src={imgAside} alt="" className="object-cover w-screen h-48 lg:h-screen"/>
            </ImgContainer>
            <div className="pt-10 w-screen flex flex-col items-center md:pt-0 md:w-1/2">
                <div className="mb-7"><h1 className="font-medium">¡Singn up now!</h1></div>
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
                            then((d)=>{
                                console.log(d)
                                goBack('/')
                            })
                            .catch((e)=>{
                                console.log(e);
                            })
                            setSubmitting(false);
                        }, 400);
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col">
                            <Field type="text" name="userName" placeholder="username" 
                                className="outline-none border border-inherit rounded-md py-1.5 px-5 w-72 shadow-sm hover:shadow-indigo-500/40 focus:shadow-indigo-500/40"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-center"/>

                            <Field type="email" name="email" placeholder="email" 
                                className="outline-none border border-inherit rounded-md py-1.5 px-5 mt-3.5 shadow-sm hover:shadow-indigo-500/40 focus:shadow-indigo-500/40"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-center"/>

                            <Field type="password" name="password" placeholder="password" 
                                className="outline-none border border-inherit rounded-md py-1.5 px-5 mt-3.5 shadow-sm hover:shadow-indigo-500/40 focus:shadow-indigo-500/40"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-center"/>

                            <Field type="password" name="confirmpassword" placeholder="confirm password" 
                                className="outline-none border border-inherit rounded-md py-1.5 px-5 mt-3.5 shadow-sm hover:shadow-indigo-500/40 focus:shadow-indigo-500/40"
                            />
                            <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-center"/>

                            <button type="submit" disabled={isSubmitting} 
                                className=" border rounded-md my-5 p-1.5 hover:font-medium buttonSingup">
                                Sign up
                            </button>
                        </Form>
                        
                    )}    
                </Formik>
                
                <div className="flex justify-center">
                    <p className="mr-3">Have an account?</p>
                    <Link to="/login" className="text-sky-600 hover:font-medium">Log in now?</Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SingForm