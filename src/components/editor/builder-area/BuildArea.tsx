import { useState } from "react";
import styled from "@emotion/styled"
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';

import { ComponentMap } from "../../../config/ComponentMap";

const StyledBuildArea = styled.div`
    min-height: 100vh;
    margin-left: 270px;
    border: 2px dashed #ccc;
    padding: 10px;
`

type ComponentInstance = {
    compId: string;       // to refer ComponentMap
    instanceId: string;   // to refer the actual component
}

const BuildArea = () => {
    const { setNodeRef } = useDroppable({
        id: 'build-area',
    });

    const [components, setComponents] = useState<ComponentInstance[]>([]);

    useDndMonitor({
        onDragEnd(event) {
            if (event.over?.id === 'build-area') {
                console.log(event.active.id);
                const droppedComponent = {
                    compId: event.active.id as string,    // to refer ComponentMap
                    instanceId: uuidv4(),       // to refer the actual component
                }
                setComponents((prev) => [...prev, droppedComponent]);
            }
        },
    });

    return (
        <StyledBuildArea ref={setNodeRef}>
            {components.map((comp) => {
                const compDef = ComponentMap[comp.compId];
                return (
                    <compDef.component 
                        key={comp.instanceId} 
                        data-id={comp.instanceId}
                    />
                )
            })}
        </StyledBuildArea>
    );
};

export default BuildArea;