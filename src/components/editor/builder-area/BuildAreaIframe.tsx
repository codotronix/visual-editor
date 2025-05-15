import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled"
// import { useEditorContext } from "../editorContext";
import BuildArea from "./BuildArea";
import clsx from "clsx";

const StyledBuildAreaIframe = styled.div`
    width: 400px;
    margin: 100px auto 0;
    /* background: var(--color-canvas-bg); */
    /* background: yellow; */
    border: 6px double #999;
    border-radius: 9px;
    height: calc(100vh - 130px);
    overflow: auto;

    & > .bxvse_build_area_iframe {
        width: 100%;
        min-height: calc(100vh - 120px);
        border: none;
        /* background: orange; */
        background: var(--color-canvas-bg);
    }
`

const BuildAreaIframe = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iFrameLoaded, setIframeLoaded] = useState(false);
    // const { isMobileView } = useEditorContext();

    useEffect(() => {
        const handleLoad = () => setIframeLoaded(true)

        if (iframeRef.current?.contentDocument?.readyState === "complete") {
            handleLoad()
        } else {
            iframeRef.current?.addEventListener("load", handleLoad)
        }

        return () => {
            iframeRef.current?.removeEventListener("load", handleLoad)
        };
    }, [])

    const loadBuildArea = () => {
        return ReactDOM.createPortal(<BuildArea />, iframeRef.current?.contentDocument?.body as HTMLElement)
    }

    return (
        <StyledBuildAreaIframe>
            <iframe
                ref={iframeRef}
                className={clsx('bxvse_build_area_iframe')}
            />
            { iFrameLoaded && loadBuildArea() }
        </StyledBuildAreaIframe>
    );
}

export default BuildAreaIframe