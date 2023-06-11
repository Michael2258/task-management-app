import { Fab } from "@mui/material";

const RoundButton = ({ IconElement, onClick, ...props }) => {
    return (
        <Fab
            className="round-button-container"
            onClick={onClick}
            size={props?.size}
            sx={{ backgroundColor: "#000" }}
        >
            <IconElement
                className="icon-element"
                fontSize={props.iconSize || "large"}
                sx={{ color: props?.fillIcon || "#fff" }}
            />
        </Fab>
    );
};

export default RoundButton;
