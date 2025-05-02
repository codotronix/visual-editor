import styled from '@emotion/styled'
import Component from './Component'
import { ComponentMap } from '../../../config/ComponentMap'

const StyledComponentsExplorer = styled.div`
    position: fixed;
    top: 40px;
    bottom: 0;
    left: 0;
    font-size: 1.3rem;
    width: 270px;
    border-right: 1px solid var(--color-border);
    background: var(--color-sidebar-bg);

    & > .header {
        padding: 10px 15px;
        background-color: var(--color-sidebar-bg);
        border-bottom: 1px solid var(--color-border);
    }
`

const ComponentsExplorer = () => {
    return (
        <StyledComponentsExplorer>
            <h3 className='header'>Components</h3>
            {
                Object.values(ComponentMap).filter(c => c.name).map(c => 
                <Component 
                    key={c.id}
                    id={c.id}
                    name={c.name!}
                />)
            }
        </StyledComponentsExplorer>
    )
}

export default ComponentsExplorer