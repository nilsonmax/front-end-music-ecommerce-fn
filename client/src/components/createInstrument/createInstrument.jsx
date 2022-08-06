import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postInstrument, getAllCategories } from '../../redux/action/index'



function validate(input){
    let errors = {}

    if(!input.name){
        errors.name = "*";
    } else if(typeof input.name !== 'string'){
        errors.name = "Instrument name should be a string";
    }

    if(!input.brand){
        errors.brand = "*";
    }

    if(!input.price){
        errors.price = "*";
    } 

    if(!input.img){
        errors.img = "*";
    }

    if(!input.description){
        errors.description = "*";
    }

    if(!input.stock){
        errors.stock = "*";
    } 

    if(!input.status){
        errors.status = "*";
    }

    if(!input.category){
        errors.category = "*";
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
    },[dispatch])

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
            <p>Inputs required</p>

            <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <label>{errors.name && ( <p>{errors.name}</p> )} Name:</label>
                <input 
                type="text"
                value= {input.name}
                name= "name"
                onChange={ (e) => handleChange(e)}
                />
                
                </div>

                <div>
                    <label>{errors.brand && ( <p>{errors.brand}</p> )} Brand:</label>
                    <input 
                    type="text" 
                    value= {input.brand}
                    name="brand"
                    onChange={ e => handleChange(e)} 
                    />
                    
                </div>
                
                <div>
                    <label>{errors.price && ( <p>{errors.price}</p> )} Price:</label>
                    <input 
                    type="number" 
                    value= {input.price}
                    name='price'
                    onChange={ e => handleChange(e)} 
                    />
                    
                </div>

                <div>
                    <label>{errors.img && ( <p>{errors.img}</p> )} image URL:</label>
                    <input 
                    type="url" 
                    value= {input.img}
                    name='img'
                    onChange={ e => handleChange(e)} 
                    />
                    
                </div>

                <div>
                    <label>{errors.description && ( <p>{errors.description}</p> )} Description:</label>
                    <input 
                    type="text" 
                    value= {input.description}
                    name='description'
                    onChange={ e => handleChange(e)} 
                    />
                    
                </div>

                <div>
                    <label>{errors.stock && ( <p>{errors.stock}</p> )} Stock:</label>
                    <input 
                    type="number" 
                    value= {input.stock}
                    name='stock'
                    onChange={ e => handleChange(e)} 
                    />
                    
                </div>

                <div>
                    <label>{errors.status && ( <p>{errors.status}</p> )} Status:</label>
                    <select name='status' onChange={ e => handleSelect(e)}>
                    <option hidden>Select</option>
                    <option name="status" value="New">New</option>
                    <option name= "status" value="Used">Used</option>
                    </select>
                                 
                </div>

                <div>
                    <label>{errors.category && ( <p>{errors.category}</p> )} Category:</label>
                    <select name='category' onChange={ e => handleSelect(e)}>
                    <option hidden>Select</option>
                    {categories?.map(c =>{
                        return(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        )
                    })}
                    </select>
                                
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