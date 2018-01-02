import React from 'react';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Select as MUISelect } from 'redux-form-material-ui';
import { InputLabel } from 'material-ui/Input';

const selectWrapper = ({ meta: { error }, label, id, ...others }) => (
  <FormControl>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <MUISelect {...others} error={!!error} />
    {error && (
      <FormHelperText htmlFor={id} error={!!error}>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

export default selectWrapper;
