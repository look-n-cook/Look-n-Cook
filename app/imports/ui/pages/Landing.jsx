import React from 'react';
import {
  Grid,
  Image,
  Header,
  Icon,
} from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const spacingStyle = { marginTop: '90px', marginBottom: '90px' };
    const titleStyle = { fontSize: '80px' };
    const descriptionStyle = {
      backgroundColor: '#D6DFCC',
      borderRadius: '60px',
      color: 'white',
      height: '208px',
      width: '1155px',
    };
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <div style={spacingStyle}/>

          <Grid.Row>
            <Header as='h1' style={titleStyle}>{"Look 'n' Cook"}</Header>
          </Grid.Row>

          <div style={spacingStyle}/>

          <Grid.Row>
            <Grid.Column width={4}>
              <Image size='small' circular src="/images/meteor-logo.png"/>
            </Grid.Column>

            <Grid.Column width={8}>
              <h1>Welcome to this template</h1>
              <p>Now get to work and modify this app!</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={descriptionStyle}>
            <Grid.Column width={4}>
                <Icon name='share alternate square' size='massive' black inverted/>
            </Grid.Column>

            <Grid.Column width={10}>
              <h1>Share your favorite recipes with the community</h1>
              <h5>Write down your recipes for others to follow. In addition to the usual preparation and a picture,
                add information on where to buy the ingredients and how much they cost.</h5>
            </Grid.Column>
          </Grid.Row>

          <div style={spacingStyle}/>

          <Grid.Row>
            <Grid.Column width={4}>
              <Image size='small' circular src="/images/meteor-logo.png"/>
            </Grid.Column>

            <Grid.Column width={8}>
              <h1>Welcome to this template</h1>
              <p>Now get to work and modify this app!</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={descriptionStyle}>
            <Grid.Column width={4}>
              <Icon name='browser' size='massive'/>
            </Grid.Column>

            <Grid.Column width={10}>
              <h1>Search for new recipes</h1>
              <h5>Search for recipes that give your favorite food a new twist, fall under your own dietary needs
                (vegan, gluten-free, etc.), or just something interesting to cook up for dinner!</h5>
            </Grid.Column>
          </Grid.Row>

          <div style={spacingStyle}/>

          <Grid.Row>
            <Grid.Column width={4}>
              <Image size='small' circular src="/images/meteor-logo.png"/>
            </Grid.Column>

            <Grid.Column width={8}>
              <h1>Welcome to this template</h1>
              <p>Now get to work and modify this app!</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={descriptionStyle}>
            <Grid.Column width={4}>
              <Icon name='users' size='massive'/>
            </Grid.Column>

            <div style={spacingStyle}/>

            <Grid.Column width={10}>
              <h1>Vendors can list their ingredients</h1>
              <p>Local grocery stores and farmer’s markets can provide their location and hours.
                For each ingredient defined in the system, they can indicate their stock,
                how much it costs to buy the item, the size of the item.</p>
            </Grid.Column>
          </Grid.Row>

          <div style={spacingStyle}/>
        </Grid>
    );
  }
}

export default Landing;
