import { useState } from "react"
import { TComponentTree, TComponentInstance } from "./types"

const INIT_TREE: TComponentTree = {
    'components': {
        'root': {
            compId: 'root',
            componentIndtanceId: 'root',
            childrenIds: ['header1', 'footer1'],
        },
        'header1': {
            compId: 'header',
            componentIndtanceId: 'header1',
            childrenIds: [],
        },
        'footer1': {
            compId: 'footer',
            componentIndtanceId: 'footer1',
            childrenIds: [],
        }
    }
}

export default function useComponentTree(initTree=INIT_TREE) {
    const [componentTree, setComponentTree] = useState<TComponentTree>(initTree);

    const addComponent = (newComponentInstance: TComponentInstance, parentId = 'root') => {
        const updatedTree = { ...componentTree };
        const parentComponent = updatedTree.components[parentId];
        if (parentComponent) {
            parentComponent.childrenIds = [...(parentComponent.childrenIds || []), newComponentInstance.componentInstanceId];
            updatedTree.components[newComponentInstance.componentInstanceId] = newComponentInstance;
        }
        setComponentTree(updatedTree);
    }

    /**
     * Whener a component is removed, 
     * 1. We need to remove it from the parent component's childrenIds Array,
     * 2. Also, we need to remove all its children from the componentTree,
     * 3. Finally, need to remove it from the componentTree
     * @param componentId 
     */
    const removeComponent = (componentId: string) => {
        
    }

    return {
        componentTree,
        addComponent,
        removeComponent
    }
}