let listaAgenda = [];
let idGeradorAgenda = 1;

// get lista
function listarAgenda() {
    return listaAgenda;
}

// post
function inserirAgenda(agenda) {
    if(!agenda || !agenda.data || !agenda.paciente) {
        throw {id: 400, msg: "Agenda sem dados corretos"};
    }
    agenda.idAgenda = idGeradorAgenda++;
    listaAgenda.push(agenda);
    return agenda;
}

// get id
function buscarPorIdAgenda(idAgenda) {
    return (listaAgenda.find(
        function(agenda) {
            return (agenda.idAgenda == idAgenda)
        }
    ));
}

// put
function atualizarAgenda(idAgenda, agenda) {
    if(!agenda || !agenda.data || !agenda.paciente) {
        return; }
    let indiceAgenda = listaAgenda.findIndex(function(agenda) {
        return (agenda.idAgenda == idAgenda); })

    if (indiceAgenda == -1) return;
    agenda.idAgenda = idAgenda;
    listaAgenda[indiceAgenda] = agenda;
    return agenda;
}

// delete
function deletarAgenda(idAgenda) {
    let indiceAgenda = listaAgenda.findIndex(function(agenda) {
        return (agenda.idAgenda == idAgenda);
    })
    if(indiceAgenda == -1) return;
    return (listaAgenda.splice(indiceAgenda, 1))[0];
}

// funcionalidade especifica 
function agendarConsulta(agenda, data) {
    if(!agenda || !agenda.data || !agenda.paciente) {
        return; }
    let indiceAgenda = listaAgenda.findIndex(function(agenda) {
        return (agenda.idAgenda == idAgenda); })

    if (indiceAgenda == -1) return;
    agenda.idAgenda = idAgenda;
    listaAgenda[indiceAgenda] = agenda;
    return agenda;
}

module.exports = {
    listarAgenda,
    inserirAgenda,
    buscarPorIdAgenda,
    atualizarAgenda,
    deletarAgenda
    // ,funcionalidade especifica 
}