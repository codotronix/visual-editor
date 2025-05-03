import { useState } from 'react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import Component from './Component'
import { ComponentMap } from '../../../config/ComponentMap'
import ComponentContextMenu from './ComponentContextMenu'
import { ToggleButton } from '../../vse'

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

    & .vse_comp_lists li {
        position: relative;
        & > .ico_options {
            color: var(--color-component-outline);
            cursor: pointer;
            /* background: transparent; */
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: none;
            position: absolute;
            right: 10px;
            top: 6px;
        }
    }
`

const ComponentsExplorer = () => {
    const [contextMenuProps, setContextMenuProps] = useState<{compId: string, posY: number} | null>(null);

    const toggleContextMenu = (e: React.MouseEvent, compId: string) => {
        if (contextMenuProps && contextMenuProps.compId === compId) {
            setContextMenuProps(null);
        }
        else {
            setContextMenuProps({compId, posY: e.clientY});
        }
    }

    return (
        <StyledComponentsExplorer>
            <h3 className='header'>Components</h3>
            <ul className='vse_comp_lists'>
            {
                Object.values(ComponentMap).filter(c => c.name).map(c => 
                <li key={c.id}>
                    <Component 
                        id={c.id}
                        name={c.name!}
                    />
                    <ToggleButton 
                        className={clsx('ico_options')}
                        onClick={e => toggleContextMenu(e, c.id)}
                        isActive={!(contextMenuProps && contextMenuProps.compId === c.id)}
                        child1={<i className={clsx("fa-solid fa-angles-right ico_context")}></i>}
                        child2={<i className={clsx("fa-solid fa-xmark ico_context_close")}></i>}
                    />

                    {
                        contextMenuProps && contextMenuProps.compId === c.id && 
                        <ComponentContextMenu />
                    }
                </li>)
            }
            </ul>
        </StyledComponentsExplorer>
    )
}

export default ComponentsExplorer