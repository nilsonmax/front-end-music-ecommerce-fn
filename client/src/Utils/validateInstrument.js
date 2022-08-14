function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "*";
  }

  if (!input.brand) {
    errors.brand = "*";
  }

  if (!input.price) {
    errors.price = "*";
  }

  if (!input.img) {
    errors.img = "*";
  }

  if (!input.description) {
    errors.description = "*";
  }

  if (!input.stock) {
    errors.stock = "*";
  }

  if (!input.status) {
    errors.status = "*";
  }

  if (!input.category) {
    errors.category = "*";
  }

  return errors;
}

export default validate;
