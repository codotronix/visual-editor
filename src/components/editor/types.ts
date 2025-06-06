export type TComponentInstanceId = string;

export type TComponentInstance = {
    compId: string;       // to refer ComponentMap
    componentInstanceId: TComponentInstanceId;   // to refer the actual component
    parentId: TComponentInstanceId;
    childrenIds: Array<TComponentInstanceId>;
    props: { [key: string]: any };
}

export type TComponentTree = {
    components: {
        [componentInstanceId: string]: TComponentInstance
    };
}

export type TComponentContextMenu = {compId: string, posY: number} | null
export type TSelectedComponentInstance = TComponentInstance | null