// import { HomeIcon } from 'lucide-react'
import { Container } from '../../components/Container';
import { MainForm } from '../../MainForm';
import { ListaCursos, type Curso } from '../../ListaCursos';
import { useState, useEffect } from 'react';

export function Home() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [cursoEmEdicao, setCursoEmEdicao] = useState<Curso | null>(null);

    const API_URL = 'http://localhost:5000/curso';

    const carregarCursos = async () => {
        try {
            const resposta = await fetch(API_URL);
            if (resposta.ok) {
                const dados = await resposta.json();
                setCursos(dados);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do banco:", error);
        }
    };

    useEffect(() => {
        carregarCursos();
    }, []);

    const adicionarCurso = async (novoCurso: Curso) => {
        try {
            const resposta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: novoCurso.nome,
                    periodo: novoCurso.periodo
                })
            });

            if (resposta.ok) {
                carregarCursos(); // Recarrega a lista direto do banco atualizada
            } else {
                alert("Erro ao salvar o curso no banco.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const excluirCurso = async (id: string) => {
        if (!confirm("Deseja mesmo excluir este curso?")) return;

        try {
            const resposta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (resposta.ok) {
                setCursos((cursosAtuais) => cursosAtuais.filter((curso) => String(curso.id) !== String(id)));
            } else {
                alert("Erro ao deletar do banco.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editarCurso = (curso: Curso) => {
        setCursoEmEdicao(curso);
    };

    const atualizarCurso = async (cursoAtualizado: Curso) => {
        try {
            const resposta = await fetch(`${API_URL}/${cursoAtualizado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: cursoAtualizado.nome,
                    periodo: cursoAtualizado.periodo
                })
            });

            if (resposta.ok) {
                carregarCursos();
                setCursoEmEdicao(null);
            } else {
                alert("Erro ao atualizar o curso.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Container>
                <MainForm 
                    aoAdicionar={adicionarCurso}
                    aoAtualizar={atualizarCurso}
                    cursoEmEdicao={cursoEmEdicao}
                />
                <ListaCursos 
                    cursos={cursos}
                    aoEditar={editarCurso}
                    aoExcluir={excluirCurso}
                />
            </Container>
        </>
    );
}