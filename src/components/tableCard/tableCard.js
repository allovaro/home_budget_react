import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';

function TableCard(props) {
    const { result, current } = props;
    const dataConfig = {
        base: false,
        life: false,
        loans: false,
        saving: false,
    };
    // console.log(result);

    const months = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
    };

    const headerArr = [];
    if (!props.visible) {
        return null;
    }

    if (Object.keys(result[current].baseMonths).length !== 0) {
        headerArr.push(
            <Table.HeaderCell>Базовые, руб</Table.HeaderCell>,
        );
        dataConfig.base = true;
    }
    if (Object.keys(result[current].lifeMonths).length !== 0) {
        headerArr.push(
            <Table.HeaderCell>Лайфстайл, руб</Table.HeaderCell>,
        );
        dataConfig.life = true;
    }
    if (Object.keys(result[current].loansMonths).length !== 0) {
        headerArr.push(
            <Table.HeaderCell>Долги, руб</Table.HeaderCell>,
        );
        dataConfig.loans = true;
    }
    if (Object.keys(result[current].savingsMonths).length !== 0) {
        headerArr.push(
            <Table.HeaderCell>Накопления, руб</Table.HeaderCell>,
        );
        dataConfig.saving = true;
    }

    const formRow = data => (
        <Table.Row>
            <Table.Cell>
                <Header as="h5" textAlign="center">
                    {data.month}
                </Header>
            </Table.Cell>
            <Table.Cell singleLine>{data.sum}</Table.Cell>
            {dataConfig.base ? <Table.Cell>{data.base}</Table.Cell> : null}
            {dataConfig.life ? <Table.Cell>{data.life}</Table.Cell> : null}
            {dataConfig.loans ? <Table.Cell>{data.loans}</Table.Cell> : null}
            {dataConfig.savings ? <Table.Cell>{data.savings}</Table.Cell> : null}
        </Table.Row>
    );

    const rows = () => {
        const rowData = {
            month: '',
            sum: 0,
            base: '0',
            life: '0',
            loans: '0',
            savings: '0',
        };
        const arr = [];
        Object.keys(months).forEach(key => {
            rowData.sum = 0;
            rowData.month = '';
            rowData.base = '0';
            rowData.life = '0';
            rowData.loans = '0';
            rowData.savings = '0';
            let sum = 0;
            if (result[current].baseMonths[key]) {
                rowData.month = months[key];
                rowData.base = result[current].baseMonths[key].toFixed(0);
                sum += result[current].baseMonths[key];
            }
            if (result[current].lifeMonths[key]) {
                rowData.month = months[key];
                rowData.life = result[current].lifeMonths[key].toFixed(0);
                sum += result[current].lifeMonths[key];
            }
            if (result[current].loansMonths[key]) {
                rowData.month = months[key];
                rowData.loans = result[current].loansMonths[key].toFixed(0);
                sum += result[current].loansMonths[key];
            }
            if (result[current].savingsMonths[key]) {
                rowData.month = months[key];
                rowData.savings = result[current].savingsMonths[key].toFixed(0);
                sum += result[current].savingsMonths[key];
            }
            rowData.sum = sum.toFixed(0);
            if (sum !== 0) {
                arr.push(formRow(rowData));
            }
        });

        return arr;
    };

    return (
        <Segment raised>
            <Header textAlign="center" as="h3">Подробная статистика</Header>
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Месяц</Table.HeaderCell>
                        <Table.HeaderCell>Всего, руб</Table.HeaderCell>
                        {headerArr}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows()}
                </Table.Body>
            </Table>
        </Segment>

    );
}

export default TableCard;
