export type ComponentInstance = {
    compId: string;       // to refer ComponentMap
    instanceId: string;   // to refer the actual component
    children?: ComponentInstance[];
    props?: { [key: string]: any };
}