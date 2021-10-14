import React from 'react';
import { Segment, Grid, Divider } from 'semantic-ui-react';
import CategoryPlace from '../categoryPlace/categoryPlace';

function CategorySegment(props) {
    return (
        <Segment placeholder loading={props.loading}>
            <Grid columns={2} relaxed textAlign="center">
                <Divider vertical></Divider>
                <Grid.Row>
                    <CategoryPlace
                        list={props.leftColumn}
                        onChange={props.onLeftChange}
                        placeholder={props.leftText}
                    />
                    <CategoryPlace
                        list={props.rightColumn}
                        onChange={props.onRightChange}
                        placeholder={props.rightText}
                    />
                </Grid.Row>
            </Grid>
        </Segment>
    );
}

export default CategorySegment;
