##JBootValidator

A fallback option that uses the html 5 required and pattern attributes to do validation when the browser doesn't support these features.

[Demo](http://benkiefer.github.io/jbootvalidator)

###Usage

Validate a single input.

     <input id="myInput" type="text" required pattern="\\d+"/>

     $('#myInput').validate();

Validate all inputs of a form each time that the element is focused on or changed.

    $('formSelector').jBootValidator();

With all parameters defined.

    $('formSelector').jBootValidator({
        validateOnSubmit : true,
        callback : function (form, e) {
            console.log('invoked');
        }
    });

###Options:

Name | Default | Description
-----|---------|-----------------------
validateOnSubmit | false | should all inputs be validated before submitting the form?
callback | no-op | function which should be invoked after submitting a form. Callback is invoked with form and event object.



