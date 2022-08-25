import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserHistoryShop } from "../../redux/action/Historyshop";
import { useNavigate } from "react-router-dom";

export default function UserHistoryShop({ obtenerId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const historyShop = useSelector(
    (state) => state.historyshops.userHistoryShop
  );
  const token = window.localStorage.getItem("dataUser");
  // const [raiting,setRaiting]=useState(false)

  useEffect(() => {
    if (historyShop.length === 0) dispatch(getUserHistoryShop(token));
    else {
      historyShop.map((compra) => {
        compra.instrument.map((h) => {
          console.log(h);
        });
      });
    }
  }, []);

  return (
    <div className="max-w-[700px] overflow-x-scroll flex flex-col items-center my-6 md:max-w-full">
      <div className="my-2 items-center font-semibold text-2xl text-center text-darkconrflower">
        <h2>User HistoryShop:</h2>
      </div>

      <table>
        {/*<button onClick = {e => console.log("HISTORYSHOP: ", historyShop)}>Ver</button>*/}

        <thead>
          <tr className="bg-secondary content-center  h-10 ">
            <th className="content-center font-raleway  text-white border">
              Sale id
            </th>
            <th className="content-center font-raleway  text-white border">
              Date
            </th>
            <th className="content-center font-raleway  text-white border">
              Products
            </th>
            <th className="content-center font-raleway  text-white border">
              Instrument cost
            </th>
            <th className="content-center font-raleway  text-white border">
              Total cost
            </th>
            <th className="content-center font-raleway  text-white border">
              Sale status
            </th>
            <th className="content-center font-raleway   text-white border">
              Rating
            </th>
          </tr>
        </thead>

        <tbody>
          {historyShop.length ? (
            historyShop.map((compra) => {
              return compra.instrument.map((instrument) => {
                return (
                  <tr className=" border-2">
                    <td className="border-2">{compra.id}</td>
                    <td className="border-2">
                      {compra.createdAt.substr(0, 10)}
                    </td>
                    <td className="border-2">{instrument.name}</td>
                    <td className="border-2">{instrument.price}</td>
                    <td className="border-2">{compra.cost}</td>
                    <td className="border-2">{compra.status}</td>
                    <button
                      onClick={(e) =>
                        obtenerId(
                          instrument.id,
                          instrument.name,
                          instrument.price
                        )
                      }
                      className="bg-secondary m-1 cursor-pointer p-1 rounded-sm">
                      Rate instrument
                    </button>
                  </tr>
                );
              });
            })
          ) : (
            <th
              className="text-center text-xl text-darkconrflower border-b"
              colSpan="7"
              scope="rowgroup">
              {" "}
              You haven't bought any products yet{" "}
            </th>
          )}
        </tbody>
      </table>
    </div>
  );
}
