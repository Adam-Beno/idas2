export default theme => ({
  flexContainer: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  flexItem: {
    margin: 'auto',
  },
  buttonMargin: {
    marginTop: '20px',
    textTransform: 'uppercase',
  },
  textCenter: {
    justifyContent: 'center',
  },
  textField: {
    marginTop: theme.spacing.unit,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
