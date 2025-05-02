import styled from "@emotion/styled"
import { useEditorContext } from "../editorContext"
import { Button } from "../../vse"

const StyledComponentContextMenu = styled.div`
    position: absolute;
    top: 35px;
    right: 10px;
    width: 200px;
    background-color: var(--color-surface);
    display: flex;
    flex-direction: column;
    z-index: 2;
    animation: appear 900ms ease;

    @keyframes appear {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

const ComponentContextMenu = () => {
    const { selectedComponentInstanceId } = useEditorContext()
    return (
        <StyledComponentContextMenu>
            <Button onClick={() => console.log('Edit')} disabled={!selectedComponentInstanceId}>
                Add after current selection
            </Button>
            <Button onClick={() => console.log('Delete')} disabled={!selectedComponentInstanceId}>
                Add before current selection
            </Button>
            <Button onClick={() => console.log('Delete')} disabled={!selectedComponentInstanceId}>
                Replace current selection
            </Button>
            <Button onClick={() => console.log('Delete')}>
                Add at the top
            </Button>
            <Button onClick={() => console.log('Delete')}>
                Add at the bottom
            </Button>
        </StyledComponentContextMenu>
    )
}

export default ComponentContextMenu