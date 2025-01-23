
export default function DashboardLayout({
    children,
    dashboard,
    header,
}: Readonly<{
    children: React.ReactNode
    dashboard: React.ReactNode
    header: React.ReactNode
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {header}
                <div className="flex flex-col lg:flex-row mt-8 gap-8">
                    <div className="flex-1">
                        {dashboard}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}