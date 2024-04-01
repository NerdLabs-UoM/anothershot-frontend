import Link from "next/link";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="container">
      {children}
    </div>
  );
}
