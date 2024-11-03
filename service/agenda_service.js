// no service vão as minhas regras de negocio
// nao pode ter overbooking
// nao pode criar consulta em agenda sem ter um paciente

const agendaRepository = require('../repository/agenda_repository')
const pacienteRepository = require('../repository/paciente_repository')

function listarAgenda() {
    const listaAgenda = agendaRepository.listarAgenda();
    const listaPaciente = pacienteRepository.listarPaciente();
    
    return listaAgenda.map (consulta => {
        const paciente = listaPaciente.find(p => p.id === consulta.paciente);
        let pacienteNome;
        if (paciente) {
            pacienteNome = paciente.nome;
        } else {
            throw { id: 404, msg: "Paciente não encontrado" };
        }

        return {
            id: consulta.id,
            data: consulta.data,
            pacienteNome: pacienteNome
        };
    });
}

function inserirAgenda(agenda) {
    if(!agenda || !agenda.id || !agenda.data || !agenda.pacienteNome) {
        throw { id: 400, msg: "Agenda sem dados corretos"}
    }
    
    // se eu vou inserir agenda, deveria adicionar aqui a minha regra de negocio sobre confirmar se data está disponivel
    const dataOcupada = listaAgenda.some(
        consulta => consulta.data === agenda.data 
    );

    if (dataOcupada) {
        // codigo  409 Conflict indica conflito
        throw { id: 409, msg: "Data ocupada" };
    }

    const paciente = listaPaciente.find(p => p.nome === agenda.pacienteNome);
    if (paciente) {
        if (typeof paciente.consultaMarcada !== 'boolean') {
            throw { id: 400, msg: "Dados do paciente inválidos: consultaMarcada deve ser booleano" };
        }
        paciente.consultaMarcada = true;
    } else {
        throw { id: 404, msg: "Paciente não encontrado" };
    }

    return agendaRepository.inserirAgenda(agenda);
}


function buscarPorIdAgenda(id) {
    let agenda = agendaRepository.buscarPorIdAgenda(id);
    if (agenda) {
        return agenda;
    } else {
        throw { id: 404, msg: "Agenda não encontrada"}
    }
}


function atualizarAgenda(id, agenda) {
    if(agenda && agenda.id && agenda.data && agenda.pacienteNome) {
        const agendaAtualizada = agendaRepository.atualizarAgenda(id, agenda);
        if(agendaAtualizada) {
            return agendaAtualizada;
        }        
        else {
            throw {id: 404, msg: "Agenda não encontrada"};
        }
    }
    else {
        throw {id: 400, msg: "Agenda sem dados corretos"};
    }
}

function deletarAgenda(id) {
    let agenda = agendaRepository.deletarAgenda(id);
    if(!agenda) {
       throw {id: 404, msg: "Agenda não encontrada"};
    }

    const paciente = listaPaciente.find(p => p.nome === agenda.pacienteNome);
    if (paciente) {
        if (typeof paciente.consultaMarcada !== 'boolean') {
            throw { id: 400, msg: "Dados do paciente inválidos: consultaMarcada deve ser booleano" };
        }
        paciente.consultaMarcada = false;
    } else {
        throw { id: 404, msg: "Paciente não encontrado" };
    }

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