// import { HomeIcon } from 'lucide-react'
import { Container } from '../../components/Container';
import { MainForm } from '../../MainForm';
import { ListaCursos, type Curso } from '../../ListaCursos';
import { useState, useEffect } from 'react';

export function Home() {
    // Lógica do TypeScript
    const [cursos, setCursos] = useState<Curso[]>(() => {
        const cursosSalvos = localStorage.getItem('cursosLocalStorage');
        if (cursosSalvos) {
            return JSON.parse(cursosSalvos);
        }
        return []; //Retorna lista vazia
    });
    const [cursoEmEdicao, setCursoEmEdicao] = useState<Curso | null>(null);
    useEffect(() => {
        localStorage.setItem('cursosLocalStorage', JSON.stringify(cursos))
    }, [cursos]);

    const adicionarCurso = (novoCurso: Curso) => {
        //garante que a lista sempre atualize
        setCursos((cursosAtuais) => {
            const maiorIdAtual = cursosAtuais.length > 0
                ? Math.max(...cursosAtuais.map(curso=>Number(curso.id))): 0;
            const cursoFinal = { ...novoCurso, id: String(maiorIdAtual + 1) };
            return [...cursosAtuais, cursoFinal]
        });
    };

    const excluirCurso=(id:string)=>{
        const cursosAtualizados = cursos.filter((curso)=>String(curso.id)!==String(id))
        setCursos(cursosAtualizados);
    }

    const editarCurso = (curso:Curso)=> {
        setCursoEmEdicao(curso);
    }

    const atualizarCurso = (cursoAtualizado: Curso)=> {
        const cursosAtualizados = cursos.map((curso)=>
            String(curso.id) === String(cursoAtualizado) ? cursoAtualizado:curso)
    
        setCursos(cursosAtualizados);
        setCursoEmEdicao(null);
    }

    return (
        // Inserir toda a estrutura HTML
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