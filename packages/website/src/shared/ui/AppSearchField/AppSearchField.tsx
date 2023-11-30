import {debounce, TextField} from "@mui/material";
import s from './AppSearchField.module.scss';
import {ChangeEvent, useCallback, useState} from "react";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";

interface AppSearchFieldProps {
    onValueChange: (value: string) => void;
}

function AppSearchField({onValueChange}: AppSearchFieldProps) {
    const [value, setValue] = useState<string>('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        debouncedSearch(event.target.value);
    };

    const debouncedSearch = useCallback(
        debounce(onValueChange, 500),
        []
    );

    const clearField = () => {
        setValue('');
        onValueChange('');
    }

    return (
        <div className={s.container}>
            <TextField autoComplete='off' type='text' aria-autocomplete={'none'} placeholder={'Search by name..'} onChange={onChange} value={value} />
            <AppButton text={'Reset'} size={'large'} onClick={clearField} />
        </div>
    )
}

export default AppSearchField;
