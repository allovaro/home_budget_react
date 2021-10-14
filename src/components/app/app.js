import React, { Component } from 'react';
import {
    Button, Icon, Grid, Placeholder, Segment, Header, Statistic,
} from 'semantic-ui-react';
import CkService from '../../services/ckService';
import './app.css';

import BudgetConfig from '../budgetConfig/budgetConfig';

export default class App extends Component {
    coinkeeper = new CkService();

    state = {
        showBase: false,
        showLife: false,
        showSave: false,
        showLoans: false,
        calcBase: 0,
        calcLife: 0,
        calcLoans: 0,
        config: {},
    }

    budgetChanged = data => {
        this.setState({ config: data });
    }

    onAdd = event => {
        if (event.target.id === 'base') {
            this.setState({ showBase: true });
        } else if (event.target.id === 'life') {
            this.setState({ showLife: true });
        } else if (event.target.id === 'saving') {
            this.setState({ showSave: true });
        } else if (event.target.id === 'loans') {
            this.setState({ showLoans: true });
        }
    }

    onCalc = async () => {
        const jsonData = {
            date: {
                month: 0,
                year: 2021,
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
        const retVal = await this.coinkeeper.postRequest('get_statistics', jsonData);
        this.setState({
            calcBase: retVal.base.toFixed(2),
            calcLife: retVal.lifestyle.toFixed(2),
            calcLoans: retVal.loans,
        });
        console.log(retVal);
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
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Segment raised>
                                <Header as="h1">Результаты</Header>
                                <Statistic>
                                    <Statistic.Value>{this.state.calcBase}</Statistic.Value>
                                    <Statistic.Label>Базовые</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{this.state.calcLife}</Statistic.Value>
                                    <Statistic.Label>Лайфстайл</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>{this.state.calcLoans}</Statistic.Value>
                                    <Statistic.Label>Накопления/Долги</Statistic.Label>
                                </Statistic>
                            </Segment>
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
