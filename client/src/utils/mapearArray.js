function mapearArrayInstruments(instrumentsArray){
  var instrumentMapeado=instrumentsArray.map((e) => {
      return {
        id: e.id,
        name: e.name,
        brand: e.brand,
        price: e.price,
        img: e.img,
        description: e.description,
        stock: e.stock,
        status: e.status,
        adminId: e.adminId,
        category: e.category.name,
        isBanned: e.isBanned,
      };
  })
  return instrumentMapeado
}

function mapearArrayUser(usersArray){
  var usersMapeado=usersArray.map((e) => {
      return {
        id: e.id,
        dni: e.dni,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        contactNumber: e.contactNumber,
        userName: e.userName,
        buyerAddress: e.buyerAddress,
        rol: e.rol,
      };
  })
  return usersMapeado
}

function mapearArrayAdmins(usersArray){
  var usersMapeado=usersArray.map((e) => {
      return {
        id: e.id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        userName: e.userName,
        rol: e.rol,
      };
  })
  return usersMapeado
}

module.exports={mapearArrayInstruments,mapearArrayUser,mapearArrayAdmins}