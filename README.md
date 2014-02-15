##JBootValidator (WIP)

IE 8 and 9 make me sad. They don't support either the "required" or "pattern" attributes that help make client side form validation easier.

I'm going to throw this together as a quick fall-back for when I can't let the browser do it's job.

[Demo](http://benkiefer.github.io/jbootvalidator)

###Todo
 - bind to blur so that tabbing off a value fires the validate event.
 - add test coverage for submit logic to make sure that both inputs and selects are validated
 - fix select box so that it is in a separate rule.
 - add test coverage for when required is removed from and added to an input after jbootvalidator has been initialized.