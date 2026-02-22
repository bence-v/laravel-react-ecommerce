import { Link } from '@inertiajs/react';
import { PaginationLink } from '@/types';

export default function Pagination({ links }: { links: PaginationLink[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-1 mt-6">
            {links.map((link, key) => (
                link.url ? (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 border rounded-md text-sm ${
                            link.active
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={key}
                        className="px-4 py-2 border rounded-md text-sm text-gray-400 border-gray-300 cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
