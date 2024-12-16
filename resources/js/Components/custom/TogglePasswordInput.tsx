import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Props {
    id: string,
    value: string | number | readonly string[],
    required?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string,
    minLength?: number,
    maxLength?: number,
}

export default function TogglePasswordInput({id, value, required = false, onChange, placeholder, minLength, maxLength } : Props) {
    const [isViewPassword, setIsViewPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                id={id}
                type={isViewPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
            />
            <Button onClick={() => setIsViewPassword(!isViewPassword)} type="button"
            variant="ghost" size="sm" className="absolute right-0.5 top-0.5">
                {isViewPassword ? <EyeOff className="text-muted-foreground"/> : <Eye className="text-muted-foreground"/> }
            </Button>
        </div>
    );
}
