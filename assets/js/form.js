$(document).ready(function () {
  $("form").submit(function (event) {
    
    $("#form_email").removeClass("is-invalid");
    $("#form_email_help").html("");

    $("#form_pass").removeClass("is-invalid");
    $("#form_pass_help").html("");
    $("#form_help").html("");

    var formData = {
      pass: $("#form_pass").val(),
      email: $("#form_email").val(),
    };

    $.ajax({
      type: "POST",
      url: "./assets/php/login.php",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
      if (!data.success) {
       
        if(data.errors.email){
          $("#form_email").addClass("is-invalid");
          $("#form_email_help").html(data.errors.email);
        }

        if(data.errors.pass){
          $("#form_pass").addClass("is-invalid");
          $("#form_pass_help").html(data.errors.pass);        
        }

        if(data.errors.user){
          $("#form_help").html(data.errors.user);     
        }
      } else {
        $("#form_help").html(data.conn);  
      } 
    }).fail(function (data){
      $("#form_help").html("Błąd połączenia, proszę spróbować później");     
    });
    event.preventDefault();
  });
});