import React, { Component } from 'react';
import {
    Button, Header, Segment, Grid, Statistic, Icon,
} from 'semantic-ui-react';
import PieRechartComponent from '../pieRechartComponent/pieRechartComponent';
import ErrorMessage from '../errorMessage/errorMessage';

export default class StatsCard extends Component {
    state = {
        error: false,
    };

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    onAdd = () => (this.props.onCurrent(this.props.current + 1))

    onMinus = () => (this.props.onCurrent(this.props.current - 1))

    render() {
        const dataPie = [];
        const { current } = this.props;
        const { error } = this.state;
        const { data } = this.props;

        if (!this.props.visible) {
            return null;
        }

        if (!data) {
            return <ErrorMessage />;
        }

        if (data[current].baseAver) {
            dataPie.push({
                name: 'Базовые',
                value: data[current].baseAver,
            });
        }
        if (data[current].lifestyleAver) {
            dataPie.push({
                name: 'Лайфстайл',
                value: data[current].lifestyleAver,
            });
        }
        if (data[current].loansAver) {
            dataPie.push({
                name: 'Долги',
                value: data[current].loansAver,
            });
        }
        if (data[current].savingsAver) {
            dataPie.push({
                name: 'Накопления',
                value: data[current].savingsAver,
            });
        }

        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <Segment raised>
                {errorMessage}
                <Grid columns={1} centered>
                    <Grid.Row>
                        <Statistic.Group>
                            <Statistic color="blue">
                                <Statistic.Value>
                                    {data[current].base.toFixed(0)}
                                </Statistic.Value>
                                <Statistic.Label>Базовые</Statistic.Label>
                            </Statistic>
                            <Statistic color="green">
                                <Statistic.Value>
                                    {data[current].lifestyle.toFixed(0)}
                                </Statistic.Value>
                                <Statistic.Label>Лайфстайл</Statistic.Label>
                            </Statistic>
                            <Statistic color="orange">
                                <Statistic.Value>
                                    {data[current].loans.toFixed(0)}
                                </Statistic.Value>
                                <Statistic.Label>Долги</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                    </Grid.Row>
                    <Grid.Row>
                        <Button basic size="big" color="teal" icon onClick={this.onMinus}>
                            <Icon name="chevron left" />
                        </Button>
                        <div style={{ padding: '20px' }}>
                            <Header as="h2" color="teal">{data[current].year}</Header>
                        </div>
                        <Button basic size="big" color="teal" icon onClick={this.onAdd}>
                            <Icon name="chevron right" />
                        </Button>
                    </Grid.Row>
                    <Grid.Row>
                        <PieRechartComponent pieData={dataPie} />
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

// Specifies the default values for props:
StatsCard.defaultProps = {
    data: [{
        years: 2018,
        base: 0,
        baseAver: 0,
        lifestyle: 0,
        lifestyleAver: 0,
        loans: 0,
        loansAver: 0,
        savings: 0,
        savingsAver: 0,
    }],
};
