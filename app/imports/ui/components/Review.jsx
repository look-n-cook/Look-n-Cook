import React from 'react';
import { Feed, Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Reviews } from '/imports/api/review/review';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
  }
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }
  /** On remove, delete the data. */
  onClick() {
    /* eslint-disable-next-line */
    if (Meteor.user().username === this.props.review.owner) {
      /* eslint-disable-next-line */
      if (confirm("Do you really want to delete this review?")) {
        Reviews.remove(this.props.review._id, this.deleteCallback);
      }
    }
  }
  render() {
    const reviewStyle = {
      background: '#CAB494',
    };
    const buttonStyle = {
      background: '#DACFB3',
    };
    return (
      <Table unstackable style={reviewStyle}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Feed size='large'>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content={this.props.review.createdAt.toLocaleDateString('en-US')} />
                    <Feed.Summary>
                      {this.props.review.owner} &nbsp;&nbsp;&nbsp;&nbsp;
                      {this.props.review.rating}
                    </Feed.Summary>
                    <Feed.Extra>
                      " {this.props.review.review} "
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Table.Cell>
            <Table.Cell textAlign='right'>
              <Button icon='remove' style={buttonStyle} onClick={this.onClick} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
