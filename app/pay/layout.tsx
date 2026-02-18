import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Your Storage Bill Securely | Titan Exterior Washing",
  description:
    "Access the secure online payment portal for Titan Exterior Washing tenants.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PayLayout(props: { children: React.ReactNode }) {
  return props.children;
}
