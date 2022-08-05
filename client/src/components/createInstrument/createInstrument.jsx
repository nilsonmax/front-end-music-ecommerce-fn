import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postInstrument, getAllCategories } from '../../redux/action/index'



function validate(input){
    let errors = {}

    if(!input.name){
        errors.name = "Instrument name required";
    } else if(typeof input.name !== 'string'){
        errors.name = "Instrument name should be a string";
    }

    if(!input.brand){
        errors.brand = "Instrument brand required";
    }

    if(!input.price){
        errors.price = "Instrument price required";
    } 

    if(!input.img){
        errors.img = "Instrument img required";
    }

    if(!input.description){
        errors.description = "Instrument description required";
    }

    if(!input.stock){
        errors.stock = "Instrument stock required";
    } 

    if(!input.status){
        errors.status = "Instrument status required";
    }

    if(!input.category){
        errors.category = "Instrument category required";
    }

    return errors;
}


export default function CreateInstrument() {
    const dispatch = useDispatch();
    const goBack = useNavigate();
    const categories = useSelector((state) => state.category);
    const [errors, setErrors] = useState({
        name:"",
        brand:"",
        price: "",
        img:"",
        description:"",
        stock:"",
        status:"",
        category:""
    })
    const [input, setInput] = useState({
        name:"",
        brand:"",
        price: "",
        img:"",
        description:"",
        stock:"",
        status:"",
        category:""
    })

    useEffect(() => {
        dispatch(getAllCategories());
    },[])

    useEffect(() => {
        setErrors(validate(input))
    }, [dispatch, input])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
             ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
      };

    function handleSubmit(e){
        e.preventDefault();
        setErrors(validate(input))
        if(Object.keys(errors).length === 0){
            dispatch(postInstrument(input))
            alert("Instrument succesfullly created :)");
            setInput({
                name:"",
                brand:"",
                price: "",
                img:"",
                description:"",
                stock:"",
                status:"",
                category:""
            })
            goBack('/')
        }
    }

    return (
        <div>
            <div>
                <Link to='/'>Go back</Link>
            </div>
            
            <h2>CREATE PRODUCT</h2>

            <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <label>Name: </label>
                <input 
                type="text"
                value= {input.name}
                name= "name"
                onChange={ (e) => handleChange(e)}
                />
                {errors.name && ( <p>{errors.name}</p> )}
                </div>

                <div>
                    <label>Brand:</label>
                    <input 
                    type="text" 
                    value= {input.brand}
                    name="brand"
                    onChange={ e => handleChange(e)} 
                    />
                    {errors.brand && ( <p>{errors.brand}</p> )}
                </div>
                
                <div>
                    <label>Price:</label>
                    <input 
                    type="number" 
                    value= {input.price}
                    name='price'
                    onChange={ e => handleChange(e)} 
                    />
                    {errors.price && ( <p>{errors.price}</p> )}
                </div>

                <div>
                    <label>image URL:</label>
                    <input 
                    type="url" 
                    value= {input.img}
                    name='img'
                    onChange={ e => handleChange(e)} 
                    />
                    {errors.img && ( <p>{errors.img}</p> )}
                </div>

                <div>
                    <label>Description:</label>
                    <input 
                    type="text" 
                    value= {input.description}
                    name='description'
                    onChange={ e => handleChange(e)} 
                    />
                    {errors.description && ( <p>{errors.description}</p> )}
                </div>

                <div>
                    <label>Stock:</label>
                    <input 
                    type="number" 
                    value= {input.stock}
                    name='stock'
                    onChange={ e => handleChange(e)} 
                    />
                    {errors.stock && ( <p>{errors.stock}</p> )}
                </div>

                <div>
                    <label>Status:</label>
                    <select name='status' onChange={ e => handleSelect(e)}>
                    <option hidden>Select</option>
                    <option name="status" value="New">New</option>
                    <option name= "status" value="Used">Used</option>
                    </select>
                    {errors.status && ( <p>{errors.status}</p> )}             
                </div>

                <div>
                    <label>Category:</label>
                    <select name='category' onChange={ e => handleSelect(e)}>
                    <option hidden>Select</option>
                    {categories?.map(c =>{
                        return(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        )
                    })}
                    </select>
                    {errors.category && ( <p>{errors.category}</p> )}             
                </div>

                <div>
                    <button 
                    type='submit' 
                    disabled={
                        errors.name || 
                        errors.brand || 
                        errors.price || 
                        errors.img || 
                        errors.description || 
                        errors.stock || 
                        errors.status || 
                        errors.category}>
                    Create Instrument   
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}