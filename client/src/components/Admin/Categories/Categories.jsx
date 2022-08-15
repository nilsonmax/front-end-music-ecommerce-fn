import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, deleteCategory } from "../../../redux/action";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";
import Crear from "./Crear";

const Categories = ({ setShowCreateComponent, showCreateComponent }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.reducer.category);
    var [copyCategories, setCopyCategories] = useState([]);
    const columns = ["Category_id", "name"];
    var [dataRender, setDataRender] = useState([]);
    var [valueSearch, setValueSearch] = useState("");
    var [refreshCategories, setRefreshCategories] = useState(null);

    useEffect(() => {
        if (categories.length === 0 && refreshCategories === null) {
          dispatch(getAllCategories());
          setRefreshCategories(false);
        } else {
          if (refreshCategories === true) {
            dispatch(getAllCategories());
            setRefreshCategories(false);
          }else if(refreshCategories === "search"){
            var categoryNoFound=true;
            categories.map((category) => {
              if(category.name.toLowerCase().includes(valueSearch.toLowerCase())){
                setCopyCategories((data)=>[...data,category])
                categoryNoFound=false
              }
            })
            if(valueSearch!=="" && categoryNoFound===true){
              Toast.fire({
                icon: "error",
                title: "Category no encontrada",
              })
            }
            setRefreshCategories(false);
          }
            setDataRender([]);
            if(copyCategories.length>0){
              setearDataRender(copyCategories)
              setCopyCategories([])
            }else{
              setearDataRender(categories)
            }
        }
      }, [categories, refreshCategories]);
      
      const setearDataRender=(array)=>{
        array.map((category) => {
          setDataRender((data) => [
            ...data,
            {
              column0: category.id,
              column1: category.id,
              column2: category.name,
              columnNameArray: "Category",
            },
          ]);
        });
      }
      
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    function activarEliminar(columnNameArray, idDelete) {
        if (columnNameArray === "Category") {
          const token = window.localStorage.getItem("dataUser");
          let tokenDecode = JSON.parse(token);
          dispatch(deleteCategory(idDelete))
            .then((data) => {
              setRefreshCategories(true);
              Swal.fire("Deleted!", "Se ha eliminado una Category", "success");
            })
            .catch((error) => {
              Swal.fire("Error!", "Algo salio mal.", "error");
            });
        }
    }

    return (
        <div className="flex flex-row">
          <div>
            <Aside 
              setShowCreateComponent={setShowCreateComponent}
              setRefresh={setRefreshCategories} 
              setValueSearch={setValueSearch} 
            />
          </div>
          <div>
            {dataRender.length > 0 && showCreateComponent === false && (
              <Table
                setRefresh={setRefreshCategories}
                dataRender={dataRender}
                columnsRender={columns}
                activarEliminar={activarEliminar}
              />
            )}
            {dataRender.length < 1 && showCreateComponent === false && (
              <p className="w-screen text-center">No hay users</p>
            )}
            {showCreateComponent === true && (
              <Crear
                setShowCreateComponent={setShowCreateComponent}
                setRefreshCategories={setRefreshCategories}
              />
            )}
          </div>
        </div>
      );
    };

export default Categories





