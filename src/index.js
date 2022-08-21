import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import {ConfigProvider} from 'antd'
import "lib-flexible"
if (!window.Promise) {
        window.Promise = Promise;
       }
ReactDOM.render(
        <ConfigProvider locale={zh_CN}>
        <App/>
        </ConfigProvider>
, document.getElementById('root'));
serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
