import { ThreeDots } from 'react-loader-spinner'

export const LoaderMedium = ({ className }: { className: string }) => {
    return <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass={className}
        visible={true}
    />
}

export const LoaderLarge = ({ color, style, className }: { color: string, style?: any, className?: string }) => {
    return <ThreeDots
        height="80"
        width="80"
        // radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={style}
        wrapperClass={className}
        visible={true}
    />
}

export const LoaderSmall = ({ color = "#5956E9", style, className }: { color?: string, style?: any, className?: string }) => {
    return <ThreeDots
        // height="80"
        // width="80"
        // radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={style}
        wrapperClass={className}
        visible={true}
    />
}