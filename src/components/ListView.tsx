import Link from "next/link";

export default function ListView({values}: { values: { id: number, name: string, desc: string, href:string }[] }) {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {values.map((value) => (
                <li key={value.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto p-2">
                            <Link className="text-sm font-semibold leading-6 text-white" href={value.href}>{value.name}</Link>
                            <p className="mt-1 truncate text-xs leading-5 text-white">{value.desc}</p>

                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
