import { useState } from "react"
import { TComponentTree, TComponentInstance } from "./types"
import { v4 as uuidv4 } from 'uuid';
import { ComponentMap } from "../../config/ComponentMap";

const INIT_TREE: TComponentTree = {
    'components': {
        'root': {
            compId: 'root',
            componentInstanceId: 'root',
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

    const createComponent = (componentId: string, parentId: string) => {
        const compDef = ComponentMap[componentId];
        const newComponentInstance: TComponentInstance = {
            compId: componentId,
            componentInstanceId: uuidv4(),
            childrenIds: [],
            props: {...(compDef.props || {})},
        }
        addComponent(newComponentInstance, parentId);
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
        createComponent,
        addComponent,
        removeComponent
    }
}