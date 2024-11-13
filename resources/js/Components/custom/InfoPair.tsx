export default function InfoPair({ label, value }: { label: string, value: string }) {
    return (
        <div className="grid grid-cols-3">
            <div className="text-gray-500 text-sm flex leading-9">
                {label}
                <span className="ms-auto me-1">:</span>
            </div>
            <div className="col-span-2 text-sm leading-9">{value}</div>
        </div>
    );
}
