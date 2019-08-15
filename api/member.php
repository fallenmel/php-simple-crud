<?php

  class user {
    var $first_name;
    var $last_name;
    var $email;
    var $mobile_number;
    private $db;


    function __construct( $details = null ) {
      $this->first_name = $details['first_name'];
      $this->last_name = $details['last_name'];
      $this->email = $details['email'];
      $this->mobile_number = $details['number'];
    }



    function getDetails(){
      $details = [
        "first_name" => $this->first_name,
        "last_name" => $this->last_name,
        "email" => $this->email,
        "mobile_number" => $this->mobile_number,
      ];

      return $details;
    }

    function setDB( $db ){
      $this->db = $db;
    }

    function store(){
      $sql = "INSERT INTO users (first_name, last_name, email, mobile_number) VALUES ('$this->first_name', '$this->last_name', '$this->email', '$this->mobile_number')";

      if($this->db->query($sql) === true){
        return "Records inserted successfully.";
      } else{
        return "ERROR: Could not able to execute $sql. " . $this->db->error;
      }
    }

    function getAll(){
      $sql = "SELECT * FROM users";
      if($result = mysqli_query($this->db, $sql)){
        $data = [];
        while($row = $result->fetch_assoc()){
          array_push($data,$row);
        }
        return $data;
      }else{
        return [];
      }
    }

    function fetch($id){
      $sql = "SELECT * FROM users WHERE id = '$id' ";
      if($result = mysqli_query($this->db, $sql)){
        $data = [];
        while($row = $result->fetch_assoc()){
          array_push($data,$row);
        }
        return $data;
      }else{
        return [];
      }
    }


    function update($updates){
      $sql = "UPDATE users SET first_name='$updates->first_name',  last_name='$updates->last_name', email='$updates->email', mobile_number='$updates->number' WHERE id = '$updates->id' ";
      if(mysqli_query($this->db, $sql)){
        return "Records were updated successfully.";
      } else {
        return "ERROR: Could not able to execute $sql. " . mysqli_error($this->db);
      }
    }

    function destroy($id){
      $sql = "DELETE FROM users WHERE id='$id'";
      if(mysqli_query($this->db, $sql)){
        return "User successfully remove.";
      } else {
        return "ERROR: Could not able to execute $sql. " . mysqli_error($this->db);
      }
    }
     
  }



?>