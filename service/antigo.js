let listaAgenda = [];
let idGeradorAgenda = 1;

// get lista
function listarAgenda() {
    // map cria uma nova lista sem mexer na original e com todos parametros da antiga + parametros novos
    return listaAgenda.map (consulta => { // => usado em arrow function e em outras funcoes para definir de maneira rapida e simplificada, 
        // principalmente em callbacks ou metodos como map filter e forEach
        const paciente = listaPaciente.find(paciente => paciente.id === consulta.idPaciente);
        let pacienteNome;
        if (paciente) {
            pacienteNome = paciente.nome;
        } else {
            pacienteNome = "Paciente não encontrado";
        }

        return {
            id: consulta.id,
            data: consulta.data,
            pacienteNome: pacienteNome
        };
    });
}

// post
// ver se o horario está ocupado e retornar msg se estiver

function inserirAgenda(agenda) {
    if(!agenda || !agenda.data || !agenda.paciente || !agenda.pacienteNome) {
        throw {id: 400, msg: "Agenda sem dados corretos"};
    }

    if (!agenda.paciente.nome) {
        try {
            inserirPaciente(agenda.paciente);
        } catch (error) {
            return error;
        }
    }

    // se some encontrar item correspondente, retorna true
    const dataOcupada = listaAgenda.some(
        consulta => consulta.data === agenda.data && consulta.paciente === agenda.paciente
    );
    if (dataOcupada) {
        // codigo  409 Conflict indica conflito
        throw { id: 409, msg: "Data ocupada" };
    }
    agenda.idAgenda = idGeradorAgenda++;
    listaAgenda.push(agenda);
    return agenda;
}

// get id
// tem que buscar o paciente junto com o compromisso
function buscarPorIdAgenda(idAgenda) {
    const agenda = listaAgenda.find(
        agenda => agenda.idAgenda === idAgenda);
    if (!agenda) {
        return { id: 404, msg: "Agendamento não encontrado" };
    }
    const paciente = listaPaciente.find (paciente => paciente.nome === agenda.paciente);

    let pacienteNome;
    if (paciente) {
        pacienteNome = paciente.nome;
    } else {
        pacienteNome = "Paciente não encontrado";
    }

    return {
        id: agenda.id,
        data: agenda.data,
        pacienteNome: pacienteNome
    };
}

// put
// tem que atualizar o paciente junto
function atualizarAgenda(idAgenda, novaAgenda, idPaciente, novoPaciente) {
    if(!novaAgenda || !novaAgenda.data || !novaAgenda.paciente) {
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


module.exports = {
    listarAgenda,
    inserirAgenda,
    buscarPorIdAgenda,
    atualizarAgenda,
    deletarAgenda
    // ,funcionalidade especifica 
}