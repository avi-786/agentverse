"use client";

import { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";

interface BuyButtonProps {
  agentId: string;
  agentName: string;
  price: number;
}

export default function BuyButton({ agentId, agentName, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, agentName, price }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" /> Buy Now
        </>
      )}
    </button>
  );
}
