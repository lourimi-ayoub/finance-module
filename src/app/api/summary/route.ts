import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenantId");

  const { data } = await supabase
    .from("transactions")
    .select("type, amount")
    .eq("tenant_id", tenantId);

  let totalIncome = 0;
  let totalExpense = 0;

  data?.forEach((t) => {
    if (t.type === "INCOME") totalIncome += Number(t.amount);
    else totalExpense += Number(t.amount);
  });

  return NextResponse.json({
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  });
}
