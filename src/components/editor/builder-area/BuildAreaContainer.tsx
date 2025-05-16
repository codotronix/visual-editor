import styled from "@emotion/styled"
import BuildArea from "./BuildArea"

const StyledBuildAreaContainer = styled.div`
    margin: 0 270px;
`

const BuildAreaContainer = () => {
    return (
        <StyledBuildAreaContainer>
            <BuildArea />
        </StyledBuildAreaContainer>
    )
}

export default BuildAreaContainer