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
    box-shadow: 0px 0px 6px 2px var(--color-shadow);

    @keyframes appear {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

export type TComponentContextMenuProps = {
    compId: string, 
    posY: number
}

const ComponentContextMenu = ({ compId }: TComponentContextMenuProps) => {
    const { selectedComponentInstanceId, createComponent, createComponentAsFirstChild } = useEditorContext()
    return (
        <StyledComponentContextMenu>
            <Button onClick={() => createComponent(compId, selectedComponentInstanceId || 'root')}>
                Add
            </Button>
            <Button onClick={() => console.log('Edit')} disabled={!selectedComponentInstanceId}>
                Add after current selection
            </Button>
            <Button onClick={() => console.log('Delete')} disabled={!selectedComponentInstanceId}>
                Add before current selection
            </Button>
            <Button onClick={() => console.log('Delete')} disabled={!selectedComponentInstanceId}>
                Replace current selection
            </Button>
            <Button onClick={() => createComponentAsFirstChild(compId, selectedComponentInstanceId || 'root')}>
                Add at the top
            </Button>
        </StyledComponentContextMenu>
    )
}

export default ComponentContextMenu