import { Suspense } from "react";
import ShopAllProduct from "@/components/ShopAllProduct";

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopAllProduct />
    </Suspense>
  );
}