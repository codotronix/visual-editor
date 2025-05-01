type TFooterProps = {
    className?: string
    text?: string
    restProps?: { [key: string]: any }
}

const Footer = ({ className='', text, ...restProps }: TFooterProps) => {
    return (
        <footer className={className} {...restProps}>
            <h1>{text}</h1>
        </footer>
    )
}

export default Footer