import styled from '@emotion/styled'
import Component from './Component'
import { ComponentMap } from '../../../config/ComponentMap'

const StyledComponentsExplorer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 270px;
    border-right: 5px double #ccc;

    & > h3 {
        padding: 10px 15px;
        margin: 0;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ccc;
    }
`

const ComponentsExplorer = () => {
    return (
        <StyledComponentsExplorer>
            <h3>Components</h3>
            {
                Object.values(ComponentMap).map(c => 
                <Component 
                    key={c.id}
                    id={c.id}
                    name={c.name}
                />)
            }
        </StyledComponentsExplorer>
    )
}

export default ComponentsExplorer