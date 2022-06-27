import React, {useEffect, useState} from 'react';
import Button from "devextreme-react/button";
import './styles.scss'
import AddColumnPopup from "../AddColumnPopup";
import EditColumnNamePopup from "../ChangeColumnNamePopup";

function ConfigEditor({reportConfig, setConfig}) {

    const [isEditColumnPopupVisible, setEditColumnPopupVisibility] = useState(false);
    const [isAddColumnPopupVisible, setAddColumnPopupVisibility] = useState(false);
    const [oldColumnName, setOldColumnName] = useState(null)

    useEffect(() => {
        if (!oldColumnName) return;
        setEditColumnPopupVisibility(true);
    }, [oldColumnName])

    const toggleAddColumnVisible = () => {
        setAddColumnPopupVisibility(prev => !prev)
    }

    const showEditColumnPopup = (column) => {
        setOldColumnName(column)
    };

    const hideEditColumnPopup = () => {
        setEditColumnPopupVisibility(false)
        setOldColumnName('')
    }

    const handleClickButton = (e) => {
        const button = e.target.closest('.dx-icon-trash') || e.target.closest('.dx-icon-edit')
        if (!button) return;
        const { role } = button.dataset
        const { column } = button.dataset
        if (role === 'hide') {
            hideConfigElement(column)
        }
        if (role === 'edit') {
            showEditColumnPopup(column)
        }
    }

    const hideConfigElement = (column) => {
        const tempConfig = JSON.parse(JSON.stringify(reportConfig))
        const configItem = tempConfig.find(item => item.dataField === column)
        configItem.visible = false
        setConfig(tempConfig)
    }

    return (
        <>
            <div className="config-editor">
                <div className="config-editor__title">Список колонок</div>
                <div className="columns-list" onClick={handleClickButton}>
                    {reportConfig
                        .filter(({visible}) => visible)
                        .map(({dataField}) =>
                            <div key={dataField} className="columns-list__item">
                                <div>{dataField}</div>
                                <i className="dx-icon-trash" data-role="hide" data-column={dataField} />
                                <i className="dx-icon-edit" data-role="edit" data-column={dataField} />
                            </div>
                        )}
                </div>
                <Button onClick={toggleAddColumnVisible} disabled={reportConfig.every(({ visible }) => visible)}>Добавить колонку</Button>
            </div>
            <AddColumnPopup
                visible={isAddColumnPopupVisible}
                onHiding={toggleAddColumnVisible}
                reportConfig={reportConfig}
                setConfig={setConfig}
            />
            <EditColumnNamePopup
                oldColumnName={oldColumnName}
                visible={isEditColumnPopupVisible}
                onHiding={hideEditColumnPopup}
                hideEditColumnPopup={hideEditColumnPopup}
                reportConfig={reportConfig}
                setConfig={setConfig}
            />
        </>
    );
}

export default ConfigEditor;
