import React from "react";

import t from "tcomb-form";
var Form = t.form.Form;

import ReactTabs from "react-tabs";
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

import ZadatakOdrzavanjaDef from "./model-def.js";
import zadatakOdrzavanja from "./model.js";

function zavrsavanjeZadatkaOdrzavanjaTemplate(locals) {
    console.log(locals);
    return (
        <Tabs selectedIndex={0}>
            <TabList>
                <Tab>Zadatak</Tab>
                <Tab>Lista odrzavanja</Tab>
                <Tab>Nalaz</Tab>
            </TabList>
            <TabPanel>
                <div className="row">
                    <div className="col-md-6">
                        <fieldset>
                            {locals.inputs.tipElementaOdrzavanja}
                            {locals.inputs.elementOdrzavanja}
                            {locals.inputs.vrstaOdrzavanja}
                            {locals.inputs.dodeljeniPeriod}
                            {locals.inputs.brojRadnogNaloga}
                        </fieldset>
                    </div>
                    <div className="col-md-6">
                        <fieldset>
                            {locals.inputs.odgovornoLice}
                            {locals.inputs.izvrsioci}
                        </fieldset>
                    </div>
                </div>
            </TabPanel>
            <TabPanel />
            <TabPanel />
        </Tabs>
    );
}

function horizontalPeriodTemplate(locals) {
    return (
        <div className="form-group form-group-depth-1">
            <label className="control-label">{locals.label}</label>
            <div className="center-block">
                <div className="pull-left">{locals.inputs.od}</div>
                <div className="pull-left">{locals.inputs.do}</div>
            </div>
        </div>
    );
}

function zaposleniImpePrezimeTemplate(locals) {
    return (
        <div className="form-group form-group-depth-1">
            <label className="control-label">{locals.label}</label>
            <input className="form-control" value={locals.value.ime + " " + locals.value.prezime} disabled={true} />
        </div>
    );
}

function izborZaposlenihTemplate(locals) {
    return (
        <div className="form-group form-group-depth-1">
            <label className="control-label">{locals.label}</label>
            <input className="form-control" value={locals.value.ime + " " + locals.value.prezime} disabled={true} />
        </div>
    );
}

var formOptions = {
    template: zavrsavanjeZadatkaOdrzavanjaTemplate,
    fields:{
        tipElementaOdrzavanja: {
            disabled: true
        },
        elementOdrzavanja: {
            disabled: true
        },
        vrstaOdrzavanja: {
            disabled: true
        },
        dodeljeniPeriod: {
            template: horizontalPeriodTemplate,
            label: "Period izvrsavanja",
            disabled: true,
            auto: "none",
            fields: {
                od: {
                    disabled: true
                },
                do: {
                    disabled: true
                }
            }
        },
        odgovornoLice: {
            disabled: true,
            template: zaposleniImpePrezimeTemplate
        },
        izvrsioci: {
            disableOrder: true,
            item: {
                factory: t.form.Textbox
            }
        }
    }
};

class ZavrsavanjeZadatkaOdrzavanja extends React.Component {
    constructor() {
        super();
        this.state = {
            zadatakOdrzavanjaValue: zadatakOdrzavanja
        }
    }
    save() {
        var value = this.refs.form.getValue();
        if (value)
            console.log(value);
        else {
            var validationResult = this.refs.form.validate();
            console.log(validationResult);
        }
    }
    onChange(value, path, kind){
        console.log({
            value,
            path,
            kind,
            component: this.refs.form.getComponent(path)
        });
        this.setState({zadatakOdrzavanjaValue:value});
    }
    render() {
        return (
            <div>
                <Form
                    ref="form"
                    type={ZadatakOdrzavanjaDef}
                    value={this.state.zadatakOdrzavanjaValue}
                    onChange={this.onChange.bind(this)}
                    options={formOptions}
                    />
                <button onClick={this.save.bind(this)}>Save</button>
            </div>
        );
    }
}

export default ZavrsavanjeZadatkaOdrzavanja;