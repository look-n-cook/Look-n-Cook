import React from 'react';
import { Feed, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Review extends React.Component {
  render() {
    return (
      <Segment color='black'>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            {this.props.review.rating}
            <br/>
            {this.props.review.review}
            <br/>
             - {this.props.review.owner} posted on {this.props.review.createdAt.toLocaleDateString('en-US')}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
      </Segment>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
