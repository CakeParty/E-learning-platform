async function generate_lessons(){

    await $.getJSON('./assets/lessons/less.json', function(jf) {
      for(let item in jf){
        
        const elementExists = document.getElementById(item) !== null;
        if (elementExists) {
          console.log('był');
          document.getElementById(item).remove();
        }

        let title = '<h5 class="card-title">'+jf[item]['nazwa']+'</h5>';
        let content = '<div class="row pb-2"><span>'+jf[item]['content']+'</span></div>';
        let link = '<div class="row"><h6>Link do udostępnionej lekcji:</h6><a href="'+jf[item]['link']+'" target="blank" class="link-primary">'+jf[item]['nazwa']+'</a></div>';
        let download = '<div class="row"><h6>Link do pobrania lekcji</h6><a href="'+jf[item]['file']+'" class="link-primary" download>Plik do pobrania</a></div>';
        let test = '<div class="row"><div class="col"><button type="button" id="test_'+item+'" class="btn btn-primary btn-sm">Rozpocznij test</button></div></div>';
        $('#main').append('<div class="row d-none" id="'+item+'"></div>');
        $('#'+item).append('<div class="col-10 justify-content-center offset-1"><div class="card info-card"><div class="card-body">'+title+'<div class="d-flex align-items-center"><div class="text-center col">'+content+link+download+test+'</div></div></div></div></div>');
      }
    });
}

async function generate_tests(){
    await $.getJSON('./assets/lessons/tests.json', function(jf) {
      for(let test in Object.entries(jf)){

        let name = Object.entries(jf)[test]['0'];
        let q_a = [];

        const elementExists = document.getElementById(name) !== null;
        if (elementExists) {
          document.getElementById(name).remove();
        }

        for(let question in Object.entries(jf)[test]['1']){
          q_a.push(Object.entries(jf)[test]['1'][question]);
        } 

        let title = "<h5 class='card-title'>"+q_a['0'].title+"</h5>";
        q_a.shift();

        let q_num = 1;
        let questions_div = "";
        let q_id = 0;

        do {

          const id = Math.floor(Math.random() * q_a.length);
          
          let answers = "<div class='col-sm-8'>";
          
          let ans_id=1;
          for(let ans in q_a[id].answers){
            let value = "";
            let type_name = "";
            if(q_a[id].type=='checkbox'){
              value = q_a[id].ans_num+"_"+q_a[id].answers[ans].correct;
              type_name = "grid_"+q_id+"_"+q_a[id].type+"[]";
            } else {
              value = q_a[id].answers[ans].correct;
              type_name = "grid_"+q_id+"_"+q_a[id].type;
            }
    
            answers+="<div class='form-check'><input class='form-check-input' type="+q_a[id].type+" name='"+type_name+"' id='"+name+"_q_"+q_id+"_"+ans_id+"' value='"+value+"'><label class='form-check-label' for='"+name+"_q_"+q_id+"_"+ans_id+"'> "+q_a[id].answers[ans].text+"</label></div>";
            ans_id++;
          }

          answers+="</div>";
          questions_div += "<div class='row mb-3'><label class='col-form-label'>"+q_num+". "+q_a[id].question+"</label>"+answers+"</div>";
          
          q_num++;
          q_id++;
          q_a.splice(id, 1);
        } while (q_a.length>0)   
        
        let sub_button = "<div class='row mb-3'><div class='col text-center'><button type='button' class='btn btn-primary' id="+Object.keys(jf)[test]+"_sub>Zakończ test</button></div></div>";
        let hidden_input = "<input type='hidden' name='grid_hidden' value='"+(q_num-1)+"'>";
      
        $('#main').append('<div class="row d-none" id="'+name+'"></div>');
        $('#'+name).append('<div class="col-8 justify-content-center offset-2"><div class="card info-card"><div class="card-body">'+title+'<form action="" id="form_'+name+'" method="POST">'+questions_div+sub_button+hidden_input+'</form></div></div></div>');
      }
    });
}

