export type TComponentInstanceId = string;

export type TComponentInstance = {
    compId: string;       // to refer ComponentMap
    componentInstanceId: TComponentInstanceId;   // to refer the actual component
    childrenIds?: Array<TComponentInstanceId>;
    props?: { [key: string]: any };
}

export type TComponentTree = {
    components: {
        [componentIndtanceId: string]: TComponentInstance
    };
}