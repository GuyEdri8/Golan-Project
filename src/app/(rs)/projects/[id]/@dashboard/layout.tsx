

export default function DashboardLayout({
    teammemebers,
    milestones,
    contact,
    content,
}: Readonly<{
    teammemebers: React.ReactNode
    documents: React.ReactNode
    milestones: React.ReactNode
    contact: React.ReactNode
    content: React.ReactNode,
    children: React.ReactNode
}>) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 w-full">
                {content}
                {teammemebers}
                {contact}
                {milestones}
            </div>
        </>
    )
}