async function gen_lessons_tools() {
  await $.getJSON('./assets/lessons/less.json', function(jf) {
      
      let lesson_count = $('#sidebar-nav')[0].childElementCount;
      let active = 'active';
      for (let x = 1; x <= lesson_count; x++) {
        if (x>1) active = ""; 
        $('#lessons_list').append("<li class='nav-item'><button class='nav-link "+active+"' data-bs-toggle='tab' data-bs-target='#lesson_"+x+"_tab-overview'>Lekcja "+x+"</button></li>");
        $('#lessons_divs').append("<div class='tab-pane fade show "+active+"' id='lesson_"+x+"_tab-overview'></div>");
        
        let topic = "<div class='row mb-3'><label for='lesson_"+x+"_tab-overview-topic' class='col-md-4 col-lg-3 col-form-label'>Temat</label><div class='col-md-8 col-lg-9'><input type='text' class='form-control' name='topic' id='lesson_"+x+"_tab-overview-topic'></div></div>";
        let content = "<div class='row mb-3'><label for='lesson_"+x+"_tab-overview-content' class='col-md-4 col-lg-3 col-form-label'>Zawartość</label><div class='col-md-8 col-lg-9'><textarea class='form-control' name='content' style='height: 90px;' id='lesson_"+x+"_tab-overview-content'></textarea></div></div>"
        let link = "<div class='row mb-3'><label for='lesson_"+x+"_tab-overview-link' class='col-md-4 col-lg-3 col-form-label'>Link do lekcji</label><div class='col-md-8 col-lg-9'><input type='text' class='form-control' name='link' id='lesson_"+x+"_tab-overview-link'></div></div>";
        let file = "<div class='row mb-3'><label for='lesson_"+x+"_tab-overview-file' class='col-md-4 col-lg-3 col-form-label'>Plik</label><div class='col-md-8 col-lg-9'><input type='file' class='form-control' name='file' id='lesson_"+x+"_tab-overview-file'></div><div id='form_lesson_"+x+"_help' class='form-text'></div></div>";
        let submit = "<div class='text-center'><button type='button' class='btn btn-primary' id='lesson_"+x+"_tab-overview-submit'>Zatwierdź zmiany</button></div>";
        $('#lesson_'+x+'_tab-overview').append("<h5 class='card-title'>Treść lekcji</h5><form action='' method='POST' id='lesson_"+x+"_tab-overview-form' class='pb-4'>"+topic+content+link+file+submit+"</form>");
      }

      for(let item in jf){
        let x = item.slice(-1);
        $("#lesson_"+x+"_tab-overview-topic").val(jf[item]['nazwa']);
        $("#lesson_"+x+"_tab-overview-content").val(jf[item]['content']);
        $("#lesson_"+x+"_tab-overview-link").val(jf[item]['link']);
        $("#lesson_"+x+"_tab-overview").append("<h5 class='card-title py-4 border-top'>Test lekcji</h5>");
      }
    });
}

