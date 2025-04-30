import styled from '@emotion/styled';
import { TComponentInstance } from '../types';

const StyledPropertiesPanel = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 270px;
    border-left: 5px double #ccc;

    & > .header {
        padding: 10px 15px;
        background-color: #f5f5f5;
        border-bottom: 2px solid #ccc;
    }

    & > .line {
        padding: 10px 15px;
    }
`

type TPropertiesPanelProps = {
    componentInstance: TComponentInstance
}
const PropertiesPanel = ({ componentInstance }: TPropertiesPanelProps) => {
    return (
        <StyledPropertiesPanel>
            <h3 className='header'>Properties</h3>
            { !componentInstance && <div className='line'>No component selected</div> }
            <h3>{componentInstance?.compId}</h3>
        </StyledPropertiesPanel>
    )
}

export default PropertiesPanel;