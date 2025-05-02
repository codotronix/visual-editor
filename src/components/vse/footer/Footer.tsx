import styled from "@emotion/styled"

const StyledFooter = styled.footer`
    background: var(--color-footer-bg);
    color: var(--color-footer-text);
    border-bottom: 1px solid var(--color-footer-border);
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
`

const Footer = () => {
    return (
        <StyledFooter>
            &copy; 2025 Suman Barick
        </StyledFooter>
    )
}

export default Footer