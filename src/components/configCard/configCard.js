import React, { Component } from 'react';
import Promise from 'bluebird';
import {
    Button, Header, Grid, Segment, Icon,
} from 'semantic-ui-react';

import CkService from '../../services/ckService';
import BudgetConfig from '../budgetConfig/budgetConfig';

export default class ConfigCard extends Component {
    coinkeeper = new CkService();

    state = {
        showBase: false,
        showLife: false,
        showSave: false,
        showLoans: false,
        config: {},
        years: [],
    };

    budgetChanged = data => {
        this.setState({ config: data });
    }

    onAdd = event => {
        switch (event.target.id) {
        case 'base':
            this.setState({ showBase: true });
            break;
        case 'life':
            this.setState({ showLife: true });
            break;
        case 'saving':
            this.setState({ showSave: true });
            break;
        case 'loans':
            this.setState({ showLoans: true });
            break;
        default:
            break;
        }
    }

    onYearClick = event => {
        const year = event.target.id;
        this.setState(prevState => {
            let arr = prevState.years;
            if (arr.indexOf(year) !== -1) {
                arr = arr.filter(item => (item !== year)).sort();
            } else {
                arr.push(year);
                arr = arr.sort();
            }

            return ({ years: [...new Set([...arr])] });
        });
    }

    onCalc = async () => {
        const { years } = this.state;
        const result = await Promise.map(years, async year => {
            const json = this.prepareJsonRequest(year);
            const ret = await this.coinkeeper.postRequest('get_statistics', json);
            return ret;
        }, { concurrency: 2 });
        this.props.onValueChanged(result);
    }

    // onCalc = async () => {
    //     const resultArr = [];
    //     this.state.years.map(async year => {
    //         const json = this.prepareJsonRequest(year);
    //         const ret = await this.coinkeeper.postRequest('get_statistics', json);
    //         resultArr.push(ret);
    //     });
    //     this.setState({ result: resultArr });
    //     // console.log('ready to send array', resultArr, resultArr[0]);
    //     // this.props.onValueChanged(resultArr);
    // }

    prepareJsonRequest(year) {
        const jsonData = {
            date: {
                month: 0,
                year: parseInt(year, 10),
            },
        };
        if (this.state.config.base) {
            jsonData['base'] = this.state.config.base;
        }
        if (this.state.config.lifestyle) {
            jsonData['lifestyle'] = this.state.config.lifestyle;
        }
        if (this.state.config.savings) {
            jsonData['savings'] = this.state.config.savings;
        }
        if (this.state.config.loans) {
            jsonData['loans'] = this.state.config.loans;
        }
        return jsonData;
    }

    render() {
        return (
            <>
                <Segment raised>
                    <Grid>
                        <Grid.Row centered>
                            <Header as="h4" textAlign="center">
                                <Header.Content>
                                    Настройки категорий 50/30/20
                                    <Header.Subheader>
                                        Выберите категории для каждого раздела
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Button id="base" icon labelPosition="left" onClick={this.onAdd} key="base1111">
                                    <Icon name="plus" />
                                    Базовые
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button id="life" icon labelPosition="left" onClick={this.onAdd}>
                                    <Icon name="plus" />
                                    Лайфстайл
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Button id="saving" icon labelPosition="left" onClick={this.onAdd}>
                                    <Icon name="plus" />
                                    Накопления
                                </Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Button id="loans" icon labelPosition="left" onClick={this.onAdd}>
                                    <Icon name="plus" />
                                    Долги
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Button id="calc" onClick={this.onCalc}>
                                    Посчитать
                                </Button>
                                <Button
                                    id="2018"
                                    toggle
                                    active={this.state.years.indexOf('2018') !== -1}
                                    onClick={this.onYearClick}
                                >
                                    2018
                                </Button>
                                <Button
                                    id="2019"
                                    toggle
                                    active={this.state.years.indexOf('2019') !== -1}
                                    onClick={this.onYearClick}
                                >
                                    2019
                                </Button>
                                <Button
                                    id="2020"
                                    toggle
                                    active={this.state.years.indexOf('2020') !== -1}
                                    onClick={this.onYearClick}
                                >
                                    2020
                                </Button>
                                <Button
                                    id="2021"
                                    toggle
                                    active={this.state.years.indexOf('2021') !== -1}
                                    onClick={this.onYearClick}
                                >
                                    2021
                                </Button>
                            </Grid.Column>
                            <Grid.Column>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <BudgetConfig
                    updateConfig={this.budgetChanged}
                    showBase={this.state.showBase}
                    showLife={this.state.showLife}
                    showSave={this.state.showSave}
                    showLoans={this.state.showLoans}
                />
            </>
        );
    }
}
