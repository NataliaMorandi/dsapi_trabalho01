const express = require('express');
const router = express.Router();
const agendaController = require('../controller/agenda_controller');


router.get('/', agendaController.listarAgenda);
router.post('/', agendaController.inserirAgenda);
router.get('/:id', agendaController.buscarPorIdAgenda);
router.put('/:id', agendaController.atualizarAgenda);
router.delete('/:id', agendaController.deletarAgenda);
router.get('/data', agendaController.pesquisarPorDataAgenda);

module.exports = router;
