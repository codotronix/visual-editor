import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled"
import { useEditorContext } from "../editorContext";
import BuildArea from "./BuildArea";
import clsx from "clsx";

const StyledBuildAreaIframe = styled.div`
    min-height: 100vh;
    margin: 0 270px;
    /* background: var(--color-canvas-bg); */
    background: yellow;

    & > .bxvse_iframe {
        width: 100%;
        height: 100vh;
        border: none;
        background: orange;
    }
`

const BuildAreaIframe = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iFrameLoaded, setIframeLoaded] = useState(false);
    const { isMobileView } = useEditorContext();

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
        <StyledBuildAreaIframe className={clsx(!isMobileView && 'hidden')}>
            <iframe
                ref={iframeRef}
                className={clsx('bxvse_build_area_iframe')}
            />
            { iFrameLoaded && loadBuildArea() }
        </StyledBuildAreaIframe>
    );
}

export default BuildAreaIframe