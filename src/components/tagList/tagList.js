import React from 'react';
import { Dropdown } from 'semantic-ui-react';

function TagList(props) {
    const items = props.list.map((item, i) => ({
        key: i,
        text: item,
        value: item,
    }));

    return (
        <Dropdown
            placeholder={props.text}
            multiple
            search
            fluid
            selection
            options={items}
            onChange={props.onChange}
        />
    );
}

export default TagList;
