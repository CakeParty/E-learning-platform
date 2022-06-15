<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <link href="assets/img/python.png" rel="icon">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="assets/js/script.js"></script>

</head>

<body class="d-flex flex-column min-vh-100" onload="check_login();">
  <!-- header -->
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="#" class="logo d-flex align-items-center">
        <img src="assets/img/python.png" alt="">
        <span class="d-none d-lg-block">E-learning</span>
      </a>
      <i class="bi bi-list toggle-sidebar-btn"></i>
    </div>
    <nav class="header-nav ms-auto">
      <button type="button" id="login_but" class="btn btn-outline-primary d-flex align-items-center">Logowanie</button>
      <ul id="prof_list" class="d-none align-items-center">
        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0 pointer" data-bs-toggle="dropdown">
            <span class="d-none d-md-block dropdown-toggle ps-2 email_display">Email</span>
          </a>

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6 class="email_display_short">Email</h6>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center pointer" id="prof_button">
                <i class="bi bi-person"></i>
                <span>Profil</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item d-none align-items-center pointer" id="admin_but">
                <i class="bi bi-gear"></i>
                <span>Panel administracyjny</span>
              </a>
            </li>
            <li id="li_divider" class="d-none">
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center pointer" id="log_out_but">
                <i class="bi bi-box-arrow-right"></i>
                <span>Wyloguj</span>
              </a>
            </li>

          </ul>
        </li>

      </ul>
    </nav>

  </header>
  <!-- header end-->

  <!-- sidebar-->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <span>1. Wprowadzenie do sztucznej inteligencji</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <span>2. Tensorflow</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <span>3. Uczenie z nauczycielem</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <span>4. Uczenie bez nauczyciela</span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <span>5. Uczenie się ze wzmocnieniem</span>
        </a>
      </li>
    </ul>

  </aside>
  <!-- sidebar end -->

  <!-- main -->
  <main id="main" class="main">
    
    <div class="row" id="main_page">
      <div class="col-8 justify-content-center offset-2">
        <div class="card info-card">
          <div class="card-body">
              <h5 class="card-title">O pracy inżynierskiej</h5>
              <div class="d-flex align-items-center justify-content-center">
                <div class="align-items-center col-8 align-self-center"> 
                  <p>Tematem pracy było zrealizowanie projektu platformy e-learningowej do nauki sztucznej inteligencji w języku Python. 
                  </p>    
                  <p>
                    W tym celu przygotowano prosty projekt strony o przejrzystym i responsywnym interfejsie który zawiera notatki do nauki oraz testy do sprawdzenia nowo nabytej wiedzy. 
                  </p>
                  <p>
                    Uczestnik może śledzić swoje postępy w nauce za pomocą karty profilu gdzie znajdują się wyniki poszczególnych testów oraz informacja o ogólnym postępie ukończenia kursu.
                  </p>
                  <p>
                    Użytkownicy posiadający uprawnienia administratora mogą również dokonywać zmian na platformie w postaci kart lekcji czy testów za pomocą specjlanie przygotowanego narzędzia z intefejsem graficznym.
                  </p>
                  <hr>
                  <div class="row">
                    <div class='col'>Autor: Hubert Wabia</div>
                    <div class='col text-right'>Promotor: dr hab. inż. Roman Zajdel</div>
                  </div>
                  <div class="row justify-content-center align-items-center pt-5">
                    <p class="align-items-center justify-content-center text-center" >Wykonano: Rzeszów 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>

    <div class="row d-none" id="log_reg">
      <div class="col-6 justify-content-center offset-3">
        <form action="" method="POST">
          <div class="mb-3" id="email-group">
            <label for="form_email" class="form-label">Adres Email</label>
            <input type="email" class="form-control" id="form_email">
            <div id="form_email_help" class="form-text"></div>
          </div>
          <div class="mb-3" id="pass-group">
            <label for="form_pass" class="form-label">Hasło</label>
            <input type="password" id="form_pass" class="form-control">
            <div id="form_pass_help" class="form-text">Hasło musi mieć od 8 do 20 znaków.</div>
          </div>
          <div id="form_help" class="form-text"></div>
          <button type="button" id="login" class="btn btn-primary">Zaloguj</button>
          <button type="button" id="register" class="btn btn-primary">Zarejestruj</button>
        </form>
      </div>
    </div>

    <div class="row d-none" id="prof_page">
      <div class="col-10 justify-content-center offset-1">
        <div class="card">
          <div class="card-body pt-3">
            <ul class="nav nav-tabs nav-tabs-bordered">
              <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Profil</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Zmiana hasła</button>
              </li>
            </ul>
            <div class="tab-content pt-2">
              <div class="tab-pane fade show active profile-overview" id="profile-overview"></div>
              <div class="tab-pane fade pt-3" id="profile-change-password">
                <form action="" method="POST">
                  <div class="row mb-3">
                    <label for="curr_pass" class="col-md-4 col-lg-3 col-form-label">Obecne hasło</label>
                    <div class="col-md-8 col-lg-9">
                      <input type="password" class="form-control" id="curr_pass">
                      <div id="curr_pass_help"></div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="new_pass" class="col-md-4 col-lg-3 col-form-label">Nowe hasło</label>
                    <div class="col-md-8 col-lg-9">
                      <input type="password" class="form-control" id="new_pass">
                      <div id="new_pass_help"></div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="new_pass_check" class="col-md-4 col-lg-3 col-form-label">Ponownie wprowadź nowe hasło</label>
                    <div class="col-md-8 col-lg-9">
                      <input type="password" class="form-control" id="new_pass_check">
                      <div id="new_pass_check_help"></div>
                    </div>
                  </div>
                  <div class="text-center">
                    <div id="form_help2" class="form-text"></div>
                    <button type="button" class="btn btn-primary" id="pass_change">Zatwierdź</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row d-none" id="admin_page">
      <div class="col-8 justify-content-center offset-2">
        <div class="card">
          <div class="card-body pt-3">
            <ul class="nav nav-tabs nav-tabs-bordered" id="lessons_list"></ul>
            <div class="tab-content pt-2" id="lessons_divs"></div>
          </div>
        </div>
      </div>
    </div>

  </main>
  <!-- main end -->

  <!-- footer -->
  <footer id="footer" class="footer mt-auto">
    <div class="copyright">
      &copy; Copyright <strong><span>Hubert Wabia</span></strong>. Wszelkie prawa zastrzeżone
    </div>
  </footer>
  <!-- footer end -->
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

  <link href="assets/css/style.css" rel="stylesheet">
  <script src="assets/js/async_func.js"></script>
  <script src="assets/js/main.js"></script>
</body>

</html>