import React, {useEffect, useState, memo} from 'react';
import './styles.scss'
import {Popup} from "devextreme-react/popup";
import Button from "devextreme-react/button";

function EditColumnNamePopup(props) {

    const { reportConfig, setConfig, oldColumnName, hideEditColumnPopup } = props

    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(oldColumnName)
    }, [oldColumnName])

    const onValueChange = (e) => {
        setValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if  (e.code === 'Enter') {
            return editColumnName()
        }
        onValueChange(e)
    }

    const editColumnName = () => {
        const tempConfig = JSON.parse(JSON.stringify(reportConfig))
        const configItem = tempConfig.find(item => item.dataField === oldColumnName)
        configItem.dataField = value
        setConfig(tempConfig)
        hideEditColumnPopup(false)
    }

    const renderContent = () => {

        return (
            <div className="container">
                <div className="input-container">
                    <label htmlFor="columnName">Введите новое имя колонки</label>
                    {value !== '' && <input
                        type="text"
                        name="columnName"
                        id="columnName"
                        value={value}
                        onChange={onValueChange}
                        onKeyPress={handleKeyPress}
                    />}
                </div>
                <Button icon="check" text="Применить" onClick={editColumnName}/>
            </div>
        )
    }

    return (
        <Popup
            {...props}
            width="50%"
            height="auto"
            className="popup-container"
            contentRender={renderContent}
            showCloseButton={true}
            showTitle={true}
            title="Изменение имени колонки"
            closeOnOutsideClick={true}
        />
    );
}

export default memo(EditColumnNamePopup);
