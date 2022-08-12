import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../redux/action/index';
import Swal from 'sweetalert2'

export default function UserInfo () {
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


    return(
        <div>
        <Link to='/user/Profile'>
                <p>Go back</p>
        </Link>

        <Formik
        initialValues={{
            name:"",
            firstName:"",
            lastName: "",
            contactNumber:"",
            email:"",
            userName:"",
            password:"",
            buyerAddress:"",
            rol:""
        }}

        validate={values => {
            let errors = {}

            if(!values.dni){
                errors.dni = "input required";

            } else if(!values.firstName){
                errors.firstName = "input required";

            } else if(!values.lastName){
                errors.lastName = "input required";

            } else if(!values.contactNumber){
                errors.contactNumber = "input required";

            } else if(`${values.contactNumber}`.length<10){
                errors.contactNumber = "should have 10 digits at least"

            } else if(!values.email){
                errors.email = "input required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';

            } else if(!values.userName){
                errors.userName = "input required";

            } else if(!values.password){
                errors.password = "input required";
            } else if (!/^(?=.*\d)(?=.*[a-z])\w{8,}$/.test(values.password)) {
                errors.password = 'Invalid Password';

            } else if(!values.buyerAddress){
                errors.buyerAddress = "input required";
                
            } 
            return errors;
            }
        }

        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                dispatch(updateUserInfo(values))
                .then((data)=>{
                    Toast.fire({
                        icon: 'success',
                        title: data.ok
                    })
                    .then((result) => {
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
                <Field type="number" name="dni" placeholder="Id number" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                />
                <ErrorMessage name="dni" component="div" className="error text-red-500 text-center"/>

                <Field type="text" name="firstName" placeholder="Firstname" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                />
                <ErrorMessage name="firstName" component="div" className="error text-red-500 text-center"/>

                <Field type="text" name="lastName" placeholder="Lastname" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                />
                <ErrorMessage name="lastName" component="div" className="error text-red-500 text-center"/>

                <Field type="number" name="contactNumber" placeholder="Contact Number" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                />
                <ErrorMessage name="contactNumber" component="div" className="error text-red-500 text-center"/>

                <Field type="email" name="email" placeholder="Email" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                />
                <ErrorMessage name="email" component="div" className="error text-red-500 text-center"/>

                <Field type="text" name="userName" placeholder="Username" 
                   className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                />
                <ErrorMessage name="username" component="div" className="error text-red-500 text-center"/>

                <Field type="password" name="password" placeholder="Password" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                />
                <ErrorMessage name="password" component="div" className="error text-red-500 text-center"/>

                <Field type="text" name="buyerAddress" placeholder="Address" 
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                />
                <ErrorMessage name="buyerAddress" component="div" className="error text-red-500 text-center"/>

                <button type="submit" disabled={isSubmitting} 
                    className=" border rounded-md my-5 p-1.5 buttonSingup">
                    Send
                </button>
            </Form>  
        )}    
        </Formik>
        </div>
    )
}