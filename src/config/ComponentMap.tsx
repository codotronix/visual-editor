
type TComponentMap = { 
    [id: string]: { 
        id: string; 
        name: string; 
        component: () => React.ReactElement; 
    } 
}


export const ComponentMap: TComponentMap = {
    header: {
        id: "header",
        name: "Header",
        component: () => <h1>New Header</h1>,
    },
    footer: {
        id: "footer",
        name: "Footer",
        component: () => <h1>New Footer</h1>,
    },
}