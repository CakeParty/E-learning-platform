(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar');
    })
  }

  if (select('#login_but')) {
    on('click', '#login_but', function(e) {
      $('#form_email').val("");
      $('#form_pass').val("");
      swap_page('log_reg');
    })
  }

  if (select('.logo')){
    on('click', '.logo', function(e) {
      swap_page('main_page');
    })
  }

  if (select('#sidebar-nav')){
    on('click', '.nav-item', function(e) {
      let id = 0;

      for (const element of $('#sidebar-nav').children()) {
        if(element===$(this)[0]){
          if(!$(this).hasClass('dropdown')){
            for (const element of $('#sidebar-nav').children()) {
              if(element===$(this)[0]){
                break;
              }
              id++;
            }
            id++;
      
            block_acc('lesson_'+id);
          } 
        }
      } 
    }, true)
  }

  if (select('#prof_button')){
    on('click', '#prof_button', function(e) {
      refresh_scores();
      swap_page('prof_page');
    })
  }

  if (select('#admin_but')){
    on('click', '#admin_but', function(e) {
      swap_page('admin_page');
    })
  }

  if (select('#log_out_but')) {
    on('click', '#log_out_but', function(e) {
      $.ajax({
        type: "POST",
        url: "./assets/php/logout.php",
        dataType: "json",
        encode: true,
      }).done(function (data) {
        console.log('logout');
        check_login();
        swap_page('main_page');
      }).fail(function (data){
        console.log('logout - fail');
      });
    })
  }

  //LOGIN
  if (select('#login')) {
    on('click', '#login', function(e) {
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
           swap_page('main_page');
           check_login(); 
        } 
      }).fail(function (data){
        $("#form_help").html("Błąd połączenia, proszę spróbować później");     
      });
    })
  }
  
  //REGISTER
  if (select('#register')) {
    on('click', '#register', function(e) {
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
        url: "./assets/php/register.php",
        data: formData,
        dataType: "json",
        encode: true,
      }).done(function (data) {

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
          console.log("zarejestrowany");
          swap_page('main_page');
          check_login();
        } 
      }).fail(function (data){
        $("#form_help").html("Błąd połączenia, proszę spróbować później");     
      });
    })
  }

  //CHANGE PASSWORD
  if (select('#pass_change')) {
    on('click', '#pass_change', function(e) {
      
      $("#curr_pass").removeClass("is-invalid");
      $("#curr_pass_help").html("");

      $("#new_pass").removeClass("is-invalid");
      $("#new_pass_help").html("");

      $("#new_pass_check").removeClass("is-invalid");
      $("#new_pass_check_help").html("");

      $("#form_help2").html("");

      let formData = {
        curr_pass: $("#curr_pass").val(),
        new_pass: $("#new_pass").val(),
        new_pass_check: $("#new_pass_check").val(),
        email: $("#email_data").html()
      };

      $.ajax({
        type: "POST",
        url: "./assets/php/change_pass.php",
        data: formData,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        
        if (!data.success) {

          if(data.errors.curr_pass){
            $("#curr_pass").addClass("is-invalid");
            $("#curr_pass_help").html(data.errors.curr_pass);
          }

          if(data.errors.new_pass){
            $("#new_pass").addClass("is-invalid");
            $("#new_pass_help").html(data.errors.new_pass);
          }

          if(data.errors.new_pass_check){
            $("#new_pass_check").addClass("is-invalid");
            $("#new_pass_check_help").html(data.errors.new_pass_check);
          }

          if(data.errors.form_help2){
            $("#form_help2").html(data.errors.form_help2);
          }

        } else {
          $("#form_help2").html("Hasło zmienione pomyślnie");
        } 
      }).fail(function (data){
        $("#form_help2").html("Błąd połączenia, proszę spróbować później");     
      });
    })
  }
})();