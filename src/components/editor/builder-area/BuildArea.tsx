import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled"
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import clsx from "clsx";
import { ComponentMap } from "../../../config/ComponentMap";
import { useEditorContext } from "../editorContext";
// import { StyleSheetManager } from "styled-components";

const StyledBuildArea = styled.div`
    min-height: 100vh;
    /* margin: 0 270px; */
    background: var(--color-canvas-bg);
    /* background: lightblue; */
    padding: 10px;

    &.mobile_view {
        width: 370px;
        margin: 15px auto;
        border: 5px solid var(--color-border);
    }

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
        componentTree, createComponent, selectModeOn, selectedComponentInstanceId, setSelectedComponentInstanceId, isMobileView,
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
            className={clsx(selectModeOn && 'select_mode_on', isMobileView && 'mobile_view')}
        >
            {buildJSXFromComponentTree(['root'])}
        </StyledBuildArea>
    );
};

const StyledBuildAreaIframeWrapper = styled.div`
    min-height: 100vh;
    margin: 0 270px;
    /* background: var(--color-canvas-bg); */
    background: yellow;

    & > .bxvse_iframe {
        width: 100%;
        height: 100vh;
        border: none;
        background: orange;
    }
`

const BuildAreaIframeWrapper = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iFrameLoaded, setIframeLoaded] = useState(false);
    const { isMobileView } = useEditorContext();

    useEffect(() => {
        const handleLoad = () => {
            console.log("iframe loaded")
            // console.dir(iframeRef.current?.contentDocument?.body)
            // ReactDOM.createPortal(<BuildArea />, iframeRef.current?.contentDocument?.body as HTMLElement, 'editor-in-iframe')
            setIframeLoaded(true)
        }

        if (iframeRef.current?.contentDocument?.readyState === "complete") {
            handleLoad()
        } else {
            iframeRef.current?.addEventListener("load", handleLoad)
        }

        return () => {
            iframeRef.current?.removeEventListener("load", handleLoad)
        };
    }, [])

    const loadBuildArea = () => {
        return ReactDOM.createPortal(<BuildArea />, iframeRef.current?.contentDocument?.body as HTMLElement)
    }

    return (
        <StyledBuildAreaIframeWrapper>
            <iframe
                ref={iframeRef}
                className={clsx('bxvse_iframe', isMobileView && 'mobile_view')}
            />
            { iFrameLoaded && loadBuildArea() }
        </StyledBuildAreaIframeWrapper>
    );
}

export default BuildAreaIframeWrapper
// export default BuildArea;