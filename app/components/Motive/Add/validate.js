const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required';
  } else if (values.get('name').length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
  return errors;
};

export default validate;
