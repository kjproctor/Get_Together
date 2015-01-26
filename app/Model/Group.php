<?php

 App::uses('AppModel', 'Model');

 class Group extends AppModel {
     public $belongsTo = 'Location';
 }