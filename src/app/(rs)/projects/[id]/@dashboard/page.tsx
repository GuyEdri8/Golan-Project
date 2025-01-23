import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default async function ProjectHeader({
    params,
  }: {
    params: { id?: string };
  }) {
    // if (!searchParams.project_id) return null
    return (
        <Card>
        <CardHeader>
          <CardTitle>חברי צוות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {['דן כהן', 'רונה לוי', 'אבי ישראלי', 'מיכל גולן'].map((name, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src={`/placeholder.svg`} />
                  <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-gray-500">תפקיד</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
}