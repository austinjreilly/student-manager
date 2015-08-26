# Student Manager Demo

Student Manager Application built using the Slim PHP Microframework, MySQL, and AngularJS.

## Debugging shortcuts

* MySQL: `/Applications/MAMP/Library/bin/mysql -u root -p`, Password: `root`
* PHP: `tail -f /Applications/MAMP/logs/php_error.log`

## Initial Setup

1. Directory Structure:

        api
        - vendor
        - .htaccess
        - index.php
        app
        - assets
        - partials
        - app.js
        - controllers.js
        - services.js
        test
        - studentlist.controller.test.js
        .bowerrc
        .gitignore
        bower.json
        composer.json
        gulpfile.js
        index.html
        karma.conf.js
        package.json
        README.md

2. Set up directories

        mkdir -p api app app/partials test


3. Set up empty config files

        touch .bowerrc .gitignore bower.json composer.json gulpfile.js karma.conf.js package.json

4. Set up `.bowerrc`

        {
          "directory": "app/assets/lib/",
          "analytics": false
        }


5. Set up `.gitignore`

        .DS_Store
        node_modules
        app/assets/lib/
        composer.lock
        api/vendor

6. Set up `bower.json`

        {
          "name": "student-manager-example",
          "version": "0.0.0",
          "dependencies": {
            "angular": "~1.4.4",
            "angular-resource": "~1.4.4",
            "angular-ui-router": "~0.2.15",
            "foundation": "~5.5.2",
            "foundation-icon-fonts": "*"
          },
          "analytics": false,
          "devDependencies": {
            "angular-mocks": "~1.4.4"
          }
        }

7. Set up `composer.json`

        {
            "config": {
                   "vendor-dir": "api/vendor"
            },
            "require": {
                "slim/slim": "^2.6",
                "vrana/notorm": "dev-master"
            }
        }

8. Set up `gulpfile.js`

        // Dependencies

        var gulp = require('gulp');
        var sass = require('gulp-sass');
        var rename =  require('gulp-rename');
        var watch = require('gulp-watch');

        // Configuration
        var sassSource = './app/assets/scss/**/*.scss';
        var sassDestination = './app/assets/css';
        var jsSource = './app';

        var sassOptions = {
          errLogToConsole: true,
          outputStyle: 'expanded'
        };

        // Sass
        gulp.task('sass', function () {
          return gulp
            .src(sassSource)
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(rename('style.css'))
            .pipe(gulp.dest(sassDestination))
        });

        // Watch
        gulp.task('default',function() {
            gulp.watch(sassSource,['sass']);
        });

9. Set up `karma.conf.json`

        // Karma configuration
        // Generated on Mon Aug 24 2015 15:35:10 GMT-0500 (CDT)

        module.exports = function(config) {
          config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',


            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'],


            // list of files / patterns to load in the browser
            files: [
              'app/assets/lib/angular/angular.js',
              'app/assets/lib/angular-resource/angular-resource.js',
              'app/assets/lib/angular-ui-router/release/angular-ui-router.js',
              'app/assets/lib/angular-mocks/angular-mocks.js',
              'app/*.js',
              'test/*.test.js'
            ],


            // list of files to exclude
            exclude: [
            ],


            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
            },


            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['progress'],


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,
            //logLevel: config.LOG_DEBUG,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: ['PhantomJS'],


            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: true
          })
        }

10. Set up `package.json`

        {
          "name": "student-manager-example",
          "version": "0.0.1",
          "description": "A student management tool.",
          "author": "Austin Reilly <austinjreilly@gmail.com>",
          "readme": "README.md",
          "repository": {
            "type": "git",
            "url": "https://github.com/austinjreilly/student-manager-example"
          },
          "private": true,
          "devDependencies": {
            "gulp": "^3.9.0",
            "gulp-rename": "^1.2.2",
            "gulp-sass": "^2.0.4",
            "gulp-watch": "^4.3.5",
            "jasmine-core": "^2.3.4",
            "karma": "^0.13.9",
            "karma-chrome-launcher": "^0.2.0",
            "karma-jasmine": "^0.3.6",
            "karma-phantomjs-launcher": "^0.2.1",
            "phantomjs": "^1.9.18"
          },
          "scripts": {
            "postinstall": "bower install",
            "test": "karma start karma.conf.js"
          }
        }

