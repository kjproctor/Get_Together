<?php

App::uses('ExceptionRenderer', 'Error');
class CustomExceptionRenderer extends ExceptionRenderer {

    // override
    public function error400($error) {
        $this->_prepareView($error, 'Not Found');
        $this->controller->response->statusCode($error->getCode());
        $this->_outputMessage('error400');
    }

    // override
    public function error500($error) {
        $this->_prepareView($error, 'An Internal Error Has Ocurred.');
        $code = ($error->getCode() > 500 && $error->getCode() < 506) ? $error->getCode() : 500;
        $this->controller->response->statusCode($code);
        $this->_outputMessage('error500');
    }

    private function _prepareView($error, $genericMessage) {
        $message = $error->getMessage();
        $code = $error->getCode();
        if(!Configure::read('debug') && !Configure::read('detailed_exceptions')) {
            $message = __d('cake', $genericMessage);
        }

        $renderVars = array(
            'code' => h($code),
            'error' => h($genericMessage),
            'message' => h($message)
        );
        $renderVars['_serialize'] = array_keys($renderVars);
        $this->controller->set($renderVars);
    }
}