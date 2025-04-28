/**
 * This is 2 panel editor where
 * The left panel is the collection of Web Components / Elements, which can be dragged and dropped into -
 * The the Mid panel, which is the main building area
 */
import { DndContext } from '@dnd-kit/core';
import ComponentsExplorer from "./components-explorer/ComponentsExplorer"
import BuildArea from "./builder-area/BuildArea"

const Editor = () => {

    return (
        <div>
            <DndContext>
                {/* LEFT PANEL */}
                <ComponentsExplorer />

                {/* Mid Panel */}
                <BuildArea />
            </DndContext>
        </div>
    )
}

export default Editor