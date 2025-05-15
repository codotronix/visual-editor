import { Header, Footer } from "../components/reusables";

type TComponentMap = { 
    [id: string]: { 
        id: string; 
        name?: string; 
        component: React.FC<{ [propName: string]: any }>; 
        props?: { [key: string]: any };
    } 
}


export const ComponentMap: TComponentMap = {
    root: {
        id: "root",
        component: ({ children }) => <div className="vse_root">{children}</div>
    },
    header: {
        id: "header",
        name: "Header",
        component: Header,
        props: {
            logoText: "LOGO",
            bgColor: '#6495ed',
            links: [
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
            ],
        }
    },
    footer: {
        id: "footer",
        name: "Footer",
        component: Footer,
        props: {
            text: "Footer",
        }
    },
}