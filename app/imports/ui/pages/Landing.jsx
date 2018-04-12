import React from 'react';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const spacingStyle = { marginTop: '90px', marginBottom: '90px' };
    const titleTop = {
      backgroundColor: '#D6DFCC',
      borderTopLeftRadius: '60px',
      borderTopRightRadius: '60px',
      height: '60px',
      width: '1155px',
    };
    const titleStyle = {
      margin: '0',
      backgroundColor: '#D6DFCC',
      fontSize: '80px',
      color: 'white',
      width: '1155px',
    };
    const titleBottom = {
      backgroundColor: '#D6DFCC',
      borderBottomLeftRadius: '60px',
      borderBottomRightRadius: '60px',
      height: '60px',
      width: '1155px',
    };
    const imageStyle = {
      borderTopLeftRadius: '60px',
      borderTopRightRadius: '60px',
      height: '208px',
      width: '1155px',
    };
    const descriptionStyle = {
      backgroundColor: '#D6DFCC',
      borderBottomLeftRadius: '60px',
      borderBottomRightRadius: '60px',
      color: 'white',
      height: '208px',
      width: '1155px',
    };
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <div style={spacingStyle}/>

          <Grid.Row>
            <div style={titleTop}>
            </div>
              <Header as='h1' style={titleStyle}>{"Look 'n' Cook"}</Header>
            <div style={titleBottom}>
            </div>
          </Grid.Row>

          <div style={spacingStyle}></div>

          <div style={imageStyle} className='landing-search'/>

          <Grid.Row style={descriptionStyle}>
            <Grid.Column width={4}>
              <Icon name='share alternate square' size='massive' black inverted/>
            </Grid.Column>

            <Grid.Column width={10}>
              <h1>Share your favorite recipes with the community</h1>
              <h4>Write down your recipes for others to follow. In addition to the usual preparation and a picture,
                add information on where to buy the ingredients and how much they cost.</h4>
            </Grid.Column>
          </Grid.Row>

          <div style={spacingStyle}/>

          <div style={imageStyle} className='landing-recipes'/>

          <Grid.Row style={descriptionStyle}>
            <Grid.Column width={4}>
              <Icon name='browser' size='massive'/>
            </Grid.Column>

            <Grid.Column width={10}>
              <h1>Search for new recipes</h1>
              <h4>Search for recipes that give your favorite food a new twist, fall under your own dietary needs
                (vegan, gluten-free, etc.), or just something interesting to cook up for dinner!</h4>
            </Grid.Column>
          </Grid.Row>

          <div style={spacingStyle}/>

          <div style={imageStyle} className='landing-vendor'/>

          <Grid.Row style={descriptionStyle}>
            <Grid.Column width={4}>
              <Icon name='users' size='massive'/>
            </Grid.Column>

            <Grid.Column width={10}>
              <h1>Vendors can list their ingredients</h1>
              <h4>Local grocery stores and farmer’s markets can provide their location and hours.
                For each ingredient defined in the system, they can indicate their stock,
                how much it costs to buy the item, the size of the item.</h4>
            </Grid.Column>
          </Grid.Row>

          <div style={spacingStyle}/>
        </Grid>
    );
  }
}

export default Landing;
