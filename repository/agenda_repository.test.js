const agendaRepository = require("./agenda_repository.js");

// beforeEach(() => {
//     listaAgenda = [];
//     idGeradorAgenda = 1;
// });


// Cenário de sucesso para listarAgenda
test('Quando listar, deve retornar uma lista vazia no inicio', () => {
    expect(agendaRepository.listarAgenda()).toEqual([]);
});

// Cenário de exceção para listarAgenda
test('Quando listar apos inserçoes, deve retornar uma lista com agendas', () => {
    agendaRepository.inserirAgenda({ 
        data: "05/11/24", 
        pacienteNome: "João" 
    });
    // agendaRepository.inserirAgenda({ 
    //     data: "06/11/24", 
    //     pacienteNome: "Maria" 
    // });

    expect(agendaRepository.listarAgenda()).toHaveLength(1);
    expect(agendaRepository.listarAgenda()).toEqual([
        { 
            id: 1, 
            data: "05/11/24", 
            pacienteNome: "João" 
        },
        // { 
        //     id: 2, 
        //     data: "06/11/24", 
        //     pacienteNome: "Maria" 
        // }
    ]);
});


// Cenário de sucesso para inserirAgenda
test('Quando inserir uma agenda, deve retornar a agenda com id e estar na lista', () => {
    const agendaEsperada = { 
        id: 3, 
        data: "05/11/24", 
        pacienteNome: "João" 
    };
    const agendaInserida = agendaRepository.inserirAgenda({ 
        data: "05/11/24", 
        pacienteNome: "João" 
    });
    expect(agendaInserida).toEqual(agendaEsperada);
    expect(agendaRepository.listarAgenda()).toContainEqual(agendaEsperada);
});

// Cenário de exceção para inserirAgenda
test('Quando inserir uma agenda sem data, nao deve retornar e nao insere na lista', () => {
    const tamanhoAntes = agendaRepository.listarAgenda().length;
    

    const agendaInserida = agendaRepository.inserirAgenda({ 
        pacienteNome: "João"
    });
    expect(agendaInserida).toBeUndefined();
    expect(agendaRepository.listarAgenda()).toHaveLength(tamanhoAntes);
});


// Cenário de sucesso para buscarPorIdAgenda
test('Quando buscar agenda por id existente, deve retornar a agenda', () => {
    const agendaEsperada = { 
        id: 1, 
        data: "05/11/24", 
        pacienteNome: "João" 
    };
    agendaRepository.inserirAgenda({ 
        data: "05/11/24", 
        pacienteNome: "João" 
    });
    agendaRepository.inserirAgenda({ 
        data: "06/11/24", 
        pacienteNome: "Maria" 
    });
    expect(agendaRepository.buscarPorIdAgenda(1)).toEqual(agendaEsperada);
});

// Cenário de exceção para buscarPorIdAgenda
test('Quando buscar agenda por id inexistente, deve retornar undefined', () => {
    expect(agendaRepository.buscarPorIdAgenda(99)).toBeUndefined();
});


// Cenário de sucesso para atualizarAgenda
test('Quando atualizar uma agenda, deve retornar a agenda atualizada', () => {
    // agendaRepository.inserirAgenda({ 
    //     data: "05/11/24", 
    //     pacienteNome: "João" 
    // });
    // agendaRepository.inserirAgenda({ 
    //     data: "06/11/24", 
    //     pacienteNome: "Maria" 
    // });
    const agendaAtualizadaEsperada = { 
        id: 1, data: "06/11/24", 
        pacienteNome: "Mauro" 
    };
    const agendaAtualizada = agendaRepository.atualizarAgenda(1, { 
        data: "06/11/24", 
        pacienteNome: "Mauro" 
    });
    expect(agendaAtualizada).toEqual(agendaAtualizadaEsperada);
});

// Cenário de exceção para atualizarAgenda
test('Quando tentar atualizar agenda com id inexistente, nao deve retornar e nao altera a lista', () => {
    // agendaRepository.inserirAgenda({ 
    //     data: "05/11/24", 
    //     pacienteNome: "João" 
    // });
    // agendaRepository.inserirAgenda({ 
    //     data: "06/11/24", 
    //     pacienteNome: "Maria" 
    // });
    const agendaAtualizada = agendaRepository.atualizarAgenda(99, { 
        data: "06/11/24", 
        pacienteNome: "Mauro" 
    });
    expect(agendaAtualizada).toBeUndefined();
    expect(agendaRepository.listarAgenda()).toHaveLength(1);
    // buscar pelo id e ver se ao atualizar ele existe
});


// Cenário de sucesso para deletarAgenda
test('Quando deletar uma agenda existente, deve retornar a agenda removida e remover da lista', () => {
    agendaRepository.inserirAgenda({ 
        id: 1,
        data: "05/11/24", 
        pacienteNome: "João" 
    });
    // agendaRepository.inserirAgenda({ 
    //     id: 3,
    //     data: "06/11/24", 
    //     pacienteNome: "Maria" 
    // });
    const agendaRemovida = agendaRepository.deletarAgenda(1);
    expect(agendaRemovida.id).toEqual(1);
    expect(agendaRepository.listarAgenda()).toHaveLength(0);
});

// Cenário de exceção para deletarAgenda
test('Quando tentar deletar agenda com id inexistente, nao deve retornar e lista tem que ficar igual', () => {
    agendaRepository.inserirAgenda({ 
        data: "05/11/24", 
        pacienteNome: "João" 
    });
    agendaRepository.inserirAgenda({ 
        data: "06/11/24", 
        pacienteNome: "Maria" 
    });
    const agendaRemovida = agendaRepository.deletarAgenda(99);
    expect(agendaRemovida).toBeUndefined();
    expect(agendaRepository.listarAgenda()).toHaveLength(1);
});

