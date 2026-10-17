import { Card } from "@/components/ui/card"
import { Outlet, useLoaderData } from "react-router"
import { Button } from "../components/ui/button";
import { Link } from 'react-router';
import { ChevronLeft } from "lucide-react";

// interface Props {
//     // children: React.ReactNode
// }

interface LoaderData {
    backUrl: string | null
}

export default function () {
    const { backUrl  }: LoaderData = useLoaderData() ?? {};

    return <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-sm flex flex-col gap-3">
            {backUrl && <Link to={backUrl ?? ''}><Button variant="link"><ChevronLeft />Back</Button></Link>}
            <Card className="w-full max-w-sm">
                <Outlet />
            </Card>
        </div>
    </div>
}