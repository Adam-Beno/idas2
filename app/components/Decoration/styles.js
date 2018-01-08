export default theme => ({
  card: {
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  barcode: {
    transform: 'rotate(90deg)',
  },
  thumbnail: {
    maxWidth: '100%',
  },
  root: {
    marginBottom: 50,
  },
  gridListTile: {
    cursor: 'pointer',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});
