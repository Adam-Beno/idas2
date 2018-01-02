export default theme => ({
  card: {
    minWidth: 275,
    marginBottom: 50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  root: {
    width: '96%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  addButton: {
    marginLeft: -35,
    position: 'absolute',
    marginTop: -35,
  },
  cellButton: {
    margin: 0,
    width: 'auto',
    height: 'auto',
  },
  selectField: {
    minWidth: 240,
  },
  columnWidth: {

  }
});
