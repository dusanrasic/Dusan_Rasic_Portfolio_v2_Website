$(document).ready(function(){
  particlesJS.load('particles-js', './assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
  $projects = $('.projects');
  $contact = $('.contact');
  $btn_left = $('.left_btn');
  $btn_right = $('.right_btn');
  $section = $('.some_text');
  $btn_left.click(function(){
    if ($section.hasClass('some_text_push_to_left')) {
      $contact.removeClass('contact-open');
      $section.removeClass('some_text_push_to_left');
    }
    else {
      $projects.addClass('project-open');
      $section.addClass('some_text_push_to_right');
    }
  });
  $btn_right.click(function(){
    if ($section.hasClass('some_text_push_to_right')) {
      $projects.removeClass('project-open');
      $section.removeClass('some_text_push_to_right');
    }
    else{
      $contact.addClass('contact-open');
      $section.addClass('some_text_push_to_left');
    }
  });
//function validate(){
  $(document).on("click","#btnSubmit",function(e){
      e.preventDefault();
    var subject = $('.tbSubject').val();
    var email = $('.tbEmail').val();
    var message = $('.taContent').val();
    var errors = [];

    var check_subject = /^[A-Za-z0-9 ]{3,20}$/ ;
    var check_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ;

    if(!check_subject.test(subject)){
      errors[errors.length] = "You valid Subject (3-20).";
    }
    if (!check_email.test(email)) {
      errors[errors.length] = "You must enter a valid email address.";
    }
    if (message == "") {
      errors[errors.length] = "You must enter a valid Message (cannot be empty).";
    }
    if (errors.length > 0) {
      reportErrors(errors);
      return false;
    }
      console.log(subject);
    $.ajax({
      type: "POST",
      url: "contact.php/send_email",
      data:  {
        Subject: subject,
        Mail: email,
        Message: message
      },
      dataType: "text",
      success: function(res){
        $('.tbSubject').val("");
        $('.tbEmail').val("");
        $('.taContent').val("");
        alert(res);
      }
    });
    return true;
  });

function reportErrors(errors){
   var msg = "Please Enter Valide Data...\n";
   for (var i = 0; i<errors.length; i++) {
   var numError = i + 1;
    msg += "\n" + numError + ". " + errors[i];
  }
   alert(msg);
  }

  // enable vibration support

  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

if (navigator.vibrate) {
	$('.left_btn').click(function(e){
    e.preventDefault();
    navigator.vibrate(25);
  });
  $('.right_btn').click(function(e){
    e.preventDefault();
    navigator.vibrate(25);
  });
  $('.tbSubject').focus(function(e){
    e.preventDefault();
    navigator.vibrate(25);
  });
  $('.tbEmail').focus(function(e){
    e.preventDefault();
    navigator.vibrate(25);
  });
  $('.taContent').focus(function(e){
    e.preventDefault();
    navigator.vibrate(25);
  });
}
//mouse move
  var windowWidth = $(window).width();
  $('#particles-js').mousemove(function (event) {
    var moveX = (($(window).width() / 2) - event.pageX) * 0.05;
    var moveY = (($(window).height() / 2) - event.pageY) * 0.05;
    $('.random').css('margin-left', moveX + 'px');
    $('.random').css('margin-top', moveY + 'px');
    console.log("MoveX: "+move+"; MoveY: "+moveY);
  });
//text animation
  var $randomnbr = $('.nbr');
  var $timer = 30;
  var $it;
  var $data = 0;
  var index;
  var change;
  var letters = ['d','u','s','a','n',' ','r','a','s','i','c'];

  $randomnbr.each(function(){
    change = Math.round(Math.random()*100);
    $(this).attr('data-change', change);
  });
  function random(){
    return Math.round(Math.random()*9);
  };
  function select(){
    return Math.round(Math.random()*$randomnbr.length+1);
  };
  function value(){
    $('.nbr:nth-child('+select()+')').html(''+random()+'');
    $('.nbr:nth-child('+select()+')').attr('data-number', $data);
    $data++;

    $randomnbr.each(function(){
      if (parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))){
        index = $('.ltr').index(this);
        $(this).html(letters[index]);
        $(this).removeClass('nbr');
      }
    });
  };
  $it = setInterval(value, $timer);
});
