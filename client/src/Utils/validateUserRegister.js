function validarUserRegister(values) {
  const errors = {};
  if (!values.userName || values.userName.length < 4) {
    errors.userName = "Required";
  } else if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.password) {
    errors.password = "Required";
  } else if (!/^(?=.*\d)(?=.*[a-z])\w{8,}$/.test(values.password)) {
    errors.password = "Invalid Password";
  } else if (!values.confirmpassword) {
    errors.confirmpassword = "Required";
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "different Password";
  }
  return errors;
}

export default validarUserRegister;
