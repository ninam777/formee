// polyfills
require('es6-promise').polyfill();
require('whatwg-fetch');

// normalize.css
require('normalize.css');
import "./../styles/bootstrap.css";

// require your app here
require('debug-dude')('service').warn('require your app entry point plz');

import React from "react";
import ReactDOM from "react-dom";

import ReactTabs from "react-tabs";
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

import BasicOrderForm from "./basic-order-form.js";
import OptionsOrderForm from "./options-order-form.js";
import CustomOrderForm from "./custom-order-form.js";

import ZavrsavanjeZadatkaOdrzavanja from "./upravljanje-zadacima-odrzavanja/zavrsavanje/view.js";

class App extends React.Component {
    render() {
        return (
            <Tabs selectedIndex={2}>
                <TabList>
                    <Tab>Basic</Tab>
                    <Tab>Options</Tab>
                    <Tab>My order form</Tab>
                    <Tab>Zavrsavanja zadatka odrzavanja</Tab>
                </TabList>
                <TabPanel>
                    <BasicOrderForm />
                </TabPanel>
                <TabPanel>
                    <OptionsOrderForm />
                </TabPanel>
                <TabPanel>
                    <CustomOrderForm />
                </TabPanel>
                <TabPanel>
                    <ZavrsavanjeZadatkaOdrzavanja />
                </TabPanel>
            </Tabs>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
