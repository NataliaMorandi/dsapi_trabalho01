let listaPaciente = [];
let idGeradorPaciente = 1;

// get lista
function listarPaciente(paciente) {
    return listaPaciente;
}

// post
function inserirPaciente(paciente) {
    if(!paciente || !paciente.nome || !paciente.consulta_marcada) {
        throw {id: 400, msg: "Paciente sem dados corretos"};
    }
    paciente.idPaciente = idGeradorPaciente++;
    listaPaciente.push(paciente);
    return paciente;
}

// get id
function buscarPorIdPaciente(idPaciente) {
    return (listaPaciente.find(
        function(paciente) {
            return (paciente.idPaciente == idPaciente)
        }
    ));
}

// put
function atualizarPaciente(idPaciente, paciente) {
    if(!paciente || !paciente.nome || !paciente.consulta_marcada) {
        return; }
    let indicePaciente = listaPaciente.findIndex(function(paciente) {
        return (paciente.idPaciente == idPaciente); })

    if (indicePaciente == -1) return;
    paciente.idPaciente = idPaciente;
    listaPaciente[indicePaciente] = paciente;
    return paciente;
}

// delete
function deletarPaciente(idPaciente) {
    let indicePaciente = listaPaciente.findIndex(function(paciente) {
        return (paciente.idPaciente == idPaciente);
    })
    if(indicePaciente == -1) return;
    return (listaPaciente.splice(indicePaciente, 1))[0];
}

// funcionalidade especifica 

module.exports = {
    listarPaciente,
    inserirPaciente,
    buscarPorIdPaciente,
    atualizarPaciente,
    deletarPaciente
    // ,funcionalidade especifica 
}