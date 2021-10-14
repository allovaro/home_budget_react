import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import TagList from '../tagList/tagList';

function CategoryPlace(props) {
    return (
        <Grid.Column>
            <Header>{props.placeholder}</Header>
            <TagList list={props.list} onChange={props.onChange} text={props.placeholder} />
        </Grid.Column>
    );
}

export default CategoryPlace;
