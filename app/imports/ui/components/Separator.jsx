import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Separator extends React.Component {
  render() {
    const separatorStyle = {
      paddingTop: '5px',
      background: '#376507',
      margin: '25px',
      marginLeft: '5%',
      marginRight: '5%',
      borderRadius: '2.5px',
    };
    return (
        <footer>
          <div style={separatorStyle}>
          </div>
        </footer>
    );
  }
}

export default Separator;
