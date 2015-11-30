import React from "react";

import t from "tcomb-form";
var Form = t.form.Form;

import Order from "./order-model.js";

class BasicOrderForm extends React.Component {
    constructor() {
        super();
        this.state = {
            orderFormValue: {
                activatedDate: new Date()
            }
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
        this.setState({orderFormValue:value});
    }
    render() {
        return (
            <div>
                <Form
                    ref="form"
                    type={Order}
                    value={this.state.orderFormValue}
                    onChange={this.onChange.bind(this)}
                    />
                <button onClick={this.save.bind(this)}>Save</button>
            </div>
        );
    }
}

export default BasicOrderForm;