import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { requireRole } from "@/lib/rbac";

export async function POST(req: Request) {
  const { userId, tenantId, type, amount, category, description } =
    await req.json();

  const user = await getUser(userId);

  if (user.tenant_id !== tenantId) {
    return NextResponse.json({ error: "Tenant violation" }, { status: 403 });
  }

  requireRole(user.role, ["TREASURER"]);

  if (amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  await supabase.from("transactions").insert({
    tenant_id: tenantId,
    type,
    amount,
    category,
    description,
  });

  return NextResponse.json({ success: true });
}
