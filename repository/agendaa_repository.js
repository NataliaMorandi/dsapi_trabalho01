let listaAgenda = [];
let idGeradorAgenda = 1;

// get lista
function listarAgenda() {
    return listaAgenda; 
}

// post
// ver se o horario está ocupado e retornar msg se estiver
function inserirAgenda(agenda) {
    if(!agenda || !agenda.id || !agenda.data || !agenda.pacienteNome) {
        throw {id: 400, msg: "Agenda sem dados corretos"};
    }

    agenda.id = idGeradorAgenda++;
    listaAgenda.push(agenda);
    return agenda;
}

// get id
function buscarPorIdAgenda(id) {
    const agendaEncontrada = listaAgenda.find(a => a.id === id);
    if (!agendaEncontrada) {
        throw { id: 404, msg: "Agendamento não encontrado" };
    }

    return agendaEncontrada;
}

// put
function atualizarAgenda(id, novaAgenda) {
    if(!agenda || !agenda.id || !agenda.data || !agenda.pacienteNome) {
        throw {id: 400, msg: "Agenda sem dados corretos"}; }

    let indiceAgenda = listaAgenda.findIndex(agenda => agenda.id == id);

    if (indiceAgenda == -1) {
        throw { id: 404, msg: "Agendamento não encontrado" };
    }

    novaAgenda.id = id;
    listaAgenda[indiceAgenda] = novaAgenda;
    return agenda;

}


// delete
// deleta a consulta e limpa o campo de consulta do paciente tambem
function deletarAgenda(id) {
    let indiceAgenda = listaAgenda.findIndex(agenda => agenda.id == id);
    
    if (indiceAgenda == -1) {
        throw { id: 404, msg: "Agendamento não encontrado" }; }

    const agendaRemovida = listaAgenda.splice(indiceAgenda, 1)[0];

    return agendaRemovida;

}

module.exports = {
    listarAgenda,
    inserirAgenda,
    buscarPorIdAgenda,
    atualizarAgenda,
    deletarAgenda
    // ,funcionalidade especifica 
}
