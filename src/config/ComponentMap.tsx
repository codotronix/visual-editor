import { Header, Footer } from "../components/reusables";

type TComponentMap = { 
    [id: string]: { 
        id: string; 
        name: string; 
        component: React.FC<{ [propName: string]: any }>; 
    } 
}


export const ComponentMap: TComponentMap = {
    header: {
        id: "header",
        name: "Header",
        component: Header,
    },
    footer: {
        id: "footer",
        name: "Footer",
        component: Footer,
    },
}