<?php
ini_set('SMTP', 'mail.dusanrasic.rs'); 
ini_set('smtp_port', 465); 

$subject = $_POST['Subject'];
$mail = $_POST['Mail'];
$message = $_POST['Message'];

$to = "contact@dusanrasic.rs"; 
$headers = "From: $mail \r\n";
$headers .= "Reply-To: $mail \r\n";

if(IsInjected($mail))
{
    echo "Bad email value!";
    exit;
}
else{
    mail($to,$subject,$message,$headers);

    echo "Mail succesfully sent!";
}

function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
                
    $inject = join('|', $injections);
    $inject = "/$inject/i";
     
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}

    


?>