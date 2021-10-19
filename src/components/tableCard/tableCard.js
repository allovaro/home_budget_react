import React from 'react';
import { Table, Header, Rating } from 'semantic-ui-react';

function TableCard(props) {
    const { result, current } = props;
    // console.log(result);

    const headerArr = [];
    if (!props.visible) {
        return null;
    }
    console.log(result[current].baseMonths);
    console.log(result[current].lifeMonths);
    if (result[current].baseMonths) {
        headerArr.push(
            <Table.HeaderCell>Базовые, руб</Table.HeaderCell>,
        );
    }
    if (result[current].lifeMonths) {
        headerArr.push(
            <Table.HeaderCell>Лайфстайл, руб</Table.HeaderCell>,
        );
    }
    if (result[current].loansMonths) {
        headerArr.push(
            <Table.HeaderCell>Долги, руб</Table.HeaderCell>,
        );
    }
    if (result[current].savingsMonths) {
        headerArr.push(
            <Table.HeaderCell>Накопления, руб</Table.HeaderCell>,
        );
    }
    // for (key in result.baseMonths) {
    //     if (key === '')

    //     result.baseMonths[key]
    // }
    // const headerArr = () => {
    //     const arr = [];

    // }
    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Месяц</Table.HeaderCell>
                    <Table.HeaderCell>Всего, руб</Table.HeaderCell>
                    {headerArr}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as="h2" textAlign="center">
                            A
                        </Header>
                    </Table.Cell>
                    <Table.Cell singleLine>Power Output</Table.Cell>
                    <Table.Cell>
                        <Rating icon="star" defaultRating={3} maxRating={3} />
                    </Table.Cell>
                    <Table.Cell>
                        <Rating icon="star" defaultRating={3} maxRating={3} />
                    </Table.Cell>
                    <Table.Cell>
                        <Rating icon="star" defaultRating={3} maxRating={3} />
                    </Table.Cell>
                    <Table.Cell>
                        <Rating icon="star" defaultRating={3} maxRating={3} />
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

export default TableCard;
