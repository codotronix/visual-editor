import styled from "@emotion/styled"
import ToggleButton from "../button/ToggleButton"

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

    & > .day_night_toggle {
        position: absolute;
        right: 15px;
    }
`
type THeader = {
    isLightMode: boolean
    toggleLightMode: () => {}
}

const Header = ({ isLightMode, toggleLightMode }: THeader) => {
    return (
        <StyledHeader>
            Visual Editor
            
            <ToggleButton 
                className="day_night_toggle"
                isActive={isLightMode}
                onClick={toggleLightMode}
                child2={<i className="fa-solid fa-sun"></i>}
                child1={<i className="fa-solid fa-moon"></i>}
            />
        </StyledHeader>
    )
}

export default Header