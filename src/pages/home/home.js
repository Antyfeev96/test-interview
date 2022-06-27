import React, { useState } from 'react';
import './home.scss';
import reportConfig from '../../report-config.json'
import Table from "./DataGrid";
import ConfigEditor from './ConfigEditor'

export default function Home() {

    const [config, setConfig] = useState(reportConfig)

    return (
        <div className="content-block">
            <h2>Data Grid Report Editor</h2>
            <div className="main-container">
                <Table reportConfig={config} />
                <ConfigEditor setConfig={setConfig} reportConfig={config} />
            </div>
        </div>
    )
}
