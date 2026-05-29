import styles from './styles.module.css'
import { Container } from '../components/Container'
import { InputPadrao } from '../components/InputPadrao'
import { Pencil, X } from 'lucide-react'
//Tipar formato do curso
export interface Curso {
    id: string;
    nome: string;
    periodo: string;
}

//Definir Props para o componente que receberá de Home
interface ListaCursosProps { //Instrução e função é chave
    cursos: Curso[];//Lista (array de cursos)
    aoEditar: (curso: Curso) => void;//Será o disparo quando clicar em lápis
    aoExcluir: (id: string) => void;//Disparado ao clicar no X
}

export function ListaCursos({ cursos, aoEditar, aoExcluir }: ListaCursosProps) {
    return (
        <>

            <Container>
                <section className={styles.listaContainer}>
                    <h2 className={styles.titulo}>Lista de Cursos</h2>
                    <div className={styles.buscaContainer}>
                        <InputPadrao
                            type='text'
                            placeholder='Buscar curso pelo nome'
                        /> {/*fim do InputPadrao*/}
                    </div>
                    <table className={styles.tabela}>
                        <thead> {/*Equivale a coluna*/}
                            <th>Curso</th>
                            <th>Período</th>
                            <th>Ações</th>
                        </thead>
                        {/*Aplicar a lógica*/}
                        <tbody>
                            {cursos.map((curso) => (
                                <tr key = {curso.id}>
                                    <td>{curso.nome}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button 
                                        className={styles.actionButton}
                                        title='Editar'
                                        onClick={()=>aoEditar(curso)}
                                        >
                                            <span><Pencil size={18}/></span>
                                        </button>
                                        <button 
                                        className={styles.actionButton}
                                        title='Excluir'
                                        onClick={()=>aoExcluir(curso.id)}
                                        >
                                            <span><X size={18}/></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </Container>
        </>
    )
}