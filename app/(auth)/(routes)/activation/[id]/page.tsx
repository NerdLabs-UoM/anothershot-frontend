"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { activateUserAccountService } from "@/services/auth/api";

interface ActivationPageProps {
  params: {
    id: string;
  };
}

const ActivationPage = ({ params }: ActivationPageProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleActivation = async () => {
    try {
      setLoading(true);
      const res = await activateUserAccountService(params.id);
      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (res.status === 200) {
        toast.success("Account activated successfully");
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      }
      setLoading(false);
    } catch (error) {
      toast.error("Account activation failed");
    }
    setLoading(false);
  };

  return (
    <div className="grid text-center content-center h-full ">
      <div className="md:border rounded-[20px] md:p-10 min-w-[350px]">
        <h1 className="text-3xl font-bold m-4">
          AnotherShot Account Activation
        </h1>
        <Button
          variant="default"
          className="w-full"
          onClick={() => handleActivation()}
        >
          {loading && (
            <span className="animate-spin">
              <Loader2 />
            </span>
          )}
          {!loading && <span className="ml-2">Activate Account</span>}
        </Button>
      </div>
    </div>
  );
};

export default ActivationPage;
