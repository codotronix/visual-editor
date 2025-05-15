import styled from "@emotion/styled"
import { useEditorContext } from "./editorContext"
import { ToggleButton } from "../vse"

const StyledTopToolBox = styled.div`
    margin-left: 270px;
    padding: 10px 15px;
    /* background: var(--color-toolbar-bg); */
    background: var(--color-sidebar-bg);
    border-bottom: 1px solid var(--color-border);
    position: fixed;
    top: 40px;
    left: 0;
    right: 270px;
    display: flex;
    justify-content: space-between;
`

const TopToolBox = () => {
    const { selectModeOn, setSelectModeOn, isMobileView, setIsMobileView } = useEditorContext();
    return(
        <StyledTopToolBox>
            <label>
                <input type="checkbox" checked={selectModeOn} onChange={e => setSelectModeOn(e.target.checked)} className="mr-5" />
                Selection Mode On
            </label>

            <ToggleButton 
                isActive={isMobileView}
                onClick={() => setIsMobileView(!isMobileView)}
                child2={<i className="fa-solid fa-mobile-screen-button"></i>}
                child1={<i className="fa-solid fa-desktop"></i>}
            />
        </StyledTopToolBox>
    )
}

export default TopToolBox