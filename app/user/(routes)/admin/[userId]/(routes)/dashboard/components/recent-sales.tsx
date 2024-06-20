import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Payment } from '@/app/lib/types';

export function RecentSales() {
  interface RecentPayment {
    name: string;
    email: string;
    amount: number;
  }

  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);

  useEffect(() => {
    const fetchRecentPayments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/recentPayments`
        );
        const data = response.data.map((payment: any) => ({
          name: payment.client.name,
          email: payment.client.user.email,
          amount: payment.amount
        }));
        setRecentPayments(data);
      } catch (error) {
        toast.error("Cannot fetch recent payments. Please try again.");
      }
    };
    fetchRecentPayments();
  }, []);

  const getInitials = (name: string) => {
    const nameParts = name.split(' ').filter(Boolean);
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}` 
      : `${nameParts[0][0]}${nameParts[0][1]}`;
    return initials.toUpperCase();
  };

  return (
    <div className="space-y-8">
      {recentPayments.map((payment, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{getInitials(payment.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">{payment.email}</p>
          </div>
          <div className="ml-auto font-medium">${payment.amount}</div>
        </div>
      ))}
    </div>
  );
}

export default RecentSales;
