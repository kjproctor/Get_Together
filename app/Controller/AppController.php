<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {
  public $components = array('DebugKit.Toolbar', 'RequestHandler');
  public $viewClass = 'Json';

  public function sendResponse($results)
  {
     // no view to render
     $this->autoRender = false;
     $this->response->type('json');
     $this->layout = 'ajax';
     $json = json_encode($results, JSON_PRETTY_PRINT);
     $this->response->body($json);
  }

  public function createResultSet($objectName, $data, $totalCount, $start, $limit)
  {
    $items = array();
    foreach ($data as $key => $value)
    {
        //print_r(array_values($value[$objectName]));
        array_push($items, $value[$objectName]);
    }
    $results = (object) array('items' => $items, 'totalCount' => $totalCount, 'start' => $start, 'limit' => $limit);
    return $results;
  }
}
