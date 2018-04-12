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
    const linkStyle = {
      color: 'black',
    };
    return (
        <footer style={footerStyle}>
          <div style={divStyle}>
            <br />
            <div className="ui center aligned container">
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822<br />
              <br />
              <Grid verticalAlign='middle' textAlign='center'>
                <Grid.Column width={2}>
                  <a style={linkStyle} href="https://look-n-cook.github.io/">
                    <Icon name='file text'/>
                    Documentation
                  </a>
                </Grid.Column>
                <Grid.Column width={2}>
                  <a style={linkStyle} href="https://github.com/look-n-cook/Look-n-Cook">
                    <Icon name='github'/>
                    GitHub
                  </a>
                </Grid.Column>
              </Grid>
              <br />
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
