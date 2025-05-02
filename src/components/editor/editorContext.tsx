import { createContext, useState, useContext } from "react";
import { TComponentTree, TComponentInstance, TComponentContextMenu, TSelectedComponentInstance } from "./types"
import { v4 as uuidv4 } from 'uuid';
import { ComponentMap } from "../../config/ComponentMap";

const INIT_TREE: TComponentTree = {
    'components': {
        'root': {
            compId: 'root',
            parentId: '',
            componentInstanceId: 'root',
            childrenIds: [],
            props: {}
        }
    }
}

const log = (...args: any) => console.log('Initial Context:: THIS SHOULD NOT BE SHOWN :: ',...args);

const EditorContext = createContext({
    componentTree: INIT_TREE,
    createComponent: (componentId: string, parentId: string) => log(`Creating component ${componentId} under parent ${parentId}`),
    removeComponent: (componentId: string, parentId: string) => log(`Removing component ${componentId} from parent ${parentId}`),
    updateProp: (componentId: string, propName: string, propValue: any) => log(`Updating prop ${propName} of component ${componentId} to ${propValue}`),
    selectModeOn: false,
    setSelectModeOn: (isOn: boolean) => log(`Setting select mode to ${isOn}`),
    selectedComponentInstanceId: '',
    setSelectedComponentInstanceId: (compId: string) => log(`Setting selected component ID to ${compId}`),
    selectedComponentInstance: null as TSelectedComponentInstance,
    contextMenuProps: null as TComponentContextMenu,
    toggleContextMenu: (e: React.MouseEvent, compId: string) => log(`Toggling context menu for component ${compId} at position ${e.clientY}`),
})

export const useEditorContext = () => useContext(EditorContext);

export const EditorContextProvider = ({ children }: { children: React.ReactElement }) => {
    const [componentTree, setComponentTree] = useState<TComponentTree>(INIT_TREE);
    const [selectModeOn, _setSelectModeOn] = useState<boolean>(false);
    const [selectedComponentInstanceId, setSelectedComponentInstanceId] = useState<string>('');
    const [contextMenuProps, setContextMenuProps] = useState<TComponentContextMenu>(null);
    const selectedComponentInstance: (TComponentInstance | null) = componentTree.components[selectedComponentInstanceId] || null;
    
    const setSelectModeOn = (isOn: boolean) => {
        if(!isOn) {
            setSelectedComponentInstanceId('');
        }
        _setSelectModeOn(isOn);
    }

    const _addComponent = (newComponentInstance: TComponentInstance, parentId = 'root') => {
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
            parentId,
            childrenIds: [],
            props: {...(compDef.props || {})},
        }
        _addComponent(newComponentInstance, parentId);
    }

    /**
     * Whener a component is removed, 
     * 1. We need to remove it from the parent component's childrenIds Array,
     * 2. Also, we need to remove all its children from the componentTree,
     * 3. Finally, need to remove it from the componentTree
     * @param componentId 
     */
    const removeComponent = (componentId: string, parentId: string) => {
        const updatedTree = { 
            ...componentTree,
            components: {
                ...componentTree.components,
                [parentId]: {
                    ...componentTree.components[parentId],
                    childrenIds: componentTree.components[parentId].childrenIds.filter((id: string) => id !== componentId)
                }
            }
        };
        delete updatedTree.components[componentId];
        setComponentTree(updatedTree);
    }

    const updateProp = (componentId: string, propName: string, propValue: any) => {
        // console.log(`Updating prop ${propName} of component ${componentId} to ${propValue}`);
        const updatedTree = { 
            ...componentTree,
            components: {
                ...componentTree.components,
                [componentId]: {
                    ...componentTree.components[componentId],
                    props: {
                        ...componentTree.components[componentId]?.props,
                        [propName]: propValue
                    }
                }
            }
        };
        setComponentTree(updatedTree);
    }

    const toggleContextMenu = (e: React.MouseEvent, compId: string) => {
        if (contextMenuProps && contextMenuProps.compId === compId) {
            setContextMenuProps(null);
        } else {
            setContextMenuProps({ compId, posY: e.clientY });
        }
    }

    return (
        <EditorContext.Provider value={{
            componentTree,
            createComponent,
            removeComponent,
            updateProp,
            selectModeOn,
            setSelectModeOn,
            selectedComponentInstance,
            selectedComponentInstanceId,
            setSelectedComponentInstanceId,
            contextMenuProps,
            toggleContextMenu,
        }}>
            {children}
        </EditorContext.Provider>
    )
}