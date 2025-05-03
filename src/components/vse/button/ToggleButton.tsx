import Button from "./Button";

type TToggleButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    child1: React.ReactNode;
    child2: React.ReactNode;
    isActive?: boolean;
}

const ToggleButton = ({ child1, child2, isActive, ...restProps }: TToggleButton) => {
    return (
        <Button {...restProps}>
            {isActive ? child1 : child2}
        </Button>
    )
}

export default ToggleButton;