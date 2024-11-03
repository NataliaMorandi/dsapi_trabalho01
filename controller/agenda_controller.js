const agendaService = require('../repository/agenda_service')

// listar - get
function listarAgenda(req, res) {
    //res.json(agendaService.listarAgenda())
    try {
        res.json(agendaService.listarAgenda());
      } catch(err) {
        res.status(err.id).json(err)
      }
}

// inserir - post
function inserirAgenda(req, res) {
    const agenda = req.body;
    try{
        // status de todos que sao padrao 200 nao precisa ser declarado
        // só declaramos o que é diferente, no caso o 201
      const agendaInserida = agendaService.inserirAgenda(agenda);
      res.status(201).json(agendaInserida)
    }
    catch(err){
      res.status(err.id).json(err)
    }
}

// buscar - get
function buscarPorIdAgenda(req, res) {
    // O + antes converte o valor para number (na URL vem como string)
    const id = +req.params.id;
    try {
      res.json(agendaService.buscarPorIdAgenda(id));
    } catch(err) {
      res.status(err.id).json(err)
    }
  }

// atualizar - put
function atualizarAgenda (req, res) {
    const id = +req.params.id;
    const agenda = req.body;
    try{
      const agendaAtualizada = agendaService.atualizarAgenda(id, agenda);
      res.json(agendaAtualizada)
    }
    catch(err){
      res.status(err.id).json(err)
    }
  }

  //deletar
function deletarAgenda(req, res) {
  const id = +req.params.id;
  try {
    res.json(agendaService.deletarAgenda(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
}

// pesquisar - get
function pesquisarPorDataAgenda(req, res) {
    const data = req.body;
    try {
        res.json(agendaService.pesquisarPorDataAgenda(data));
      } catch(err) {
        res.status(err.id).json(err)
      }
}
  


module.exports = {
    listarAgenda,
    inserirAgenda,
    buscarPorIdAgenda,
    atualizarAgenda,
    deletarAgenda,
    pesquisarPorDataAgenda
}