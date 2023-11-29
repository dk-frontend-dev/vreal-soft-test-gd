import {SelectProps} from "@mui/material/Select/Select";
import {ControllerRenderProps} from "react-hook-form";
import {Select} from "@mui/material";
import {ReactNode} from "react";

interface AppSelectProps extends SelectProps {
    children: ReactNode;
    field: ControllerRenderProps<any, any>;
}

function AppSelect({field, children, ...props}: AppSelectProps) {
    return (
        <Select
            {...props}
            {...field}
        >
            {/*{options.map((option, index) => (*/}
            {/*    <MenuItem key={index} value={option}>{option}</MenuItem>*/}
            {/*))}*/}
            {children}
        </Select>
    )
}

export default AppSelect;
