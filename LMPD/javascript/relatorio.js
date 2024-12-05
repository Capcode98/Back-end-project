// Função para buscar dados de médias dos cursos
async function fetchMediaDados() {
    try {
        const response = await fetch('http://localhost:3000/dados-graficos');
        if (!response.ok) throw new Error('Erro ao buscar dados das médias');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

// Função para buscar o número de alunos por curso
async function fetchNumeroAlunos() {
    try {
        const response = await fetch('http://localhost:3000/numero-alunos');
        if (!response.ok) throw new Error('Erro ao buscar número de alunos');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

// Função para gerar o relatório
async function gerarRelatorio() {
    const mediaDados = await fetchMediaDados();
    const numeroAlunos = await fetchNumeroAlunos();

    const conteudoRelatorio = document.getElementById('conteudo-relatorio');
    conteudoRelatorio.innerHTML = ''; // Limpa conteúdo anterior

    // Adiciona seção de médias
    const mediaSection = document.createElement('section');
    mediaSection.innerHTML = `
        <h2>Média de Notas por Curso</h2>
        <p>Abaixo estão as médias de notas para cada curso:</p>
        <ul>
            ${mediaDados.map(d => `
                <li><strong>${d.curso}:</strong> Média de Nota: ${d.media}</li>
            `).join('')}
        </ul>
    `;
    conteudoRelatorio.appendChild(mediaSection);

    // Adiciona seção de número de alunos
    const alunosSection = document.createElement('section');
    alunosSection.innerHTML = `
        <h2>Número de Alunos por Curso</h2>
        <p>Abaixo está o número de alunos por curso nos anos de 2023 e 2024:</p>
        <ul>
            ${numeroAlunos.map(d => `
                <li><strong>${d.curso}:</strong> 
                    <br>Alunos em 2023: ${d.alunos_2023} 
                    <br>Alunos em 2024: ${d.alunos_2024}
                </li>
            `).join('')}
        </ul>
    `;
    conteudoRelatorio.appendChild(alunosSection);
}

// Função para gerar o PDF com melhor formatação
async function gerarPDF() {
    const mediaDados = await fetchMediaDados();
    const numeroAlunos = await fetchNumeroAlunos();

    const doc = new window.jspdf.jsPDF(); // jsPDF acessível globalmente a partir de window

    // Título do relatório
    doc.setFontSize(18);
    doc.text('Relatório Detalhado de Cursos', 10, 10);

    // Adiciona uma breve descrição
    doc.setFontSize(12);
    doc.text('Este relatório contém informações detalhadas sobre a média de notas e o número de alunos para cada curso nos anos de 2023 e 2024.', 10, 20);
    doc.text('---------------------------------------------------------------', 10, 30);

    // Adiciona a seção de médias
    doc.setFontSize(14);
    doc.text('Média de Notas por Curso:', 10, 40);
    doc.setFontSize(12);

    let yPosition = 50;
    mediaDados.forEach(d => {
        doc.text(`${d.curso}: Média de Nota: ${d.media}`, 10, yPosition);
        yPosition += 6; // Ajuste o espaçamento entre as linhas
    });

    // Quebra de linha
    yPosition += 10;

    // Adiciona a seção de número de alunos
    doc.setFontSize(14);
    doc.text('Número de Alunos por Curso:', 10, yPosition);
    yPosition += 10; // Ajusta a posição vertical

    doc.setFontSize(12);
    numeroAlunos.forEach(d => {
        doc.text(`${d.curso}:`, 10, yPosition);
        yPosition += 6;
        doc.text(`Alunos em 2023: ${d.alunos_2023}`, 10, yPosition);
        yPosition += 6;
        doc.text(`Alunos em 2024: ${d.alunos_2024}`, 10, yPosition);
        yPosition += 10; // Espaço entre os cursos
    });

    // Salva o PDF
    doc.save('relatorio-detalhado.pdf');
}

// Configurações iniciais
document.addEventListener('DOMContentLoaded', () => {
    gerarRelatorio();

    // Adiciona evento ao botão de imprimir
    document.getElementById('btn-imprimir').addEventListener('click', gerarPDF);
});
