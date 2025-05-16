
import BuildAreaContainer from "./BuildAreaContainer";
import BuildAreaIframe from "./BuildAreaIFrame";
import { useEditorContext } from "../editorContext";

const BuildAreaSwitcher = () => {
    const { isMobileView } = useEditorContext();

    return (
        <>
            { isMobileView ? <BuildAreaIframe /> : <BuildAreaContainer />}
        </>
    );
}

export default BuildAreaSwitcher;