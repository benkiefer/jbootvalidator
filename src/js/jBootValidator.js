(function ($) {
    $.fn.jBootValidator = function () {
        return this.find('input.form-control').bind('keyup', function (e) {
            var val = $(this).val();
			if($(this).attr('required')){
                if (val == null || val == ''){
                    $(this).after('<span class="help-block">This field is required.</span>')
                        .parent('.form-group').addClass('has-error')
                }
            }
        });
    };
}(jQuery));

