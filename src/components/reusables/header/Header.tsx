type THeaderProps = {
    className?: string
    text?: string
    restProps?: { [key: string]: any }
}

const Header = ({className, text, ...restProps}: THeaderProps) => {
    return (
        <header className={className} {...restProps}>
            <h1>{text}</h1>
        </header>
    )
}

export default Header