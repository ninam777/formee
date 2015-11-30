import React from "react";

import t from "tcomb-form";
var Form = t.form.Form;

import Order from "./order-model.js";

class OptionsOrderForm extends React.Component {
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
        var options = {
            auto: "placeholders",
            order: ["status", "description", "activatedDate", "isReduction", "items", "billingAddress", "payments"],
            i18n: Object.assign({}, t.form.Form.i18n, {optional: "", required: "*"}),
            fields: {
                status: {
                    nullOption: {value: "", text: "Choose status..."},
                    factory: t.form.Radio
                },
                description: {
                    disabled: true
                },
                activatedDate: {
                    order: ["D", "M", "YY"]
                },
                billingAddress: {
                  fields: {
                      street: {
                          error: function (value, path, context) {
                              console.log("street error func arguments:")
                              console.log({value, path, context});
                              return value + " is a bad value for street";
                          }
                      }
                  }
                },
                items: {
                    auto: "none",
                    disableOrder: true,
                    item: {
                        fields: {
                            description: {
                                auto: "auto",
                                label: "Item description"
                            }
                        }
                    }
                },
                payments: {
                    legend: "Payment methods",
                    factory: t.form.Select
                }
            }
        };

        return (
            <div>
                <Form
                    ref="form"
                    type={Order}
                    options={options}
                    value={this.state.orderFormValue}
                    onChange={this.onChange.bind(this)}
                    />
                <button onClick={this.save.bind(this)}>Save</button>
            </div>
        );
    }
}

export default OptionsOrderForm;