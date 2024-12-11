
type Props = {
    hidden?: boolean;
    children: React.ReactNode;
}

const GradientWrapper = ({ children, hidden, }: Props) => {
    if (hidden) return null
    return (
    <div
        className={`relative overflow-hidden border-t`}>
        <div className="blur-[100px] absolute inset-0 w-full h-full bg-gradient-to-b from-sky-100 to-white"
            >

        </div>
        <div className="relative py-8">
            {children}
        </div>
    </div>
    )
}

export default GradientWrapper