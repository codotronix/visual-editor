import styled from "@emotion/styled"
import { useEditorContext } from "../editorContext"

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

    & > button {
        background: transparent;
        color: var(--color-text);
        padding: 3px;
    }

    @keyframes appear {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

const ComponentContextMenu = () => {
    const { selectedCompId } = useEditorContext()
    return (
        <StyledComponentContextMenu>
            <button onClick={() => console.log('Edit')} disabled={!selectedCompId}>
                Add after current selection
            </button>
            <button onClick={() => console.log('Delete')} disabled={!selectedCompId}>
                Add before current selection
            </button>
            <button onClick={() => console.log('Delete')} disabled={!selectedCompId}>
                Replace current selection
            </button>
            <button onClick={() => console.log('Delete')}>
                Add at the top
            </button>
            <button onClick={() => console.log('Delete')}>
                Add at the bottom
            </button>
        </StyledComponentContextMenu>
    )
}

export default ComponentContextMenu