import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const StyledHeader = styled.header`
    height: 60px;
    background-color: ${(props: THeaderProps) => props.bgColor || '#6495ed'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    color: white;

    .logo_text {
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
    }

    & .header_navs {
        ul {
            list-style: none;
            display: flex;

            li {
                a {
                    text-decoration: none;
                    color: white;
                    padding: 10px;
                }
            }

        }
    }
`

type TLink = { name: string, path: string }

type THeaderProps = {
    className?: string
    logoText?: string
    logoImgSrc?: string
    bgColor?: string
    restProps?: { [key: string]: any }
    links?: TLink[]
}

const Header = ({
    className, 
    logoText, logoImgSrc, links,
    bgColor='#6495ed', 
    ...restProps
}: THeaderProps) => {
    return (
        <StyledHeader className={className} {...restProps}>
            <div className="logo_text">{logoText}</div>

            <nav className="header_navs">
                <ul>
                    {
                        links && links.map(l => (
                            <li key={l.name}>
                                <Link to={l.path}>
                                    {l.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </StyledHeader>
    )
}

export default Header