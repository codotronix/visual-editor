import styled from '@emotion/styled';
import { useEditorContext } from '../editorContext';

const StyledPropertiesPanel = styled.div`
    position: fixed;
    top: 40px;
    bottom: 0;
    right: 0;
    width: 270px;
    border-left: 1px solid var(--color-border);
    font-size: 1.3rem;
    background: var(--color-sidebar-bg);

    & > .header {
        padding: 10px 15px;
        border-bottom: 2px solid var(--color-border);
    }

    & > .properties_innercontainer {
        & .line {
            padding: 10px 15px;
            border-bottom: 1px solid var(--color-border);
            display: grid;
            grid-template-columns: 1fr 2fr;
        }
        
    }
`

const PropertiesPanel = () => {
    const { selectedComponentInstance: componentInstance, updateProp, removeComponent } = useEditorContext();
    return (
        <StyledPropertiesPanel>
            <h3 className='header'>Properties</h3>
            <div className='properties_innercontainer'>
                {!componentInstance && <div className='mx-15 my-10'>No component selected</div>}
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

                {
                    componentInstance &&
                    <>
                        <div className=''>
                            <button type="button" 
                                onClick={() => removeComponent(componentInstance.componentInstanceId, componentInstance.parentId)}
                            >
                                Delete Component
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </>
                }
            </div>

        </StyledPropertiesPanel>
    )
}

export default PropertiesPanel;