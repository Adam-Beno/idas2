const mapError = (
  {
    meta: { touched, error, warning } = {},
    input,
    ...props
  },
  errorProp = 'helperText',
) =>
  (touched && (error || warning)
    ? {
      ...props,
      ...input,
      [errorProp]: error || warning,
      error: true,
    }
    : { ...input, ...props });

export default mapError;
