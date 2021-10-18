import React, { Component } from 'react';
import {
    Button, Icon, Grid, Placeholder, Segment, Header, Statistic,
} from 'semantic-ui-react';
import CkService from '../../services/ckService';
import './app.css';

import ConfigCard from '../configCard/configCard';
import StatsCard from '../statsCard/statsCard';

export default class App extends Component {
    coinkeeper = new CkService();

    state = {
        showStatistic: false,
        result: [],
    };

    onStatsChanged = result => {
        this.setState({
            result,
            showStatistic: true,
        });
    }

    render() {
        const FooSpace = () => (
            <Placeholder>
                <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                    <Placeholder.Line length="medium" />
                </Placeholder.Paragraph>
            </Placeholder>
        );

        return (
            <div className="App">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2} />
                        <Grid.Column width={6}>
                            <ConfigCard onValueChanged={this.onStatsChanged} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <StatsCard
                                visible={this.state.showStatistic}
                                data={this.state.result}
                            />
                        </Grid.Column>
                        <Grid.Column width={2} />
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={2} />
                        <Grid.Column width={6}>
                            <Segment raised>
                                <FooSpace />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Segment raised>
                                <FooSpace />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={2} />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

// <div className="App">
// <h1>Hello world!!!</h1>
// <Button primary onClick={this.onClick}>GetData</Button>
// <Button onClick={this.onClick2}>GetData</Button>
// <TagList tags={this.state.tags} />
// </div>
