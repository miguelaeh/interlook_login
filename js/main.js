
(function ($) {
    "use strict";   

    /*==================================================================
    [ Send a post in the onsubmit to obtain tokens]*/
    $("form#formulario").submit(function(e){
        e.preventDefault();
        //done is when code is 200, other is fail.
         $.post('http://www.interlook.xyz/api/v1/login', $('#formulario').serialize())
         .done(function(data, status, xhr){
         	$("textarea#accessToken").val(data.token);
            $("textarea#refreshToken").val(data.refreshToken);

            $('button#copyAccessToken').click(function(){
                $("button#copyAccessToken").hide();
                $('textarea#accessToken').copyme();
            });
            $('button#copyRefreshToken').click(function(){
                $("button#copyRefreshToken").hide();
                $('textarea#refreshToken').copyme();
            });

            $("#loginDiv").hide();
            $("#showTokens").show();
         })
         .fail(function(xhr, status, error){
         	if(xhr.status === 401){
         		alert("Incorrect user or password.");
         	}else if(xhr.status === 423){
         		alert("Be sure to validate the user from the email before try to login.");
         	}else{
         		alert("An error has ocurred, please try again.");
         	}

         });





        return false;
    });


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);
