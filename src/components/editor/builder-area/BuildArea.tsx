// import { useState } from "react";
import styled from "@emotion/styled"
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";

import { ComponentMap } from "../../../config/ComponentMap";
import { TComponentTree, TComponentInstance } from '../types';

const StyledBuildArea = styled.div`
    min-height: 100vh;
    margin-left: 270px;
    border: 2px dashed #ccc;
    padding: 10px;

    & .bxvse_select_component_checkbox {
        display: none;
    }

    &.select_mode_on .bxvse_select_component_checkbox {
        display: block;
    }

    &.select_mode_on .bxvse_component:hover {
        border: .7px dashed blue;
        cursor: default;
    }
    &.select_mode_on .bxvse_component.bxvse_selected_in_editor {
        border: 2px solid blue;
        cursor: default;
    }
`
type BuildAreaProps = {
    componentTree: TComponentTree
    addComponent: (newComponentInstance: TComponentInstance, parentId?: string) => void
    // setComponentsTree: React.Dispatch<React.SetStateAction<ComponentInstance[]>>
    // selectModeOn: boolean
    // selectedCompId: string
    // setSelectedCompId: React.Dispatch<React.SetStateAction<string>>
}

const BuildArea = ({ 
        componentTree, addComponent,
        // setComponentsTree, selectModeOn, selectedCompId, setSelectedCompId
    }: BuildAreaProps) => {
    const { setNodeRef } = useDroppable({
        id: 'build-area',
    });

    useDndMonitor({
        onDragEnd(event) {
            if (event.over?.id === 'build-area') {
                console.log(event.active.id);
                const newCompInstance: TComponentInstance = {
                    compId: event.active.id as string,    // to refer ComponentMap
                    componentInstanceId: uuidv4(),       // to refer the actual component
                }
                console.log('>>>>>>calling addComponent');
                addComponent(newCompInstance, 'root');
            }
        },
    });

    // const markComponentAsSelected = (isSelected: boolean, compId: string) => {
    //     if (isSelected) {
    //         setSelectedCompId(compId);
    //     }
    //     else {
    //         setSelectedCompId('');
    //     }
    // }

    /**
     * Recursively build the component tree and return the JSX
     * @param comps 
     * @returns 
     */
    function buildJSXFromComponentTree(componentInstanceIds: string[]) {
        return componentInstanceIds.map(compInstanceId => {
            const compInstance = componentTree.components[compInstanceId];
            const compDef = ComponentMap[compInstance.compId];

            return (
                <compDef.component
                    {...compInstance?.props}
                    key={compInstanceId}
                    data-id={compInstanceId}
                    className={clsx("bxvse_component", compInstance?.props?.className,
                        // selectedCompId === compInstance.instanceId && 'bxvse_selected_in_editor'
                    )}
                    onClick={(e: any) => {
                        // if (selectModeOn) {
                        //     markComponentAsSelected(true, compInstance.instanceId);
                        // }
                        // else {
                            compInstance?.props?.onClick(e);
                        // }
                    }}
                >
                    { compInstance.childrenIds && buildJSXFromComponentTree(compInstance.childrenIds) }
                </compDef.component>
            )
        })
    }

    return (
        <StyledBuildArea 
            ref={setNodeRef} 
            // className={clsx(selectModeOn && 'select_mode_on')}
        >
            { buildJSXFromComponentTree(['root']) }
        </StyledBuildArea>
    );
};

export default BuildArea;