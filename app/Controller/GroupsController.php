<?php

App::uses('AppController', 'Controller');

class GroupsController extends AppController {

    public function findAll() {
      /*print_r($this->request->query);*/
        $start = $this->request->query['start'];
        if($start != null)
        {

        }

        $groups = $this->Group->find('all');
        $totalCount = $this->Group->find('count');
        $results = $this->createResultSet("Group", $groups, $totalCount, 0, 100);
        $this->sendResponse($results);
    }

    public function find($id = null) {
         if (!$id) {
             throw new NotFoundException(__('A group id must be provided'));
         }

         $group = $this->Group->findById($id);

         $this->set('group', $group);
         $this->set('_serialize', 'group');
    }
    
}
