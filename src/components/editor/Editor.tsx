import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import styled from '@emotion/styled';
import ComponentsExplorer from "./components-explorer/ComponentsExplorer"
import BuildArea from "./builder-area/BuildArea"
// import { TComponentInstance } from './types';
import TopToolBox from './TopToolBox';
import PropertiesPanel from './properties-panel/PropertiesPanel';
import useComponentTree from './useComponentTree';

const StyledEditor = styled.div`
    margin-top: 82px;
`

const Editor = () => {
    const { componentTree, createComponent, updateProp } = useComponentTree();
    const [selectModeOn, setSelectModeOn] = useState<boolean>(false);
    const [selectedCompId, setSelectedCompId] = useState<string>('');

    const _setSelectModeOn = (isOn: boolean) => {
        if(!isOn) {
            setSelectedCompId('');
        }
        setSelectModeOn(isOn);
    }
    return (
        <StyledEditor>
            <TopToolBox 
                selectModeOn={selectModeOn} 
                setSelectModeOn={_setSelectModeOn}
            />
            <DndContext>
                {/* LEFT PANEL */}
                <ComponentsExplorer />

                {/* Mid Panel */}
                <BuildArea 
                    componentTree={componentTree} 
                    createComponent={createComponent}
                    selectModeOn={selectModeOn}
                    selectedCompId={selectedCompId}
                    setSelectedCompId={setSelectedCompId}
                />
            </DndContext>

            <PropertiesPanel 
                componentInstance={componentTree.components[selectedCompId]}
                updateProp={updateProp}
            />
        </StyledEditor>
    )
}

export default Editor