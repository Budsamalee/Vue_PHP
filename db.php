<?php
$connect = new PDO("mysql:host=localhost;dbname=vue-php", "root", "");

#รับค่าที่ส่งมา
$request_data = json_decode(file_get_contents("php://input"));
$data = array();

if ($request_data->action == "insert") {
    $data = array(":firstname" => $request_data->firstname, ":lastname" => $request_data->lastname);
    $query = "INSERT INTO users (firstname,lastname) VALUES(:firstname,:lastname)";
    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array("message" => "Insert Complete");
    echo json_encode($output);
}

if ($request_data->action == "getAll") {
    $query = "SELECT * FROM users";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

if ($request_data->action == "getEditUser") {
    $query = "SELECT * FROM users WHERE id=$request_data->id";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        #ได้เป็น object มา
        $data['id'] = $row['id'];
        $data['firstname'] = $row['firstname'];
        $data['lastname'] = $row['lastname'];
    }
    echo json_encode($data);
}

#เหมือน Insert เลย
if ($request_data->action == "update") {
    $data = array(":firstname" => $request_data->firstname, ":lastname" => $request_data->lastname, ":id" => $request_data->id);
    $query = "UPDATE users SET firstname=:firstname , lastname=:lastname WHERE id=:id";
    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array("message" => "Update Complete");
    echo json_encode($output);
}

#ลบ
if ($request_data->action == "deleteUser") {
    $query = "DELETE FROM users WHERE id = $request_data->id";
    $statement = $connect->prepare($query);
    $statement->execute();
    $output = array("message" => "Delete Complete");
    echo json_encode($output);
}