async function gen_tests_tools() {
  await $.getJSON('./assets/lessons/tests.json', function(jf) {

    let lesson_count = $('#sidebar-nav')[0].childElementCount;
    for (let x = 1; x <= lesson_count; x++) {
        
      const elementExists = document.getElementById("test_"+x+"_tab-overview-form") !== null;
      if (elementExists) {
        document.getElementById("test_"+x+"_tab-overview-form").remove();
      }

      let test_div = "";
      if((jf)['test_'+x]){

        let test = Object.entries(jf)[Object.keys(jf).indexOf('test_'+x)];;
        let id = 0;

        for(question in test['1']){
            
          if(test['1'][question]['question']){
           
            let question_div = "<div id='test_"+x+"_q_"+id+"'><div class='row mb-3 py-4 border-top'><label for='test_"+x+"_q_"+id+"_tab-overview-question' class='col-md-3 col-lg-3 col-form-label'>Pytanie</label><div class='col-md-8 col-lg-8'><input type='text' class='form-control' name='question_"+id+"' id='test_"+x+"_q_"+id+"_tab-overview-question' value='"+test['1'][question]['question']+"'></div><div class='col-md-1 col-lg-1'><button type='button' class='btn btn-danger' id='test_"+x+"_q_"+id+"_tab-overview-q-delete'><i class='bi bi-x-square fa-lg'></i></button></div></div>";
            test_div+=question_div;

            for(answer in test['1'][question]['answers']){
              
              let checked = "";

              if(test['1'][question]['answers'][answer]['correct'] == 1) checked = "checked";

              let if_check = "";
              if(test['1'][question]['type']=='checkbox'){
                if_check = '[]';
              } else {
                if_check = '';
              }

              let answer_div = "<div class='row mb-3'><label for='test_"+x+"_q_"+id+"_ans_"+answer+"_tab-overview-answer' class='col-md-3 col-lg-3 col-form-label'>Odpowiedz</label><div class='col-md-7 col-lg-7'><input type='text' class='form-control' name='q_"+id+"_ans_"+answer+"' id='test_"+x+"_q_"+id+"_ans_"+answer+"_tab-overview-answer' value='"+test['1'][question]['answers'][answer]['text']+"'></div><div class='col-md-1 col-lg-1 d-flex justify-content-center'><input type='"+test['1'][question]['type']+"' class='form-check-input my-auto' name='t_"+x+"_q_"+id+"_ans"+if_check+"' value='q_"+id+"_ans_"+answer+"' id='test_"+x+"_q_"+id+"_ans_"+answer+"_tab-overview-correct' "+checked+"></div><div class='col-md-1 col-lg-1'><button type='button' class='btn btn-danger' id='test_"+x+"_q_"+id+"_ans_"+answer+"_tab-overview-ans-delete'><i class='bi bi-x-square fa-lg'></i></button></div></div>";
              test_div+=answer_div;

              let ans_type = "<input type='hidden' class='form-control' name='q_"+id+"_type' value='"+test['1'][question]['type']+"'>";
              test_div+=ans_type;
            }

            let add_ans = "<div class='text-center pb-4'><button type='button' class='btn btn-primary' id='t_"+x+"_q_"+id+"_add-ans'><i class='bi bi-plus-square mx-2'></i>Dodaj odpowiedź</button></div>";
            test_div+=add_ans+"</div>";
          }
          id++;
        }
      }

      let add_q = "<div class='text-center py-4 border-top'><button type='button' class='btn btn-primary mx-2' id='t_"+x+"_add-radio'><i class='bi bi-plus-square mx-2'></i>Dodaj pytanie radio</button><button type='button' class='btn btn-primary' id='t_"+x+"_add-checkbox'><i class='bi bi-plus-square mx-2'></i>Dodaj pytanie checkbox</button></div>"
      let submit = "<div class='text-center py-4 border-top'><button type='button' class='btn btn-primary' id='t_"+x+"_test_submit'>Zatwierdź zmiany</button></div></div>";
      test_div+=add_q;
      test_div+=submit;

      $('#lesson_'+x+'_tab-overview').append("<form action='' method='POST' id='test_"+x+"_tab-overview-form'>"+test_div+"</form>");
    }
  });
}

function submit_test(id){

  let datastring = $("#"+id).serializeArray();
  datastring.push({name: 'test_id', value: id.slice(-1)});
  document.getElementById(id).reset();

  $.ajax({
    type: "POST",
    url: "./assets/php/test.php",
    data: datastring,
    dataType: "json",
    encode: true,
  }).done(function (data) {
    refresh_scores();
    swap_page('prof_page');
    if(data.success){
      console.log('git');
    } else {
      console.log('blad');
    }
    
  }).fail(function (data){
    swap_page('main_page');
  });
}

