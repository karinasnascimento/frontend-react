import styles from './styles.module.css'
import type { InputHTMLAttributes } from 'react';

interface InputPadraoProps extends InputHTMLAttributes<HTMLInputElement> {
    //Pode adicionar propriedades customizadas no futuro
    //InputHTMLAttributes traz id, type, placeholder, value etc
}

export function InputPadrao({ className, ...rest }: InputPadraoProps) {
    return (
        <>
            <input className={`${styles.input} ${className || ''}`}
                {...rest}
            />
        </>
    )
}