$(document).ready(function() {

    var $form = $('#mc-embedded-subscribe-form-modal');
    $form.submit(function(e) {
        if (e) e.preventDefault()
        register($form)
    })

    var $form2 = $('#mc-embedded-subscribe-form');
    $form2.submit(function(e) {
        if (e) e.preventDefault()
        register($form2)
    })

})

function register($form) {
    let successField = $($form).parent().find("#mce-success-response")
    let errorField = $($form).parent().find("#mce-error-response")
    let inputField = $($form).parent().find("input.email")

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                // Something went wrong
                console.log(data)
                successField.hide()
                errorField.html(data.msg).show()
            } else {
                inputField.val('')
                errorField.hide()
                let message = data.msg
                if (message === "Thank you for subscribing!") { message = "Thanks - You're on the waitlist! We'll let you know when we publicly launch." }
                successField.html(message).show()
            }
        }
    });
}




