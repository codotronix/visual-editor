import styled from "@emotion/styled"

const StyledTopToolBox = styled.div`
    margin-left: 270px;
    padding: 10px 15px;
`

type TopToolBoxProps = {
    selectModeOn: boolean
    setSelectModeOn: (isOn: boolean) => void
}

const TopToolBox = ({ selectModeOn, setSelectModeOn }: TopToolBoxProps) => {
    return(
        <StyledTopToolBox>
            <label>
                <input type="checkbox" checked={selectModeOn} onChange={e => setSelectModeOn(e.target.checked)} />
                Selection Mode On
            </label>
        </StyledTopToolBox>
    )
}

export default TopToolBox