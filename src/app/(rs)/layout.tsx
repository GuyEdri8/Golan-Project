export default async function RSLayout({
    children,
}: {
    children: React.ReactNode
})
{
    return (
        <div className="mx-auto">
            <div className="px-4 py-2">
                {children}
            </div>
        </div>
    )
}