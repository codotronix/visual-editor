import styled from "@emotion/styled"
import { useEditorContext } from "./editorContext"

const StyledTopToolBox = styled.div`
    margin-left: 270px;
    padding: 10px 15px;
    background: var(--color-toolbar-bg);
    position: fixed;
    top: 40px;
    left: 0;
    right: 270px;
`

const TopToolBox = () => {
    const { selectModeOn, setSelectModeOn } = useEditorContext();
    return(
        <StyledTopToolBox>
            <label>
                <input type="checkbox" checked={selectModeOn} onChange={e => setSelectModeOn(e.target.checked)} className="mr-5" />
                Selection Mode On
            </label>
        </StyledTopToolBox>
    )
}

export default TopToolBox