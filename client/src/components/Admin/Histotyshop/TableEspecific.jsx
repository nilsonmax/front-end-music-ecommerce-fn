import React,{useState, useEffect} from 'react'

const TableEspecific = ({dataRender, columnsRender}) => {
    const [keysArray,setKeyArray]=useState([])

    useEffect(() => {
        setKeyArray(Object.keys(dataRender));
        console.log(dataRender)
    },[])



  return (
    <table className="table-auto  mx-auto max-w-[70%]">
              <thead>
                <tr className="bg-[#62A8AC] content-center  h-10 ">
                    {columnsRender.map((column,key)=>{
                        return (<th className="content-center font-raleway  text-white border" key={key+1}>
                            {column}
                        </th>)
                    })}
                </tr>
              </thead>
              <tbody>
                <tr className=" content-center ">
                    {
                        columnsRender.map((keyArray,key)=>{
                            return <td className="text-center border-b " key={key+1}>
                                {keyArray==="saldo_caja"&&"$"} {dataRender[keyArray]}
                            </td>
                        })
                    }
                </tr>
              </tbody>
          </table>
  )
}

export default TableEspecific; 
