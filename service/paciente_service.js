// no service vão as minhas regras de negocio
// nao pode ter overbooking
// nao pode criar consulta em agenda sem ter um paciente

const pacienteRepository = require('../repository/paciente_repository')
const agendaRepository = require('../repository/agenda_repository')


function listarPaciente() {
    const agendas = agendaRepository.listarAgenda();
    const pacientes = pacienteRepository.listarPaciente();

    return pacientes.map (paciente => {
        const consulta = agendas.find(consulta =>consulta.pacienteNome === paciente.nome);
        if (consulta) {
            return {
                id: paciente.id,
                nome: paciente.nome,
                consultaMarcada: paciente.consultaMarcada,
                consulta: {
                    id: consulta.id,
                    data: consulta.data
                }
            };
        } else {
            throw { id: 404, msg: "Paciente não tem consulta marcada" };
        }
    }); 
}

function inserirPaciente(paciente) {
    if(paciente && paciente.id && paciente.nome && typeof paciente.consultaMarcada === 'boolean') {
        return pacienteRepository.inserirPaciente(paciente);
    } else {
        throw { id: 400, msg: "Paciente sem dados corretos"}
    }
}

function buscarPorIdPaciente(id) {
    const agendas = agendaRepository.listarAgenda();
    const pacientes = pacienteRepository.listarPaciente();
    // let paciente = pacienteRepository.buscarPorIdPaciente(id);
    //return pacientes.map (paciente => {
    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) {
        throw { id: 404, msg: "Paciente não encontrado"}
    }
    if (paciente.consultaMarcada) {
        const consulta = agendas.find(a =>a.pacienteNome === paciente.nome);
        if (consulta) {
            return {
                id: paciente.id,
                nome: paciente.nome,
                consultaMarcada: paciente.consultaMarcada,
                consulta: {
                    id: consulta.id,
                    data: consulta.data
                }
            };
        } else {
            throw { id: 404, msg: "Paciente sem consulta marcada"}
        }
    }
    return {
        id: paciente.id,
        nome: paciente.nome,
        consultaMarcada: paciente.consultaMarcada,
    };
}


function atualizarPaciente(id, paciente) {
    if(paciente && paciente.id && paciente.nome && typeof paciente.consultaMarcada === 'boolean') {
        const pacienteAtualizado = pacienteRepository.atualizarPaciente(id, paciente);
        if(pacienteAtualizado) {
            return pacienteAtualizado;
        }        
        else {
            throw {id: 404, msg: "Paciente não encontrado"};
        }
    }
    else {
        throw {id: 400, msg: "Paciente sem dados corretos"};
    }
}

function atualizarPaciente(id, paciente) {
    if (!paciente || !paciente.id || !paciente.nome || typeof paciente.consultaMarcada !== 'boolean') {
        throw { id: 400, msg: "Paciente sem dados corretos" };
    }

    const pacienteAtualizado = pacienteRepository.atualizarPaciente(id, paciente);
    
    if (pacienteAtualizado) {
        return pacienteAtualizado;
    } else {
        throw { id: 404, msg: "Paciente não encontrado" };
    }
}

// procurar id do paciente, se consultaMarcada for true, vou em agenda, busco pelo nome do paciente e deleto a consulta marcada
function deletarPaciente(id) {
    const agendas = agendaRepository.listarAgenda();
    const pacientes = pacienteRepository.listarPaciente();

    const paciente = pacientes.find(p => p.id === id);
    if (!paciente) {
        throw { id: 404, msg: "Paciente não encontrado"}
    }

    if (paciente.consultaMarcada) {
        const consulta = agendas.find(a =>a.pacienteNome === paciente.nome);

        if(consulta) {
            agendaRepository.deletarAgenda(id);
        }

        const pacienteRemovido = pacienteRepository.deletarPaciente(id);
        if(pacienteRemovido) {
            return pacienteRemovido;
        } else {
            throw { id: 500, msg: "Erro ao deletar paciente"} //500 internal server error: falha ao deletar paciente embora tenha sido encontrado
        }
    }
}


module.exports = {
    listarPaciente,
    inserirPaciente,
    buscarPorIdPaciente,
    atualizarPaciente,
    deletarPaciente
    // ,funcionalidade especifica 
}