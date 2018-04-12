import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class RecipeItem extends React.Component {
  render() {
    return (
        <Card centered>
          <Image/>
          <Card.Content>
            <Card.Header>
              this.props.stuff.name
            </Card.Header>
            <Card.Meta>
        <span className='date'>
          this.props.stuff.quantity
        </span>
            </Card.Meta>
            <Card.Description>
              this.props.stuff.condition
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Add tags to special dietary needs
            this.props.stuff._id
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
RecipeItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RecipeItem);
