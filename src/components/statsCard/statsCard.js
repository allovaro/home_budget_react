import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import PieRechartComponent from '../pieRechartComponent/pieRechartComponent';
import ErrorMessage from '../errorMessage/errorMessage';

export default class StatsCard extends Component {
    state = {
        current: 0,
        error: false,
        result: [],
    }

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    onAdd = () => {
        this.setState(prevState => {
            const current = prevState.current + 1;
            if (current >= this.props.data.length) {
                return { current: 0 };
            }
            return { current };
        });
    }

    onMinus = () => {
        this.setState(prevState => {
            const current = prevState.current - 1;
            if (current < 0) {
                return { current: this.props.data.length - 1 };
            }
            return { current };
        });
    }

    render() {
        const { current, error } = this.state;
        const { data } = this.props;
        console.log(this.props.data, data.length);
        if (data) {
            return <></>;
        }

        const dataPie = [
            {
                name: 'Базовые',
                value: data[current].baseAver,
            },
            {
                name: 'Лайфстайл',
                value: data[current].lifestyleAver,
            },
            {
                name: 'Долги',
                value: data[current].loansAver,
            },
            {
                name: 'Накопления',
                value: data[current].savingsAver,
            },
        ];

        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <>
                {errorMessage}
                <Header as="h2">{data[current].year}</Header>
                <Button onClick={this.onMinus}>-</Button>
                <Button onClick={this.onAdd}>+</Button>
                <PieRechartComponent pieData={dataPie} />
            </>
        );
    }
}
