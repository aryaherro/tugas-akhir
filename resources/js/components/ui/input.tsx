import { Input as InputChakra, InputProps } from '@chakra-ui/react';

function Input({ type, ...props }: InputProps) {
    return (
        <InputChakra
            type={type}
            data-slot="input"
            {...props}
        />
    );
}

export { Input };
