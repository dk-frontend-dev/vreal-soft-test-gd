import {Box, Chip, MenuItem, OutlinedInput, Select} from "@mui/material";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {SelectProps} from "@mui/material/Select/Select";

interface AppMultiSelectProps extends SelectProps {
    options: any[];
    field: ControllerRenderProps<FieldValues, any>;
    label: string;
    valueKey: string;
}

function AppMultiSelect({options, field, valueKey, label, ...props}: AppMultiSelectProps) {
    return (
        <Select
            {...field}
            {...props}
            multiple
            label={label}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: string, index: number) => (
                        <Chip key={index} label={value} />
                    ))}
                </Box>
            )}
        >
            {options.map((value: any, index: number) => (
                <MenuItem
                    key={index}
                    value={value[valueKey]}
                >
                    {value[valueKey]}
                </MenuItem>
            ))}
        </Select>
    )
}

export default AppMultiSelect;
