import { DndContext } from '@dnd-kit/core';
import styled from '@emotion/styled';
import ComponentsExplorer from "./components-explorer/ComponentsExplorer"
import BuildArea from "./builder-area/BuildArea"
import BuildAreaIframe from './builder-area/BuildAreaIFrame';
// import { TComponentInstance } from './types';
import TopToolBox from './TopToolBox';
import PropertiesPanel from './properties-panel/PropertiesPanel';
import { EditorContextProvider } from './editorContext';

const StyledEditor = styled.div`
    margin-top: 82px;
`

const Editor = () => {
    return (
        <EditorContextProvider>
            <StyledEditor>
                <TopToolBox />
                <DndContext>
                    <ComponentsExplorer />
                    <BuildArea />
                    <BuildAreaIframe />
                </DndContext>

                <PropertiesPanel />
            </StyledEditor>
        </EditorContextProvider>
    )
}

export default Editor