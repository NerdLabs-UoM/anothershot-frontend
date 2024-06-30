"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-8 max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Unauthorized</h1>
        <p className="text-center mb-6">
          You are not authorized to view this page.
        </p>
        <div className="flex justify-center">
          <Button onClick={handleGoBack} variant="default" color="primary">
            Go to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