function test_change(id){
  
  if(id.includes("tab-overview-q-delete")){
    $('#'+id).parent().parent().parent().remove();
  }

  if(id.includes("tab-overview-ans-delete")){
    $('#'+id).parent().parent().remove();
  }

  if(id.includes("add-ans")){

    strArray = id.split('_');
    let type = $('#test_'+strArray[1]+'_q_'+strArray[3]).children('div.row:last').find('input:last')[0].type;
    let strArray2 = $('#test_'+strArray[1]+'_q_'+strArray[3]).children('div.row:last').find('input:first')[0].id.split('_');

    let ans_id = String(parseInt(strArray2[5])+1);
    
    let if_check = '';
    if(type=='checkbox'){
      if_check = '[]';
    } else {
      if_check = '';
    }

    let answer_div = "<div class='row mb-3'><label for='test_"+strArray2[1]+"_q_"+strArray2[3]+"_ans_"+ans_id+"_tab-overview-answer' class='col-md-3 col-lg-3 col-form-label'>Odpowiedz</label><div class='col-md-7 col-lg-7'><input type='text' class='form-control' name='q_"+strArray2[3]+"_ans_"+ans_id+"' id='test_"+strArray2[1]+"_q_"+strArray2[3]+"_ans_"+ans_id+"_tab-overview-answer' value=''></div><div class='col-md-1 col-lg-1 d-flex justify-content-center'><input type='"+type+"' class='form-check-input my-auto' name='t_"+strArray2[1]+"_q_"+strArray2[3]+"_ans"+if_check+"' id='test_"+strArray2[1]+"_q_"+strArray2[3]+"_ans_"+ans_id+"_tab-overview-correct'></div><div class='col-md-1 col-lg-1'><button type='button' class='btn btn-danger' id='test_"+strArray2[1]+"_q_"+strArray2[3]+"_ans_"+ans_id+"_tab-overview-ans-delete'><i class='bi bi-x-square fa-lg'></i></button></div></div>";
   
    $('#'+id).parent().parent().append(answer_div);
    let copy = $(('#'+id)).parent().clone();
    $('#'+id).parent().remove();
    $('#test_'+strArray[1]+'_q_'+strArray[3]).append(copy);
  }

  if(id.includes("add-radio") || id.includes("add-checkbox")){
    
    strArray = id.split('_');
    let strArray2 = [];

    try {
      strArray2 = $('#test_'+strArray[1]+'_tab-overview-form').children('div:not(".text-center"):last')[0].id.split('_');
    } catch (e){
      strArray2 = ['test', strArray[1], 'q', '0'];
    }

    let q_id = String(parseInt(strArray2[3])+1);
    let type = strArray[2].slice(4);
    let question_div = "<div id='test_"+strArray[1]+"_q_"+q_id+"'><div class='row mb-3 py-4 border-top'><label for='test_"+strArray2[1]+"_q_"+q_id+"_tab-overview-question' class='col-md-3 col-lg-3 col-form-label'>Pytanie</label><div class='col-md-8 col-lg-8'><input type='text' class='form-control' name='question_"+q_id+"' id='test_"+strArray2[1]+"_q_"+q_id+"_tab-overview-question' value=''></div><div class='col-md-1 col-lg-1'><button type='button' class='btn btn-danger' id='test_"+strArray2[1]+"_q_"+q_id+"_tab-overview-q-delete'><i class='bi bi-x-square fa-lg'></i></button></div></div>";
    let add_ans = "<div class='text-center pb-4'><button type='button' class='btn btn-primary' id='t_"+strArray2[1]+"_q_"+q_id+"_add-ans'><i class='bi bi-plus-square mx-2'></i>Dodaj odpowiedź</button></div>";
    

    let if_check = '';
    if(type=='checkbox'){
      if_check = '[]';
    } else {
      if_check = '';
    }

    let answer_div = "<div class='row mb-3'><label for='test_"+strArray2[1]+"_q_"+q_id+"_ans_0_tab-overview-answer' class='col-md-3 col-lg-3 col-form-label'>Odpowiedz</label><div class='col-md-7 col-lg-7'><input type='text' class='form-control' name='q_"+q_id+"_ans_0' id='test_"+strArray2[1]+"_q_"+q_id+"_ans_0_tab-overview-answer' value=''></div><div class='col-md-1 col-lg-1 d-flex justify-content-center'><input type='"+type+"' class='form-check-input my-auto' name='t_"+strArray2[1]+"_q_"+q_id+"_ans"+if_check+"' id='test_"+strArray2[1]+"_q_"+q_id+"_ans_0_tab-overview-correct' value='q_"+q_id+"_ans_0' checked></div><div class='col-md-1 col-lg-1'><button type='button' class='btn btn-danger' id='test_"+strArray2[1]+"_q_"+q_id+"_ans_0_tab-overview-ans-delete'><i class='bi bi-x-square fa-lg'></i></button></div></div>";
    let ans_type = "<input type='hidden' class='form-control' name='q_"+q_id+"_type' value='"+type+"'>";

    let strArray3 = $('#test_'+strArray[1]+'_tab-overview-form').children('div.text-center').clone();
    
    $('#test_'+strArray[1]+'_tab-overview-form').children('div.text-center').remove();
    $('#test_'+strArray[1]+'_tab-overview-form').append(question_div+answer_div+add_ans+ans_type+"</div>");
    $('#test_'+strArray[1]+'_tab-overview-form').append(strArray3);
  }
}

