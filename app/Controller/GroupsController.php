<?php

App::uses('AppController', 'Controller');

class GroupsController extends AppController {

    public function findAll()
    {
      /*print_r($this->request->query);*/
/*        $groups = $this->Group->find('all', array(
                'conditions' => array('Group.status' => 'pending'),
                'limit' => n, //int
                'offset' => n, //int

            ));*/
        $groups = $this->Group->find('all', $this->getArg());
        $totalCount = $this->Group->find('count');
        $results = $this->createResultSet("Group", $groups, $totalCount);
        $this->sendResponse($results);
    }

    public function getArg()
    {
        $arg = parent::getArg();
        return $arg;
    }
    
}

