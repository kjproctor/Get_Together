<?php

 App::uses('AppModel', 'Model');

 class Group extends AppModel {
     public $belongsTo = 'Location';
     public $hasAndBelongsToMany = array(
             'Topic' =>
                 array(
                     'className' => 'Topic',
                     'joinTable' => 'groups_topics',
                     'foreignKey' => 'group_id',
                     'associationForeignKey' => 'topic_id',
                     'unique' => true
                 )
         );
 }