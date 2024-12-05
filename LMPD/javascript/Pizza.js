let chartInstance1 = null; // Variável global para armazenar a instância do gráfico 1
let chartInstance2 = null; // Variável global para armazenar a instância do gráfico 2

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/dados-graficos');
        const data = await response.json();

        const labelsX = data.map(item => item.curso);
        const valoresY2024 = data.map(item => parseFloat(item.media));

        // Primeiro gráfico
        const canvasElement1 = document.getElementById('grafico1');
        const ctx1 = canvasElement1.getContext('2d');

        // Verifica se há um gráfico existente e o destrói
        if (chartInstance1) {
            chartInstance1.destroy();
        }

        // Cria o gráfico 1
        chartInstance1 = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: labelsX,
                datasets: [{
                    label: 'Média por Curso em 2024',
                    data: valoresY2024,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 100)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

        // Segundo gráfico (Rosquinha)
        const canvasElement2 = document.getElementById('grafico2');
        const ctx2 = canvasElement2.getContext('2d');

        // Verifica se há um gráfico existente e o destrói
        if (chartInstance2) {
            chartInstance2.destroy();
        }

        // Cria o gráfico 2 (rosquinha)
        chartInstance2 = new Chart(ctx2, {
            type: 'doughnut', // Mudança de 'pie' para 'doughnut'
            data: {
                labels: labelsX,
                datasets: [{
                    label: 'Média por Curso em 2024',
                    data: valoresY2024,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 100)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ],
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutoutPercentage: 50, // Faz o buraco da rosquinha
            }
        });

    } catch (err) {
        console.error('Erro ao carregar dados do gráfico:', err);
    }
});
