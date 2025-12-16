import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Your Storage Bill Securely | 360 Storage Solutions",
  description:
    "Access the secure online payment portal for 360 Storage Solutions tenants.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PayLayout(props: { children: React.ReactNode }) {
  return props.children;
}
