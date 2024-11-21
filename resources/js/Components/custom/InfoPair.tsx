export default function InfoPair({ label, value = 'N/A', width = 3, lineHeight = 8 }: { label: string | JSX.Element, value?: string | undefined | JSX.Element | any, width?: number , lineHeight?: string | number }) {
    return (
        <div className={"grid gap-2 grid-cols-" + width}>
            <div className={"text-gray-500 text-sm flex leading-" + lineHeight}>
                {label}
                {/* <span className="ms-auto me-1">:</span> */}
            </div>
            <div className={"text-sm leading-" + lineHeight}>
                {value}
            </div>
        </div>
    );
}
