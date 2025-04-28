import styled from "@emotion/styled"
import { useDroppable } from '@dnd-kit/core';

const StyledBuildArea = styled.div`
    min-height: 100vh;
    margin-left: 270px;
`

const BuildArea = () => {
    const all = useDroppable({
        id: 'build-area',
    });
    // console.log(all)
    // if(all.over && all.active) {
    //     console.log(all)
    // }
    return (
        <StyledBuildArea ref={all.setNodeRef}>
            Build Area
        </StyledBuildArea>
    )
}

export default BuildArea