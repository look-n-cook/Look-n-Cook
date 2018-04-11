import React from 'react';
import {
  Grid,
  Icon,
} from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const footerStyle = {
      marginLeft: '0',
      marginRight: '0',
    };
    const divStyle = {
      paddingTop: '15px',
      background: '#ACC198',
    };
    return (
        <footer style={footerStyle}>
          <div style={divStyle}>
            <br />
            <Grid verticalAlign='middle' textAlign='center'>
              <Grid.Column width={5}>
                <a href="https://look-n-cook.github.io/">Documentation</a>
              </Grid.Column>
              <Grid.Column width={5}>
                <a href="https://github.com/look-n-cook/Look-n-Cook">
                  <Icon name='github'/>
                  GitHub
                </a>
              </Grid.Column>
            </Grid>
            <div className="ui center aligned container">
              <br />
              <br />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822<br />
              <br />
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
