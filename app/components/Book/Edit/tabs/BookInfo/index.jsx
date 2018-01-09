import React from 'react';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withStyles } from 'material-ui/styles';

import { fetch, update } from '../../../../../crud/actions';
import { loading, data } from '../../../../../crud/selectors';
import AuthorModel from '../../../../../models/author';
import PrinterModel from '../../../../../models/printer';
import BookModel from '../../../../../models/book';

import ReduxForm from './form';

class InfoTab extends React.Component {
  static propTypes = {
    data: propTypes.object.isRequired, // eslint-disable-line
    fetch: propTypes.func.isRequired,
    update: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired, // eslint-disable-line
    bookId: propTypes.number.isRequired,
  }

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetch(BookModel, { id: this.props.bookId });
    this.props.fetch(AuthorModel);
    this.props.fetch(PrinterModel);
  }

  handleSubmit(vals) {
    this.props.update(BookModel, vals.toJSON());
  }

  render() {
    const { props: { classes }, props } = this;
    return (
      <div>
        {(props.data.has('authors') && props.data.has('printers') && props.data.has('books') && !props.loading) &&
          <ReduxForm
            onSubmit={this.handleSubmit}
            authors={props.data.get('authors').toJS()}
            printers={props.data.get('printers').toJS()}
            initialValues={props.data.get('books').first().toJS()}
          />}
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  data,
  loading,
});

const mapDispatchToProps = dispatch => ({
  fetch: (model, params) => dispatch(fetch(model, params)),
  update: (model, params) => dispatch(update(model, params)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(InfoTab);

