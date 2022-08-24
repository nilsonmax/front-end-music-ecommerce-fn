import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, deleteCategory } from "../../../redux/action";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";
import Crear from "./Crear";
import { setearDataRenderCategory } from "../../../utils/setearDataRenderColumns";
import { Toast } from "../../../utils/Toast";

const Categories = ({ setShowCreateComponent, showCreateComponent }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.reducer.category);
    var [copyCategories, setCopyCategories] = useState([]);
    const columns = ["Category_id", "name", "isBanned"];
    var [dataRender, setDataRender] = useState([]);
    var [valueSearch, setValueSearch] = useState("");
    var [refreshCategories, setRefreshCategories] = useState(null);
    const token = window.localStorage.getItem("dataUser");

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
            setShowCreateComponent(false)
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
              setearDataRenderCategory(copyCategories,setDataRender)
              setCopyCategories([])
            }else{
              setearDataRenderCategory(categories,setDataRender)
            }
        }
      }, [categories, refreshCategories]);
  
    function activarEliminar(columnNameArray, idDelete) {
        if (columnNameArray === "Category") {
          dispatch(deleteCategory(idDelete,token))
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
      <div className="flex flex-col md:flex-row m-14">
          <div>
            <Aside 
              setShowCreateComponent={setShowCreateComponent}
              setRefresh={setRefreshCategories} 
              setValueSearch={setValueSearch} 
            />
          </div>
          <div className="md:pl-10">
            {dataRender.length > 0 && showCreateComponent === false && (
              <Table
                setRefresh={setRefreshCategories}
                dataRender={dataRender}
                columnsRender={columns}
                activarEliminar={activarEliminar}
              />
            )}
            {dataRender.length < 1 && showCreateComponent === false && (
              <p className="text-center">No hay Admins</p>
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





