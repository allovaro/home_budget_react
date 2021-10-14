import React, { Component } from 'react';
import BudgetCard from '../budgetCard/budgetCard';

export default class BudgetConfig extends Component {
    state = {
        config: {
            date: {
                month: 0,
                year: 2021,
            },
            base: {
                category: [],
                excludeTags: [],
            },
            lifestyle: {
                category: [],
                excludeTags: [],
            },
            loans: {
                category: [],
                excludeTags: [],
            },
            savings: {
                category: [],
                excludeTags: [],
            },
        },
    }

    budgetChanged = (data, type) => {
        if (type === 'base') {
            this.setState(prevState => {
                const newVal = prevState.config;
                newVal.base = data;
                return { config: newVal };
            });
        } else if (type === 'life') {
            this.setState(prevState => {
                const newVal = prevState.config;
                newVal.lifestyle = data;
                return { config: newVal };
            });
        } else if (type === 'save') {
            this.setState(prevState => {
                const newVal = prevState.config;
                newVal.savings = data;
                return { config: newVal };
            });
        } else if (type === 'loans') {
            this.setState(prevState => {
                const newVal = prevState.config;
                newVal.loans = data;
                return { config: newVal };
            });
        }
        this.props.updateConfig(this.state.config);
    }

    render() {
        const base = this.props.showBase ? <BudgetCard type="base" header="Базовые расходы" onChange={this.budgetChanged} /> : null;
        const lifestyle = this.props.showLife ? <BudgetCard type="life" header="Лайфстайл" onChange={this.budgetChanged} /> : null;
        const savings = this.props.showSave ? <BudgetCard type="save" header="Накопления" onChange={this.budgetChanged} /> : null;
        const loans = this.props.showLoans ? <BudgetCard type="loans" header="Долги" onChange={this.budgetChanged} /> : null;

        return (
            <>
                { base }
                { lifestyle }
                { savings }
                { loans }
            </>
        );
    }
}
