import { cookies } from "next/headers";
import { ChatLayout } from "@/components/chat/chatLayout";

const Inbox = () => {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

    return (
        <main className="flex h-[80vh] flex-col items-center justify-center p-4  gap-4">
            <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
                <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
            </div>
        </main>
    );
}

export default Inbox;

