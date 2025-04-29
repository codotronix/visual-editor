type THeaderProps = {
    className?: string
    restProps?: { [key: string]: any }
}

const Header = ({className, ...restProps}: THeaderProps) => {
    return (
        <header className={className} {...restProps}>
            <h1>Header</h1>
        </header>
    )
}

export default Header