<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

/* Database Configuration */
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'root';
$dbname = 'student_manager_example';
$dbmethod = 'mysql:dbname=';
$dsn = $dbmethod.$dbname;
$pdo = new PDO($dsn, $dbuser, $dbpass);
$db = new NotORM($pdo);

/* Routes */
// Get all students
$app->get('/students', function() use($app, $db){
    $students = array();
    foreach ($db->students() as $student) {
        $students[]  = array(
            'id' => $student['id'],
            'first_name' => $student['first_name'],
            'last_name' => $student['last_name'],
            'fall_test_score' => $student['fall_test_score'],
            'spring_test_score' => $student['spring_test_score'],
            'final_test_score' => $student['final_test_score']
        );
    }
    $app->response()->header("Content-Type", "application/json");
    echo json_encode(
        $students
    );
});

// Add a new student
$app->post('/students', function() use($app, $db){
    $app->response()->header("Content-Type", "application/json");
    $json = $app->request->getBody();
    $data = json_decode($json, true);
    $result = $db->students->insert($data);

    if ($result != false){
        echo json_encode(array(
            'status' => true,
            'result' => $result
        ));
    } else {
        echo json_encode(array(
            'status' => false
        ));
    }
});

// Show a single student
$app->get('/students/:id', function($id) use ($app, $db) {
    $app->response()->header("Content-Type", "application/json");
    $student = $db->students()->where('id', $id);
    if($data = $student->fetch()){
        echo json_encode(array(
            'status' => true,
            'id' => $data['id'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'fall_test_score' => $student['fall_test_score'],
            'spring_test_score' => $student['spring_test_score'],
            'final_test_score' => $student['final_test_score']
        ));
    }
    else {
        echo json_encode(array(
            'status' => false,
            'message' => "Student with ID $id does not exist."
        ));
    }
});

// Update a student
$app->put('/students/:id', function($id) use($app, $db){
    $app->response()->header("Content-Type", "application/json");
    $student = $db->students()->where("id", $id);
    if ($student->fetch()) {
        $json = $app->request->getBody();
        $data = json_decode($json, true);
        $result = $student->update($data);
        echo json_encode(array(
            'status' => true,
            'message' => "Student updated successfully."
        ));
    }
    else {
        echo json_encode(array(
            'status' => false
        ));
    }
});

// Delete a student
$app->delete('/students/:id', function($id) use($app, $db){
    $app->response()->header("Content-Type", "application/json");
    $student = $db->students()->where('id', $id);
    if($student->fetch()){
        $result = $student->delete();
        echo json_encode(array(
            'status' => true,
            'message' => "Student deleted successfully."
        ));
    }
    else{
        echo json_encode(array(
            'status' => false,
            'message' => "Student with ID $id does not exist."
        ));
    }
});

/* Run the application */
$app->run();