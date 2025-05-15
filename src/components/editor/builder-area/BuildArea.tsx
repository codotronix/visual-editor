import styled from "@emotion/styled"
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import clsx from "clsx";
import { ComponentMap } from "../../../config/ComponentMap";
import { useEditorContext } from "../editorContext";
// import { StyleSheetManager } from "styled-components";

const StyledBuildArea = styled.div`
    min-height: 100vh;
    margin: 0 270px;
    background: var(--color-canvas-bg);
    /* background: lightblue; */
    padding: 10px;

    /* &.mobile_view {
        width: 370px;
        margin: 15px auto;
        border: 5px solid var(--color-border);
    } */

    & .bxvse_select_component_checkbox {
        display: none;
    }

    &.select_mode_on .bxvse_select_component_checkbox {
        display: block;
    }

    &.select_mode_on .bxvse_component:hover {
        border: .6px dashed var(--color-accent);
        cursor: default;
    }
    &.select_mode_on .bxvse_component.bxvse_selected_in_editor {
        border: 1px solid var(--color-accent);
        cursor: default;
    }
`

const BuildArea = () => {
    const {
        componentTree, createComponent, selectModeOn, selectedComponentInstanceId, setSelectedComponentInstanceId,
    } = useEditorContext();

    const { setNodeRef } = useDroppable({
        id: 'build-area',
    });

    useDndMonitor({
        onDragEnd(event) {
            if (event.over?.id === 'build-area') {
                // console.log(event.active.id);
                // const newCompInstance: TComponentInstance = {
                //     compId: event.active.id as string,    // to refer ComponentMap
                //     componentInstanceId: uuidv4(),       // to refer the actual component
                // }
                // addComponent(newCompInstance, 'root');
                createComponent(event.active.id as string, 'root');
            }
        },
    });

    const markComponentAsSelected = (isSelected: boolean, compId: string) => {
        if (isSelected) {
            setSelectedComponentInstanceId(compId);
        }
        else {
            setSelectedComponentInstanceId('');
        }
    }

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
                        selectedComponentInstanceId === compInstanceId && 'bxvse_selected_in_editor'
                    )}
                    onClick={(e: any) => {
                        if (selectModeOn) {
                            markComponentAsSelected(true, compInstanceId);
                        }
                        else {
                            compInstance?.props?.onClick && compInstance?.props?.onClick(e);
                        }
                    }}
                >
                    {compInstance.childrenIds && buildJSXFromComponentTree(compInstance.childrenIds)}
                </compDef.component>
            )
        })
    }

    return (
        <StyledBuildArea
            ref={setNodeRef}
            className={clsx('bxvse_build_area', selectModeOn && 'select_mode_on')}
        >
            {buildJSXFromComponentTree(['root'])}
        </StyledBuildArea>
    );
};

export default BuildArea;