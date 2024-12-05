let chartInstance = null; // Variável global para armazenar a instância do gráfico

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/dados-graficos');
        const data = await response.json();

        const labelsX = data.map(item => item.curso); // Cursos (eixo X)
        const valoresY2024 = data.map(item => parseFloat(item.media)); // Médias (eixo Y)

        // Obtém o elemento canvas
        const canvasElement = document.getElementById('graficoBarra');
        const ctx = canvasElement.getContext('2d');

        // Verifica se há um gráfico existente e o destrói
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Cria o novo gráfico de barras
        chartInstance = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico: barra
            data: {
                labels: labelsX, // Cursos no eixo X
                datasets: [{
                    label: 'Média das Notas por Curso',
                    data: valoresY2024, // Médias das notas no eixo Y
                    backgroundColor: 'rgba(75, 192, 192, 0.5)', // Cor das barras
                    borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true // Garante que a escala Y começa em 0
                    }
                }
            }
        });

    } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err);
    }
});

let chartInstance2 = null; // Variável global para armazenar a instância do gráfico

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Requisição para buscar os dados da API
        const response = await fetch('http://localhost:3000/dados-graficos');  // A URL do endpoint que retorna os dados
        const data = await response.json();  // Recebe os dados em formato JSON

        // Mapeia os dados recebidos para os valores de rótulos e valores Y
        const labelsXCursos = data.map(item => item.curso); // Ex: ["Computação", "Medicina", ...]
        const valoresY2023 = data.map(item => parseFloat(item.media)); // Média de 2023
        const valoresY2024 = data.map(item => parseFloat(item.media)); // Média de 2024 (aqui estamos assumindo que são iguais por enquanto)

        // Seleciona o canvas onde o gráfico será renderizado
        const ctx2 = document.getElementById('grafico2').getContext('2d');

        // Verifica se já existe um gráfico para destruir antes de criar um novo
        if (chartInstance2) {
            chartInstance2.destroy();
        }

        // Criação do gráfico de barras
        chartInstance2 = new Chart(ctx2, {
            type: 'bar',  // Tipo do gráfico (barras)
            data: {
                labels: labelsXCursos,  // Rótulos dos cursos
                datasets: [{
                    label: 'Indicador de Desempenho por curso 2023',  // Rótulo para 2023
                    data: valoresY2023,  // Dados para 2023
                    borderWidth: 1
                },
                {
                    label: 'Indicador de Desempenho por curso 2024',  // Rótulo para 2024
                    data: valoresY2024,  // Dados para 2024
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',  // Exibe gráfico de barras horizontais
                scales: {
                    y: {
                        beginAtZero: true  // Inicia o eixo Y no zero
                    }
                }
            }
        });

    } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err);
    }
});
let chartInstance3 = null; // Variável global para armazenar a instância do gráfico

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Requisição para buscar os dados de número de alunos por curso
        const response = await fetch('http://localhost:3000/numero-alunos');  // URL da nova rota
        const data = await response.json();  // Recebe os dados em formato JSON

        // Mapeia os dados recebidos para os valores de rótulos (cursos) e números de alunos
        const labelsCursos = data.map(item => item.curso); // Ex: ["Computação", "Medicina", ...]
        const alunos2023 = data.map(item => parseInt(item.alunos_2023)); // Número de alunos em 2023
        const alunos2024 = data.map(item => parseInt(item.alunos_2024)); // Número de alunos em 2024

        // Obtém o elemento canvas
        const canvasElement = document.getElementById('grafico3');
        const ctx = canvasElement.getContext('2d');

        // Verifica se há um gráfico existente e o destrói
        if (chartInstance3) {
            chartInstance3.destroy();
        }

        // Criação do gráfico de barras
        chartInstance3 = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico: barra
            data: {
                labels: labelsCursos, // Cursos no eixo X
                datasets: [{
                    label: 'Número de Alunos por Curso 2023',  // Rótulo para 2023
                    data: alunos2023,  // Número de alunos em 2023
                    backgroundColor: 'rgba(77,166,253,0.85)', // Cor das barras para 2023
                    borderColor: 'rgba(77,166,253,1)', // Cor da borda das barras para 2023
                    borderWidth: 1
                },
                {
                    label: 'Número de Alunos por Curso 2024',  // Rótulo para 2024
                    data: alunos2024,  // Número de alunos em 2024
                    backgroundColor: 'rgba(6,204,6,0.85)', // Cor das barras para 2024
                    borderColor: 'rgba(6,204,6,1)', // Cor da borda das barras para 2024
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,  // Torna o gráfico responsivo
                maintainAspectRatio: false,  // Mantém o aspecto do gráfico
                
            }
        });

    } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err);
    }
});

let chartInstance4 = null;
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/numero-alunos');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados do servidor');
        }

        const data = await response.json();

        const labelsCursos = data.map(item => item.curso);
        const alunos2023 = data.map(item => item.alunos_2023);
        const alunos2024 = data.map(item => item.alunos_2024);

        const ctx4 = document.getElementById('grafico4').getContext('2d');  // Alterei de 'grafico3' para 'grafico4'

        let grafico4 = new Chart(ctx4, {  // Alterei de 'grafico3' para 'grafico4'
            type: 'bar',
            data: {
                labels: labelsCursos,
                datasets: [{
                    label: 'Número de alunos por curso 2023',
                    data: alunos2023,
                    borderWidth: 1,
                    backgroundColor: 'rgba(77,166,253,0.85)',
                },
                {
                    label: 'Número de alunos por curso 2024',
                    data: alunos2024,
                    borderWidth: 1,
                    backgroundColor: 'rgba(6,204,6,0.85)',
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err);
    }
});
