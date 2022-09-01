import clsx from "clsx";

export function PlatformChips({ value }: any) {
    const status = value

    return (
        <span
            className={clsx(
                "py-1 capitalize leading-wide font-bold text-xs rounded-full shadow-sm",
                status.startsWith("Leetcode") ? "bg-red-200 p-2 text-red-700" : "",
                status.startsWith("Hackerrank") ? "bg-yellow-200 p-2 text-yellow-700" : "",
                status.startsWith("Codeforces") ? "bg-green-200 p-2 text-green-700" : ""
            )}
        >
            {status}
        </span>
    );
}