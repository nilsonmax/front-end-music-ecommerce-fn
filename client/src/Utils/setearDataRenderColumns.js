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
module.exports={setearDataRenderAdmins,setearDataRenderCategory,setearDatarenderInstruments,setearDataRenderUser};