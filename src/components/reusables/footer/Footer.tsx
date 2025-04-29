type TFooterProps = {
    className?: string
    restProps?: { [key: string]: any }
}

const Footer = ({ className='', ...restProps }: TFooterProps) => {
    return (
        <footer className={className} {...restProps}>
            <h1>Footer</h1>
        </footer>
    )
}

export default Footer