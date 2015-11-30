/**
 * Created by mnedeljkovic on 10/31/2015.
 */
import t from "tcomb-form";
import DatePicker from "react-datepicker";

var datePicker = function datepicker(locals) {
    console.log(locals);
    console.log(moment(locals.value));

    //TODO: check for better null value recognizing
    var value = (isNull(locals.value) ? null : locals.value);
    console.log(value);
    return (
        <div>
            <div style={{color: (locals.hasError) ? "red" : "black"}}>{locals.label}</div>
            <DatePicker
                selected={value && moment(value)}
                onChange={(value) => locals.onChange.call(null, (value) ? value.toArray() : [null, null, null])}
                isClearable={true}/>
            <div style={{color: "red"}}>{(locals.hasError) ? locals.error : null}</div>
        </div>
    )
};

var PositiveNumber = t.refinement(t.Number, function (n) {
    return n >= 0;
});
PositiveNumber.getValidationErrorMessage = function(value, path, context) {
    console.log("Invalid positive number: ");
    console.log({value, path, context});
    return value + " is not a valid positive number";
}

var OrderStatus = t.enums({
    "REG": "Registered",
    "FIN": "Finished"
})

var DeliveryMethod = t.enums({
    "SHIP": "ship",
    "TRC": "truck",
    "APL": "airplane",
    "TRN": "train"
})

var Address = t.struct({
    street: t.String,
    number: t.String,
    zip: t.maybe(t.String),
    country: t.String
});

var OrderItem = t.struct({
    orderNumber: t.Number,
    id: t.Number,
    details: t.String,
    measure: t.String,
    quantity: PositiveNumber,
    price: PositiveNumber,
    summaryPrice: PositiveNumber,
});

var Company = t.struct({
    name: t.String,
    town: t.String,
    adress: Address
});

var Order = t.struct({
    myCompany: Company,
    partnerCompany: Company,    
    number: t.Number,
    billNumber: t.Number,
    deliveryDate: t.Date,
    deliveryType: DeliveryMethod,
    items: t.list(OrderItem),
    distributor: t.String
    });

export default Order;
