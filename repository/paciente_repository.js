let listaPaciente = [];
let idGeradorPaciente = 1;

// get lista
function listarPaciente() {
    return listaPaciente;
}

// post
function inserirPaciente(paciente) {
    if(!paciente || !paciente.id || !paciente.nome || typeof paciente.consultaMarcada !== 'boolean') {
        return;
    }
    paciente.id = idGeradorPaciente++;
    listaPaciente.push(paciente);
    return paciente;
}

// get id
function buscarPorIdPaciente(paciente) {
    const pacienteEncontrado = listaPaciente.find(p => p.id === paciente.id);
    return pacienteEncontrado;
}

// put
function atualizarPaciente(id, paciente) {
    if(!paciente || !paciente.id || !paciente.nome || typeof paciente.consultaMarcada !== 'boolean') {
        return; }
    let indicePaciente = listaPaciente.findIndex(p => p.id === id);

    if (indicePaciente === -1) {
        return;
    }
    paciente.id = id;
    listaPaciente[indicePaciente] = paciente;
    return paciente;
}

// delete
function deletarPaciente(id) {
    let indicePaciente = listaPaciente.findIndex(p => p.id === id);

    if (indicePaciente === -1) {
        return;
    }

    const pacienteRemovido = listaPaciente.splice(indicePaciente, 1)[0];

    const pacienteNome = pacienteRemovido.nome;

    //listaAgenda = listaAgenda.filter(consulta => consulta.paciente !== pacienteNome);

    //throw { id: 200, msg: "Paciente e suas consultas foram removidos" };
}

module.exports = {
    listarPaciente,
    inserirPaciente,
    buscarPorIdPaciente,
    atualizarPaciente,
    deletarPaciente
    // ,funcionalidade especifica 
}