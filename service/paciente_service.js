// no service vão as minhas regras de negocio
// nao pode ter overbooking
// nao pode criar consulta em agenda sem ter um paciente

const agendaRepository = require('../repository/agenda_repository')
const pacienteRepository = require('../repository/paciente_repository')

function listarPaciente() {
    const agendas = agendaRepository.listarAgenda();
    const pacientes = pacienteRepository.listarPaciente();

    return pacientes.map (paciente => {
        const consulta = agendas.find(consulta =>consulta.pacienteNome === paciente.nome);

        if (!consulta) {
            throw { id: 404, msg: "Paciente não tem consulta marcada" };
        }

        return {
            id: paciente.id,
            nome: paciente.nome,
            consultaMarcada: paciente.consultaMarcada,
            consulta: {
                id: consulta.id,
                data: consulta.data
            }
        };
    });
}

function inserirPaciente(paciente) {
    if(!paciente || !paciente.id || !paciente.nome || typeof paciente.consultaMarcada !== 'boolean') {
        throw { id: 400, msg: "Paciente sem dados corretos"}
    }

    return pacienteRepository.inserirPaciente(paciente);
}

function inserirPaciente(paciente) {
    if(!paciente || !paciente.id || !paciente.nome || typeof paciente.consultaMarcada !== 'boolean') {
        return;
    }
    paciente.id = idGeradorPaciente++;
    listaPaciente.push(paciente);
    return paciente;
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