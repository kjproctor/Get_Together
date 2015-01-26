<?php

App::uses('AppController', 'Controller');

class LocationsController extends AppController {

    public function findAll()
    {
        $locations = $this->Location->find('all', $this->getArg());
        $totalCount = $this->Location->find('count');
        $results = $this->createResultSet("Location", $locations, $totalCount);
        $this->sendResponse($results);
    }

    public function getArg()
    {
        $arg = parent::getArg();
        return $arg;
    }

}

