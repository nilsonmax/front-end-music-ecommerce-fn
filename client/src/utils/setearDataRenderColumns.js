const setearDataRenderAdmins = (array, setDataRender) => {
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

export const setearDataRenderCategory = (array, setDataRender) => {
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

export const setearDatarenderInstruments = (array, setDataRender) => {
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

export const setearDataRenderUser = (array, setDataRender) => {
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
export const setearDatarenderHistoryshop = (array, setDataRender) => {
  array.map((historyshop) => {
    setDataRender((data) => [
      ...data,
      {
        column0: historyshop.id,
        column1: historyshop.id,
        column2: historyshop.status,
        column3: "$" + historyshop.cost,
        column4: historyshop.cus_name,
        column5: historyshop.cus_country,
        columnNameArray: "Historyshop",
      },
    ]);
  });
}

export const getDataTableEspecific = (setDataTablePrincipal, dataRender) => {
  var Total_Shops = 1;
  var Cash_Balance = 0;
  var Last_Shop = ""
  var Sold_Products = 0;
  dataRender.map((history, key) => {
    Total_Shops += (key)
    Cash_Balance += parseFloat(history.cost);
    Last_Shop = history.createdAt;
    history.instrument.map((instrument) => {
    Sold_Products += instrument.count;
    })
  })
  setDataTablePrincipal([{
    Cash_Balance,
    Total_Shops,
    Sold_Products,
    Last_Shop,
  }])
}

export default setearDataRenderAdmins;