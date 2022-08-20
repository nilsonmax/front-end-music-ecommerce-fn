const setearDataRenderAdmins=(array,setDataRender)=>{
    array.map((user) => {
      setDataRender((data) => [
        ...data,
        {
          column0: user.id,
          column1: user.firstName + " " + user.lastName,
          column2: user.userName,
          column3: user.email,
          column4: user.rol,
          columnNameArray: "Admin",
        },
      ]);
    });
}

const setearDataRenderCategory=(array,setDataRender)=>{
    array.map((category) => {
      setDataRender((data) => [
        ...data,
        {
          column0: category.id,
          column1: category.id,
          column2: category.name,
          column3: `${category.isBanned}`,
          columnNameArray: "Category",
        },
      ]);
    });
  }

  const setearDatarenderInstruments = (array,setDataRender) => {
    array.map((instrument) => {
      setDataRender((data) => [
        ...data,
        {
          column0: instrument.id,
          column1: instrument.id,
          column2: instrument.img,
          column3: instrument.name,
          column4: instrument.stock,
          column5: `${instrument.isBanned}`,
          columnNameArray: "Instrument",
        },
      ]);
    });
  };

  const setearDataRenderUser=(array,setDataRender)=>{
    array.map((user) => {
      setDataRender((data) => [
        ...data,
        {
          column0: user.id,
          column1: user.firstName + " " + user.lastName,
          column2: user.userName,
          column3: user.email,
          column4: user.rol,
          columnNameArray: "User",
        },
      ]);
    });
  }
  const setearDatarenderHistoryshop=(array,setDataRender)=>{
    array.map((historyshop) => {
      setDataRender((data) => [
        ...data,
        {
          column0: historyshop.id,
          column1: historyshop.id,
          column2: historyshop.status,
          column3: "$"+historyshop.cost,
          column4: historyshop.cus_name,
          column5: historyshop.cus_country,
          columnNameArray: "Historyshop",
        },
      ]);
    });
  }
  const getDataTableEspecific=(setDataTablePrincipal,dataRender)=>{
    var total_shops=1;
    var saldo_caja=0;
    var ultima_shop=""
    var productos_vendidos=0;
    dataRender.map((history,key)=>{
        total_shops+=(key)
        saldo_caja+=parseFloat(history.cost);
        ultima_shop=history.createdAt;
        history.instrument.map((instrument)=>{
            productos_vendidos+=instrument.count;
        })
    })
    setDataTablePrincipal([{
        saldo_caja,
        total_shops,
        productos_vendidos,
        ultima_shop,
    }])
}

module.exports={setearDataRenderAdmins,
    setearDataRenderCategory,
    setearDatarenderInstruments,
    setearDataRenderUser,
    setearDatarenderHistoryshop,
    getDataTableEspecific};