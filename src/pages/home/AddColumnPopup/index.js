import React, {useCallback} from 'react';
import './styles.scss'
import {Popup} from "devextreme-react/popup";

function AddColumnPopup(props) {

    const { reportConfig, setConfig } = props

    const depsString = JSON.stringify(reportConfig)

    const renderContent = useCallback(() => {

        const addColumn = (e) => {
            const columnElem = e.target.closest('[data-column]')
            if (!columnElem) return;
            const { column } = columnElem.dataset
            const tempConfig = JSON.parse(JSON.stringify(reportConfig))
            const configItem =  tempConfig.find(item => item.dataField === column)
            configItem.visible = true
            setConfig(tempConfig)
        }

        const emptyCondition = reportConfig.every(({visible}) => visible)

        return (
            <>
                <div className="config-list">
                    {
                        !emptyCondition && reportConfig
                            .filter(({visible}) => !visible)
                            .map(({dataField}) =>
                                <div className="config-item" data-column={dataField} key={dataField} onClick={addColumn}>
                                    <span>{dataField}</span>
                                    <i className="dx-icon-check"/>
                                </div>
                            )
                    }
                </div>
                {
                    emptyCondition && <div>Вы выбрали все доступные колонки</div>
                }
            </>
        )
    }, [depsString])

    return (
        <Popup
            {...props}
            width="50%"
            height="auto"
            contentRender={renderContent}
            className="popup-container"
            showCloseButton={true}
            showTitle={true}
            title="Доступные колонки"
            closeOnOutsideClick={true}
        />
    );
}

export default AddColumnPopup;
