<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'database.php';
include 'member.php';



$type = $_SERVER['REQUEST_METHOD'];
$data = $type == 'POST' ? $_POST : $_GET;



if($type == 'GET'){
  //return database data;
  $member = new user();
  $member->setDB($conn);
  echo json_encode( $member->getAll() );
}else {

  // echo json_encode($data['mode']);
  if($data['mode'] == 'add'){

    // echo json_encode('add user here');
    
    $member = new user($data);
    $member->setDB($conn);
    $member->store();
    echo json_encode( $member->getDetails() );
  }

  if($data['mode'] == 'update'){
    echo json_encode('modify uer here');
  }

  if($data['mode'] == 'destroy'){
    echo json_encode('modify uer here');
  }
}




?>