import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postInstrument, getAllCategories } from '../../redux/action/index';
import { Container, MainContainer, Title, Required, FormContainer, SixItemsContainer, ThreeItemsContainer, InputUp, InputDown, SubmitButton, Select, TextArea } from './style';



function validate(input){
    let errors = {}

    if(!input.name){
        errors.name = "*";
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
    const categories = useSelector((state) => state.reducer.category);
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
        <Container>

        <MainContainer>
           
            <Title>Product creation form</Title>
            
            <div>
            <FormContainer onSubmit={(e) => handleSubmit(e)}>

                <Required>
                <p><i>(*) Inputs required</i></p>
                </Required>

                <SixItemsContainer>
                <ThreeItemsContainer>
                <div>
                {/* <label>{errors.name && ( <p>{errors.name}</p> )} Name:</label> */}
                <InputUp 
                placeholder='Name*'
                type="text"
                value= {input.name}
                name= "name"
                onChange={ (e) => handleChange(e)}
                />
                </div>

                <div>
                    {/*<label>{errors.brand && ( <p>{errors.brand}</p> )} Brand:</label>*/}
                    <InputUp 
                    placeholder='Brand*'
                    type="text" 
                    value= {input.brand}
                    name="brand"
                    onChange={ e => handleChange(e)} 
                    />
                </div>

                <div>
                    {/*<label>{errors.category && ( <p>{errors.category}</p> )} Category:</label>*/}
                    <Select name='category' onChange={ e => handleSelect(e)}>
                    <option hidden>Category*</option>
                    {categories?.map(c =>{
                        return(
                            <option key={c.id} value={c.name}>{c.name}</option>
                        )
                    })}
                    </Select>             
                </div>
                </ThreeItemsContainer>

                <ThreeItemsContainer>
                <div>
                    {/*<label>{errors.price && ( <p>{errors.price}</p> )} Price:</label>*/}
                    <InputUp 
                    placeholder='Price*'
                    type="number" 
                    value= {input.price}
                    name='price'
                    onChange={ e => handleChange(e)} 
                    />
                </div>

                <div>
                    {/*<label>{errors.stock && ( <p>{errors.stock}</p> )} Stock:</label>*/}
                    <InputUp
                    placeholder='Stock*'
                    type="number" 
                    value= {input.stock}
                    name='stock'
                    onChange={ e => handleChange(e)} 
                    />
                </div>

                <div>
                    {/*<label>{errors.status && ( <p>{errors.status}</p> )} Status:</label>*/}
                    <Select name='status' onChange={ e => handleSelect(e)}>
                    <option hidden>Status*</option>
                    <option name="status" value="New">New</option>
                    <option name= "status" value="Used">Used</option>
                    </Select>       
                </div>
                </ThreeItemsContainer>
                </SixItemsContainer>

                <ThreeItemsContainer>
                <div>
                    {/*<label>{errors.img && ( <p>{errors.img}</p> )} image URL:</label>*/}
                    <InputDown 
                    placeholder='Image URL*'
                    type="url" 
                    value= {input.img}
                    name='img'
                    onChange={ e => handleChange(e)} 
                    />  
                </div>

                <div>
                    {/*<label>{errors.description && ( <p>{errors.description}</p> )} Description:</label>*/}
                    <TextArea placeholder='Description*' 
                    name="description" 
                    cols="30" 
                    rows="5"
                    onChange={ e => handleChange(e)}
                    >
                    </TextArea>
                    
                </div>

                <SubmitButton 
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
                    </SubmitButton>
                </ThreeItemsContainer>

            </FormContainer>
            </div>
        </MainContainer>
        </Container>
    )
}