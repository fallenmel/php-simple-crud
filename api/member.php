<?php

  class user {
    var $first_name;
    var $last_name;
    var $email;
    var $mobile_number;


    function __construct( $details ) {
      $this->first_name = $details['fist_name'];
      $this->last_name = $details['last_name'];
      $this->email = $details['email'];
      $this->mobile_number = $details['mobile_num'];
    }

    function getDetails(){
      $details = [
        "first_name" => $this->first_name,
        "last_name" => $this->last_name,
        "email" => $this->email,
        "mobile_number" => $this->mobile_number,
      ];


      return details;
    }

  }



?>