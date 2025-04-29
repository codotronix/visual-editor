import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import ComponentsExplorer from "./components-explorer/ComponentsExplorer"
import BuildArea from "./builder-area/BuildArea"
import { ComponentInstance } from './types';
import TopToolBox from './TopToolBox';

const Editor = () => {
    const [componentsTree, setComponentsTree] = useState<ComponentInstance[]>([]);
    const [selectModeOn, setSelectModeOn] = useState<boolean>(false);
    const [selectedCompId, setSelectedCompId] = useState<string>('');

    const _setSelectModeOn = (isOn: boolean) => {
        if(!isOn) {
            setSelectedCompId('');
        }
        setSelectModeOn(isOn);
    }
    return (
        <div>
            <TopToolBox 
                selectModeOn={selectModeOn} 
                setSelectModeOn={_setSelectModeOn}
            />
            <DndContext>
                {/* LEFT PANEL */}
                <ComponentsExplorer />

                {/* Mid Panel */}
                <BuildArea 
                    componentsTree={componentsTree} 
                    setComponentsTree={setComponentsTree}
                    selectModeOn={selectModeOn}
                    selectedCompId={selectedCompId}
                    setSelectedCompId={setSelectedCompId}
                />
            </DndContext>
        </div>
    )
}

export default Editor