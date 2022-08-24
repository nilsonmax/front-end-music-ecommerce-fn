import React,{useState, useEffect} from 'react'

const TableEspecific = ({dataRender, columnsRender}) => {

    useEffect(() => {
    },[])



  return (
    <div className="max-w-[370px] overflow-x-auto rounded-lg overflow-hidden border border-gray-300">
        <table>
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
                {
                    dataRender.map((data,key)=>{
                        return <tr className=" content-center " key={key*10}>
                            {columnsRender.map((column,key)=>{
                            return <td className="text-center border-b " key={key+1}>
                                {(column==="saldo_caja" || column==="price") && "$"}{data[column]}
                            </td>
                        })}
                        </tr>

                    })
                }
              </tbody>
          </table>
    </div>
  )
}

export default TableEspecific; 
