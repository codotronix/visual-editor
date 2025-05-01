import styled from '@emotion/styled';
import { TComponentInstance } from '../types';

const StyledPropertiesPanel = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 270px;
    border-left: 5px double #ccc;
    font-size: 1.3rem;

    & > .header {
        padding: 10px 15px;
        background-color: #f5f5f5;
        border-bottom: 2px solid #ccc;
    }

    & > .properties_innercontainer {
        & .line {
            padding: 10px 15px;
            border-bottom: 1px solid #ccc;
            display: grid;
            grid-template-columns: 1fr 2fr;
        }
        
    }
`

type TPropertiesPanelProps = {
    componentInstance: TComponentInstance
    updateProp: (componentInstanceId: string, propName: string, propValue: any) => void
}
const PropertiesPanel = ({ componentInstance, updateProp }: TPropertiesPanelProps) => {
    return (
        <StyledPropertiesPanel>
            <h3 className='header'>Properties</h3>
            <div className='properties_innercontainer'>
            { !componentInstance && <div className='mx-15 my-10'>No component selected</div> }
            {
                componentInstance && 
                <>
                <div className='line'>
                    <label>Type ID</label>
                    <input type="text" value={componentInstance.compId} readOnly />
                </div>
                <div className='line'>
                    <label>Instance ID</label>
                    <input type="text" value={componentInstance.componentInstanceId} readOnly />
                </div>
                </>
            }

            {
                componentInstance && componentInstance.props &&
                Object.keys(componentInstance.props).map((propName: string) => {
                    return (
                        <div key={propName} className='line'>
                            <label>{propName}</label>
                            <input 
                                type="text" 
                                value={componentInstance.props![propName]} 
                                onChange={e => updateProp(componentInstance.componentInstanceId, propName, e.target.value)}
                            />
                        </div>
                    )
                })
                
            }
            </div>
            
        </StyledPropertiesPanel>
    )
}

export default PropertiesPanel;