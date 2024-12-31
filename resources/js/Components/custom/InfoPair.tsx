export default function InfoPair({ label, value = 'N/A', width = 3, lineHeight = 8, labelClassName = ''}:
    {
        label: string | JSX.Element,
        value?: string | undefined | JSX.Element | any,
        width?: number,
        lineHeight?: string | number
        labelClassName?: string,
    }) {
    return (
        <div className={`w-full grid gap-2 grid-cols-${width}`}>
            <div className={`text-muted-foreground text-sm flex leading-${lineHeight}`}>
                {label}
            </div>
            <div className={`text-sm leading-${lineHeight} col-span-${width - 1}`}>
                {value}
            </div>
        </div>
    );
}
