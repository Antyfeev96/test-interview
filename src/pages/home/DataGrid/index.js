import React, {useEffect, useState} from 'react';
import './styles.scss'

import {
    Column,
    DataGrid
} from 'devextreme-react/data-grid';
import data from "../../../data.json";

function Table({reportConfig}) {

    const [isEmpty, setIsEmpty] = useState()
    const depsString = JSON.stringify(reportConfig)

    useEffect(() => {
        const cond = reportConfig.some(item => item.visible)
        setIsEmpty(!cond)
    }, [depsString])

    return (
        <>
            {isEmpty && <div>Добавьте колонки для отображения</div>}
            {!isEmpty && <DataGrid
                className="data-grid-table"
                dataSource={data}
            >
                {reportConfig.map((config) =>
                    <Column
                        key={config.dataField}
                        data-id={config.caption}
                        {...config}
                    />
                )}
            </DataGrid>}
        </>
    );

}

export default Table;
