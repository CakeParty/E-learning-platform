function swap_page(page){
  $('main').children('div').each(function () {
    if($(this)[0].id!=page){
      if(!$(this).hasClass("d-none")){
        $(this).toggleClass('d-none');
      }
    } else {
      if($(this).hasClass("d-none")){
        $(this).toggleClass('d-none');
      }
    }
  });
}

function refresh_scores(){
  let lesson_count = $('#sidebar-nav')[0].childElementCount;
  let tests = {test_count: lesson_count};

  $.ajax({
        type: "POST",
        url: "./assets/php/refresh_scores.php",
        data: tests,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        if (data.success) {

          let bar_value = (data.test_succ/parseInt(data.test_count))*100;
          let scores = "<h5 class='card-title'>Wyniki</h5><div class='row py-2'><div class='col'><div class='progress'><div class='progress-bar progress-bar-striped progress-bar-animated' role='rogressbar' aria-valuenow='"+bar_value+"' aria-valuemin='0' aria-valuemax='100' style='width: "+bar_value+"%''>"+bar_value+"%</div></div></div></div>";

          for(let id=1; id<=lesson_count; id++){
            scores+='<div class="row py-1"><div class="col"><span class="label">Rozdział nr. '+id+'</span><span>: '+data.scores[id-1]+'</span></div><div class="col"><span class="label">Status: '+data.status[id-1]+'</span></div></div>';
          }

          $('#profile-overview').html('<div class="row py-1"><div class="col-lg-3 col-md-2 label">Email: </div><div class="col-lg-6 col-md-5" id="email_data">'+data.email+'</div></div><div class="row"><div class="col-lg-3 col-md-2 label">Dołączył(a): </div><div class="col-lg-6 col-md-5">'+data.joined+'</div></div>'+scores);

        } 
      }).fail(function (data){
        console.log('nigga');
        console.log(data);
      });
}

function check_login(block_acc){
  
  let lesson_count = $('#sidebar-nav')[0].childElementCount;
  let tests = {test_count: lesson_count};

  $.ajax({
        type: "POST",
        url: "./assets/php/check_login.php",
        data: tests,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        if (!data.success) {

          if(!$("#prof_list").hasClass("d-none")){
            $("#prof_list").toggleClass('d-none');
            $("#prof_list").toggleClass('d-flex');
          }

          if($("#login_but").hasClass("d-none")){
            $("#login_but").toggleClass('d-none');
            $("#login_but").toggleClass('d-flex');
          }

          if(block_acc){
            swap_page('main_page');
          }

        } else {

          const list = $(".email_display");
          for (const element of list) {
            element.innerHTML = data.email;
          }

          const list2 = $(".email_display_short");
          for (const element of list2) {
            element.innerHTML = data.email.slice(0,data.email.search("@"));
          }

          if(data.admin>0){
            $("#admin_but").removeClass('d-none');
            $("#admin_but").addClass('d-flex');
            $("#li_divider").removeClass('d-none');
          } else {
            $("#admin_but").addClass('d-none');
            $("#admin_but").removeClass('d-flex');
            $("#li_divider").addClass('d-none');
          }

          if($("#prof_list").hasClass("d-none")){

            $("#prof_list").toggleClass('d-none');
            $("#prof_list").toggleClass('d-flex');
          }

          if(!$("#log_but").hasClass("d-none")){

            $("#login_but").toggleClass('d-none');
            $("#login_but").toggleClass('d-flex');
          }

        } 
      }).fail(function (data){
        console.log(data);
      });
}

function block_acc(id){
  
  let lesson_count = $('#sidebar-nav')[0].childElementCount;
  let tests = {test_count: lesson_count};

  $.ajax({
        type: "POST",
        url: "./assets/php/block_acc.php",
        data: tests,
        dataType: "json",
        encode: true,
      }).done(function (data) {

        if (!data.success) {
          swap_page(id);
        } else {
          swap_page('log_reg');
        }
      }).fail(function (data){
        swap_page('log_reg');
      });
}