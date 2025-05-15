
import BuildArea from "./BuildArea";
import BuildAreaIframe from "./BuildAreaIFrame";
import { useEditorContext } from "../editorContext";

const BuildAreaSwitcher = () => {
    const { isMobileView } = useEditorContext();

    return (
        <>
            { isMobileView ? <BuildAreaIframe /> : <BuildArea />}
        </>
    );
}

export default BuildAreaSwitcher;