function submit_change(id){

  let form_id = id.slice(0, id.length-19)+"tab-overview-form";
  let form = $("#"+form_id)[0];
  let datastring = new FormData(form);
  datastring.append('less_id', "lesson_"+id.slice(7,8));

  $.ajax({
    url: "./assets/php/submit_change.php", 
    type: "POST",             
    data: datastring,
    contentType: false,       
    cache: false,             
    processData:false, 
    dataType: "json",
    encode: true,
  }).done(function (data) {
    generate_lessons();
  }).fail(function (data){
    console.log(data);
  });
}

function submit_test_change(id){
  
  strArray = id.split('_');
  let form_id = "test_"+strArray[1]+"_tab-overview-form";
  let form = $("#"+form_id)[0];
  var data = $(form).serializeArray(); // convert form to array
  data.push({name: "test_id", value: "test_"+strArray[1]});

  $.ajax({
    url: "./assets/php/submit_test_change.php", 
    type: "POST",             
    data: $.param(data),
    dataType: "json",
    encode: true,
  }).done(function (data) {
    console.log(data);
    generate_tests();
    gen_tests_tools();
  }).fail(function (data){
    console.log('fail');
  });
}

generate_lessons();
generate_tests();
gen_lessons_tools();
gen_tests_tools();

document.addEventListener('click',function(e){

  if(e.target && e.target.id.includes('test_lesson')){
    swap_page(e.target.id.slice(0,4)+e.target.id.slice(11,));
  }
  
  if(e.target && e.target.id.slice(0,5)+e.target.id.slice(7,10) == 'test_sub'){  
    submit_test(e.path['3'].id);
  }

  if(e.target && e.target.id.slice(-19) == 'tab-overview-submit'){  
    submit_change(e.target.id);
  }
  
  if(e.target && e.target.classList.contains('bi') || e.target && e.target.id.includes("tab-overview-q-delete") || e.target && e.target.id.includes("tab-overview-ans-delete") || e.target && e.target.id.includes("add-ans") || e.target && e.target.id.includes("add-radio") || e.target && e.target.id.includes("add-checkbox")){  
    if(e.target.classList.contains('bi')){
      test_change(e.path[1].id);
    } else {
      test_change(e.target.id);
    }
  }

  if(e.target && e.target.id.includes('test_submit')){  
    submit_test_change(e.target.id);
  }

});