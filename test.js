const listaAgenda = [
    { id: 1, data: "2024-10-30", pacienteId: 5 },
    { id: 2, data: "2024-10-31", pacienteId: 6 }
];

const listaPaciente = [
    { id: 5, nome: "João", consulta_marcada: true },
    { id: 6, nome: "Maria", consulta_marcada: false },
    { id: 7, nome: "Pedro", consulta_marcada: true } // Exemplo de paciente não encontrado
];

// Função listarAgenda
function listarAgenda() {
    return listaAgenda.map(consulta => {
        const paciente = listaPaciente.find(p => p.id === consulta.pacienteId);
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

// Testando a função
console.log(listarAgenda());