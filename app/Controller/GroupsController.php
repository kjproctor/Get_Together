<?php

App::uses('AppController', 'Controller');

class GroupsController extends AppController {
    public $uses = array('Group', 'Location');

    public function findAll()
    {
      /*print_r($this->request->query);*/
/*        $groups = $this->Group->find('all', array(
                'conditions' => array('Group.status' => 'pending'),
                'limit' => n, //int
                'offset' => n, //int

            ));*/
        $results = $this->Group->find('all', $this->getArg());
        $totalCount = $this->Group->find('count');
        $results = $this->createResultSet($results, $totalCount);
        $this->sendResponse($results);
    }

    public function processResults($results)
    {
        $groups = array();
        if(count($results) > 0)
        {
            for($i=0; $i<count($results); $i++)
            {
                $group = $results[$i]['Group'];
                $location = $results[$i]['Location'];
                $group['location'] = $location;
                array_push($groups, $group);
            }
        }
        return $groups;
    }

    public function getArg()
    {
        $arg = parent::getArg();
        return $arg;
    }
    
}

