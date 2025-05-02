import styled from "@emotion/styled";

type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}

const StyledButton = styled.button`
    user-select: none;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 5px 10px;
    background: transparent;
    color: var(--color-text);

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:hover {
        background: rgba(155, 155, 155, 0.1);
    }
`

const Button = ({ children, type='button', ...restProps } : TButton) => {
    return (
        <StyledButton 
            type={type}
            {...restProps}
        >
            {children}
        </StyledButton>
    )
}

export default Button;