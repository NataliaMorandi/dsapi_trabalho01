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

    // se some encontrar item correspondente, retorna true
    const dataOcupada = listaAgenda.some(
        consulta => consulta.data === agenda.data
    );

    if (dataOcupada) {
        // codigo  409 Conflict indica conflito
        throw { id: 409, msg: "Data ocupada" };
    }
    agenda.id = idGeradorAgenda++;
    listaAgenda.push(agenda);
    return agenda;
}

// get id
function buscarPorIdAgenda(id) {
    const agendaEncontrada = listaAgenda.find(a => a.id === id);
    if (!agendaEncontrada) {
        return { id: 404, msg: "Agendamento não encontrado" };
    }

    return agendaEncontrada;
}

// put
function atualizarAgenda(id, novaAgenda) {
    if(!novaAgenda || !novaAgenda.id || !novaAgenda.data || !novaAgenda.pacienteNome) {
        throw {id: 400, msg: "Agenda sem dados corretos"}; }

    let indiceAgenda = listaAgenda.findIndex(agenda => agenda.idAgenda == idAgenda);

    if (indiceAgenda == -1) {
        return { id: 404, msg: "Agendamento não encontrado" };
    }

    novaAgenda.idAgenda = idAgenda;
    listaAgenda[indiceAgenda] = novaAgenda;

    let indicePaciente = listaPaciente.findIndex(paciente => paciente.idPaciente == idPaciente);

    if (indicePaciente == -1) {
        return { id: 404, msg: "Paciente não encontrado" }; }

    novoPaciente.idPaciente = idPaciente;
    listaPaciente[indicePaciente] = novoPaciente;
    return novoPaciente;
}


// delete
// deleta a consulta e limpa o campo de consulta do paciente tambem
function deletarAgenda(idAgenda, idPaciente) {
    let indiceAgenda = listaAgenda.findIndex(agenda => agenda.idAgenda == idAgenda);
    
    if (indiceAgenda == -1) {
        return { id: 404, msg: "Agendamento não encontrado" }; }

    const agendaRemovida = listaAgenda.splice(indiceAgenda, 1)[0];

    let indicePaciente = listaPaciente.findIndex(paciente => paciente.idPaciente == idPaciente);

    if (indicePaciente == -1) {
        return { id: 404, msg: "Paciente não encontrado" }; }

    paciente.consulta_marcada = false;

    return {
        agendaRemovida: agendaRemovida,
        pacienteAtualizado: paciente
    };

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
