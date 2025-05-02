import styled from "@emotion/styled"

const StyledHeader = styled.header`
    background: var(--color-header-bg);
    color: var(--color-header-text);
    border-bottom: 1px solid var(--color-header-border);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`

const Header = () => {
    return (
        <StyledHeader>
            Visual Editor
        </StyledHeader>
    )
}

export default Header