export default function InfoPair({ label, value, width = 3, lineHeight = 9 }: { label: string, value: string, width?: number , lineHeight?: string | number }) {
    return (
        <div className={"grid grid-cols-" + width}>
            <div className={"text-gray-500 text-sm flex leading-" + lineHeight}>
                {label}
                <span className="ms-auto me-1">:</span>
            </div>
            <div className={"text-sm leading-" + lineHeight}>
                {value}
            </div>
        </div>
    );
}
