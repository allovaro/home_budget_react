import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import CkService from '../../services/ckService';
import './app.css';

import ConfigCard from '../configCard/configCard';
import StatsCard from '../statsCard/statsCard';
import TableCard from '../tableCard/tableCard';

export default class App extends Component {
    coinkeeper = new CkService();

    state = {
        showStatistic: false,
        result: [],
        current: 0,
    };

    onStatsChanged = result => {
        this.setState({
            result,
            showStatistic: true,
        });
    }

    onCurrentChange = current => {
        this.setState({
            current,
        });
    }

    render() {
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
                                onCurrent={this.onCurrentChange}
                                current={this.state.current}
                            />
                            <TableCard
                                visible={this.state.showStatistic}
                                result={this.state.result}
                                current={this.state.current}
                            />
                        </Grid.Column>
                        <Grid.Column width={2} />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
