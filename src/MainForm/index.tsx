import styles from './style.module.css'
import { Container } from '../components/Container';
import { InputPadrao } from '../components/InputPadrao';
import { BotaoPadrao } from '../components/BotaoPadrao';
import { useEffect, useState } from 'react';

interface DadosCurso {
    nomecurso: string;
    periodo: string;
}
interface MainFormProps {
    aoAdicionar: (curso: any) => void;
    aoAtualizar: (curso: any) => void;
    cursoEmEdicao: any | null;
}
export function MainForm({ aoAdicionar, aoAtualizar, cursoEmEdicao }: MainFormProps) {
    /*Criar os hooks, funções os eventos. A lógica fica aqui*/
    const [dadosCurso, setDadosCurso] = useState<DadosCurso>({ nomecurso: '', periodo: '' })
    /*Fazer o useEffect para ter uma função*/
    useEffect(() => {
        if (cursoEmEdicao) {
            setDadosCurso({
                nomecurso: cursoEmEdicao.nome,
                periodo: cursoEmEdicao.periodo
            });
        } else {
            setDadosCurso({ nomecurso: '', periodo: '' })
        }
    }, [cursoEmEdicao]);
    const lidarComMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDadosCurso({
            ...dadosCurso,
            [e.target.name]: e.target.value
        });
    };

    /*Fazer o cadastrar*/
    const cadastrarCurso = (e: any) => {
        e.preventDefault();
        if (cursoEmEdicao) {
            const cursoAtualizado = {
                id: cursoEmEdicao.id,
                nome: dadosCurso.nomecurso,
                periodo: dadosCurso.periodo,
            };
            console.log("Alteração em formato JSON:/n",
                JSON.stringify(cursoAtualizado, null, 2));
            aoAtualizar(cursoAtualizado);
        }
        else {
            const cursoNovo = {
                id: "", //Deixar vazio pq o home calcula (auto-increment)
                nome: dadosCurso.nomecurso,
                periodo: dadosCurso.periodo
            }
            console.log("Inclusão em formato JSON:/n",
                JSON.stringify(cursoNovo, null, 2));
            aoAdicionar(cursoNovo);

        }
        setDadosCurso({ nomecurso: '', periodo: '' });

    } //Fim do cadastrarCurso

    return (
        <>
            <Container>
                <section className={styles.formularioContainer}>
                    <h2 className={styles.titulo}>
                        {cursoEmEdicao ? 'Editar Curso' : 'Cadastrar Novo Curso'}
                    </h2>
                    <form onSubmit={cadastrarCurso} >
                        <div className={styles.pularLinha}>
                            <label htmlFor="nomecurso" className={styles.label}>Nome Curso</label>
                            <InputPadrao
                                type='text'
                                id='nomecurso'
                                name='nomecurso'
                                placeholder='Ex: DevOps'
                                value={dadosCurso.nomecurso} /*{dadosCurso.nomeCurso}*/
                                onChange={lidarComMudanca}
                                required
                            />
                        </div>{/*Fim da div do BotaoPadrao*/}
                        <div className={styles.pularLinha}>
                            <label htmlFor="periodo" className={styles.label}>Período</label>
                            <select
                                id="periodo"
                                name="periodo"
                                className={styles.estiloTabela}
                                value={dadosCurso.periodo}
                                onChange={lidarComMudanca}
                                required
                            >
                                <option value="">Selecione um período</option>
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                                <option value="Noturno">Noturno</option>
                                <option value="Integral">Integral</option>
                            </select>
                        </div>
                        <div>
                            <BotaoPadrao type='submit'>
                                {cursoEmEdicao ? 'Salvar Alteração' : 'Inserir Curso'}
                            </BotaoPadrao>
                        </div>{/*Fim da div do botão*/}
                    </form>{/*Fim do formulário*/}
                </section>{/*Fim da section*/}
            </Container>
        </>
    )
}