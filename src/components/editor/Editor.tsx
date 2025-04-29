import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import ComponentsExplorer from "./components-explorer/ComponentsExplorer"
import BuildArea from "./builder-area/BuildArea"
// import { TComponentInstance } from './types';
import TopToolBox from './TopToolBox';
import useComponentTree from './useComponentTree';

const Editor = () => {
    const { componentTree, addComponent } = useComponentTree();
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
                    componentTree={componentTree} 
                    addComponent={addComponent}
                    // setComponentsTree={setComponentsTree}
                    // selectModeOn={selectModeOn}
                    // selectedCompId={selectedCompId}
                    // setSelectedCompId={setSelectedCompId}
                />
            </DndContext>
        </div>
    )
}

export default Editor