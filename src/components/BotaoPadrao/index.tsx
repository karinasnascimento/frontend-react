import { Children, type ButtonHTMLAttributes } from "react";
import styles from './styles.module.css'
interface BotaoPadraoProps extends ButtonHTMLAttributes<HTMLButtonElement> { }
export function BotaoPadrao({ className, children, ...rest }: BotaoPadraoProps) {
    return (
        <>
            <button
                className={`${styles.botao} ${className || ''}`}
            >
                {children}
            </button>
        </>
    )
}