11. Install packages:

        composer install && npm install

## Git Setup

0. Create new repository on Github
1. `git init`
2. `git add *`
3. `git commit -m ""Setting up configuration files`
4. `git push -u origin master`
5. `git tag -a step1 -m Setup`
6. `git push origin step1`


## API Setup

0. New branch: `git checkout -b api`
1. `cd api`
2. `touch .htaccess index.php`

### API Hello World

0. Add to `api/.htaccess`:

        RewriteEngine On

        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php [QSA,L]
        ```
1. Add to `api/index.php `

        <?php

        require 'vendor/autoload.php';
        $app = new \Slim\Slim();

        $app->get('/hello/:name', function ($name) {
            echo "Hello, $name";
        });

        $app->run();
2. Go to <http://localhost/student-manager-example/api/hello/austin>

### Database setup

0. `/Applications/MAMP/Library/bin/mysql -u root -p`
1. Type the password `root`
2. `CREATE DATABASE student_manager_example;`
3. `USE student_manager_demo;`
4. Create the table:

        CREATE TABLE students (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            fall_test_score INT(3) NOT NULL,
            spring_test_score INT(3) NOT NULL,
            final_test_score INT(3) NOT NULL
        );

5. Seed the database:

        INSERT INTO students(first_name,last_name,fall_test_score,spring_test_score,final_test_score) VALUES
            ('John','Lennon','120','131','140'),
            ('Paul','McCartney','115','141','129'),
            ('George','Harrison','141','153','149'),
            ('Ringo','Starr','100','88','93');

### Setting up routes

0. Add Database Configuration to index.php

        $dbhost = 'localhost';
        $dbuser = 'root';
        $dbpass = 'root';
        $dbname = 'student_manager_example';
        $dbmethod = 'mysql:dbname=';
        $dsn = $dbmethod.$dbname;
        $pdo = new PDO($dsn, $dbuser, $dbpass);
        $db = new NotORM($pdo);

1. Show all students

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


    * Test: `curl -X GET http://localhost/student-manager-example/api/students`

2. Add a new student

        $app->post('/students', function() use($app, $db){
            $app->response()->header("Content-Type", "application/json");

            $json = $app->request->getBody();
            $data = json_decode($json, true);
            error_log(print_r($data,true));
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


    * Test: `curl -X POST -H "application/json" -d '{"first_name":"Stuart","last_name":"Sutcliffe","fall_test_score":"100","spring_test_score":"109","final_test_score":"0"}' http://localhost/student-manager-example/api/students`

3. Show an single student

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

    * Test: `curl -X GET http://localhost/student-manager-example/api/students/1`

4. Update a student

        $app->put('/students/:id', function($id) use($app, $db){
            $app->response()->header("Content-Type", "application/json");
            $student = $db->students()->where("id", $id);
            if ($student->fetch()) {
                $json = $app->request->getBody();
                $data = json_decode($json, true);
                error_log(print_r($json,true));
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

    * Test: curl -X PUT -d '{"first_name":"John W."}' -H "Content-Type: application/json;" http://localhost/student-manager-example/api/students/1

5. Delete a student

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


        * Test: curl -i -X DELETE http://localhost/student-manager-example/api/students/5

6. Run the application!

    $app->run();

#### REST API Summary

## REST API Summary

| URL                                              | HTTP Verb | POST Body   | Result                       |
|--------------------------------------------------|-----------|-------------|------------------------------|
| http://localhost/student-manager-example/api/students    | GET       | empty       | Returns all students         |
| http://localhost/student-manager-example/api/students    | POST      | JSON String | Creates new student          |
| http://localhost/student-manager-example/api/students/:id | GET      | empty       | Returns single student       |
| http://localhost/student-manager-example/api/students/:id | PUT      | JSON String | Updates and existing student |
| http://localhost/student-manager-example/api/students/:id | DELETE   | empty       | Deletes existing student