import React from 'react';
import { Segment, Message } from 'semantic-ui-react';

function ErrorMessage() {
    return (
        <Segment>
            <Message negative>
                <Message.Header>Ошибка :(</Message.Header>
                <p>Простите что-то пошло не так</p>
            </Message>
        </Segment>
    );
}

export default ErrorMessage;
