<?php

App::uses('AppController', 'Controller');

class GroupsController extends AppController {
    public $uses = array('Group', 'Location', 'Topic');

    public function findAll()
    {
        $results = $this->Group->find('all', $this->getArg());
        /*print_r($results);*/
        $totalCount = $this->Group->find('count');
        $results = $this->createResultSet($results, $totalCount);
        $this->sendResponse($results);
    }

    public function find()
    {
        $results = $this->Group->findById($this->request->query['id']);
        /*print_r($results);*/
        $totalCount = $this->Group->find('count');
        $group = $this->processResult($results);
        $this->sendResponse($group);
    }

    public function processResults($results)
    {
        $groups = array();
        if(count($results) > 0)
        {
            for($i=0; $i<count($results); $i++)
            {
                $group = $this->processResult($results[$i]);
                array_push($groups, $group);
            }
        }
        return $groups;
    }

    public function processResult($result)
    {
        $group = $result['Group'];
        $location = $result['Location'];
        $group['location'] = $location;
        $topic = $result['Topic'];
        $group['topic'] = $topic;
        return $group;
    }

    public function getArg()
    {
        $arg = parent::getArg();
        return $arg;
    }
    
}

