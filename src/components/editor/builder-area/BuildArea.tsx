// import { useState } from "react";
import styled from "@emotion/styled"
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";

import { ComponentMap } from "../../../config/ComponentMap";
import { ComponentInstance } from '../types';

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
    componentsTree: ComponentInstance[]
    setComponentsTree: React.Dispatch<React.SetStateAction<ComponentInstance[]>>
    selectModeOn: boolean
    selectedCompId: string
    setSelectedCompId: React.Dispatch<React.SetStateAction<string>>
}

const BuildArea = ({ 
        componentsTree, setComponentsTree, selectModeOn, selectedCompId, setSelectedCompId
    }: BuildAreaProps) => {
    const { setNodeRef } = useDroppable({
        id: 'build-area',
    });

    useDndMonitor({
        onDragEnd(event) {
            if (event.over?.id === 'build-area') {
                console.log(event.active.id);
                const droppedComponent = {
                    compId: event.active.id as string,    // to refer ComponentMap
                    instanceId: uuidv4(),       // to refer the actual component
                }
                setComponentsTree(tree => [...tree, droppedComponent]);
            }
        },
    });

    const markComponentAsSelected = (isSelected: boolean, compId: string) => {
        if (isSelected) {
            setSelectedCompId(compId);
        }
        else {
            setSelectedCompId('');
        }
    }

    /**
     * Recursively build the component tree and return the JSX
     * @param comps 
     * @returns 
     */
    function buildJSXFromComponentTree(compsTree: ComponentInstance[]) {
        return compsTree.map(comp => {
            const compDef = ComponentMap[comp.compId];
            return (
                <compDef.component 
                    {...comp?.props}
                    key={comp.instanceId} 
                    data-id={comp.instanceId}
                    className={clsx("bxvse_component", comp?.props?.className, 
                        selectedCompId === comp.instanceId && 'bxvse_selected_in_editor')}
                    onClick={(e:any) => {
                        if (selectModeOn) {
                            setSelectedCompId(comp.instanceId);
                        }
                        else {
                            comp?.props?.onClick(e);
                        }
                    }}
                >
                    { comp.children && buildJSXFromComponentTree(comp.children) }
                </compDef.component>
            )
        });
    }

    return (
        <StyledBuildArea ref={setNodeRef} className={clsx(selectModeOn && 'select_mode_on')}>
            { buildJSXFromComponentTree(componentsTree) }
        </StyledBuildArea>
    );
};

export default BuildArea;