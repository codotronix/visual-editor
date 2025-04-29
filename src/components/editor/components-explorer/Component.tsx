import styled from "@emotion/styled"
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type ComponentType = {
    id: string
    name: string
}

const StyledComponent = styled.div`
    padding: 10px 15px;
    user-select: none;
    border: 1px solid #ccc;
`

const Component = ({ id, name }: ComponentType) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id,
        data: { name }
    });
    const dragStyle = {
        transform: CSS.Translate.toString(transform),
    };
    return (
        <StyledComponent 
            ref={setNodeRef} 
            style={dragStyle} 
            {...listeners} 
            {...attributes}
        >
            {name}
        </StyledComponent>
    )
}

export default Component