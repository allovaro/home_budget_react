import React, { Component } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import CkService from '../../services/ckService';
import TagList from '../tagList/tagList';
import ErrorMessage from '../errorMessage/errorMessage';

export default class BudgetCard extends Component {
    coinkeeper = new CkService();

    state = {
        loading: true,
        error: false,
        categoryList: [],
        tagList: [],
        accountList: [],
        configObject: {
            category: [],
            excludeTags: [],
        },
    }

    componentDidMount() {
        this.updateTags();
        this.updateCategories();
        this.updateAccounts();
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    onReady = () => {
        this.setState({
            loading: false,
        });
    }

    onCategoryChange = (event, data) => {
        this.setState(prevState => {
            const newState = {
                category: data.value,
                excludeTags: prevState.configObject.excludeTags,
            };
            return ({ configObject: newState });
        });
        const newConfig = this.state.configObject;
        newConfig.category = data.value;
        this.props.onChange(newConfig, this.props.type);
    }

    onTagChange = (event, data) => {
        this.setState(prevState => {
            const newState = {
                category: prevState.configObject.category,
                excludeTags: data.value,
            };
            return ({ configObject: newState });
        });
        const newConfig = this.state.configObject;
        newConfig.excludeTags = data.value;
        this.props.onChange(newConfig, this.props.type);
    }

    updateTags = async () => {
        try {
            const tags2018 = await this.coinkeeper.getRequest('get_all_tags/2018');
            const tags2019 = await this.coinkeeper.getRequest('get_all_tags/2019');
            const tags2020 = await this.coinkeeper.getRequest('get_all_tags/2020');
            const tags2021 = await this.coinkeeper.getRequest('get_all_tags/2021');
            const newVal = [...new Set([
                ...tags2018.allTags,
                ...tags2019.allTags,
                ...tags2020.allTags,
                ...tags2021.allTags])];
            this.setState({ tagList: newVal });
            this.onReady();
        } catch (error) {
            this.onError();
        }
    }

    updateCategories = async () => {
        try {
            const categories2018 = await this.coinkeeper.getRequest('get_categories/2018');
            const categories2019 = await this.coinkeeper.getRequest('get_categories/2019');
            const categories2020 = await this.coinkeeper.getRequest('get_categories/2020');
            const categories2021 = await this.coinkeeper.getRequest('get_categories/2021');
            const newVal = [...new Set([
                ...categories2018.categories,
                ...categories2019.categories,
                ...categories2020.categories,
                ...categories2021.categories])];
            this.setState({ categoryList: newVal });
        } catch (error) {
            this.onError();
        }
    }

    updateAccounts = async () => {
        try {
            const accounts2018 = await this.coinkeeper.getRequest('get_accounts/2018');
            const accounts2019 = await this.coinkeeper.getRequest('get_accounts/2019');
            const accounts2020 = await this.coinkeeper.getRequest('get_accounts/2020');
            const accounts2021 = await this.coinkeeper.getRequest('get_accounts/2021');
            const newVal = [...new Set([
                ...accounts2018.categories,
                ...accounts2019.categories,
                ...accounts2020.categories,
                ...accounts2021.categories])];
            this.setState({ accountList: newVal });
        } catch (error) {
            this.onError();
        }
    }

    render() {
        if (this.state.error) {
            return (<ErrorMessage />);
        }

        return (
            <Segment raised loading={this.state.loading}>
                <Grid>
                    <Grid.Row centered>
                        <Header>{this.props.header}</Header>
                    </Grid.Row>
                    <Grid.Row columns={2} divided>
                        <Grid.Column textAlign="center">
                            <TagList
                                list={this.props.type === 'loans' || this.props.type === 'save' ? this.state.accountList : this.state.categoryList}
                                onChange={this.onCategoryChange}
                                text="Категории"
                            />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <TagList
                                list={this.state.tagList}
                                onChange={this.onTagChange}
                                text="Теги"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
